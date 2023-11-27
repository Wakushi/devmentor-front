import { useContext, useEffect, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { isSessionOver } from "@/services/utils"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { UserContext } from "@/services/UserContext"
import SessionCard from "@/components/session/session"
import Loader from "@/components/ui/loader/loader"
import classes from "./profile.module.scss"
import ConfirmationModal from "@/components/confirmation-modal/confirmation-modal"
import Button from "@/components/ui/button/button"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import { SnackbarContext } from "@/services/SnackbarContext"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import ExperienceBar from "@/components/xp-bar/xp-bar"
import MentorProfileCard from "@/components/mentor-profile-card/mentor-profile-card"

export default function MentorProfile() {
	///////////////
	// State
	///////////////
	const [isLoaded, setIsLoaded] = useState(true)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false)
	const [waitingModalMessage, setWaitingModalMessage] = useState("")
	const [mentorXp, setMentorXp] = useState<number>(0)
	const [mentorTokens, setMentorTokens] = useState<number>(0)
	const [mentorBadge, setMentorBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})
	const [mentorNextBadge, setMentorNextBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})

	///////////////
	// Contexts
	///////////////
	const { walletAddress } = useContext(UserContext)
	const { openSnackBar } = useContext(SnackbarContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getMentorInfo, validateSessionAsMentor } = useContext(MentorContext)
	const { isWaitingForTransaction, getCurrentBlockTimestamp } =
		useContext(BlockchainContext)
	const {
		getUserXp,
		getUserBadgeUri,
		getUserNextBadgeUri,
		getMentorTokenAmount
	} = useContext(RewardContext)

	///////////////
	// Effects
	///////////////

	useEffect(() => {
		if (!mentorInfo || !isWaitingForTransaction) {
			getMentorInfo(walletAddress).then((mentor) => {
				setMentorInfo(mentor)
				if (!mentor) return
				getMenteeSession(mentor?.mentee).then((session) => {
					setMenteeSession(session)
					setIsLoaded(true)
				})
				getUserXp(walletAddress).then((xp) => {
					setMentorXp(parseInt(xp))
				})
				getMentorTokenAmount(walletAddress).then((tokens) => {
					setMentorTokens(tokens)
				})
				getUserBadgeUri(walletAddress).then((badgeUri) => {
					if (!badgeUri) return
					fetch(badgeUri)
						.then((response) => {
							return response.json()
						})
						.then(({ id, name, image, description }) => {
							setMentorBadge({
								id,
								name: name,
								image: image,
								description: description,
								cost: 0
							})
						})
				})
				getUserNextBadgeUri(walletAddress, "mentor").then(
					(nextBadgeUri) => {
						if (!nextBadgeUri) return
						fetch(nextBadgeUri.tokenUri)
							.then((response) => {
								return response.json()
							})
							.then(({ id, name, image, description }) => {
								setMentorNextBadge({
									id,
									name,
									image,
									description,
									cost: nextBadgeUri.badgeXpCost
								})
							})
					}
				)
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	///////////////
	// Functions
	///////////////

	function onConfirmSession() {
		getCurrentBlockTimestamp().then((timestamp: number) => {
			if (menteeSession && !isSessionOver(timestamp, menteeSession)) {
				openSnackBar("sessionNotFinished")
			} else {
				setIsConfirmationModalOpen(true)
			}
		})
	}

	function validateSession() {
		if (!mentorInfo) return
		setWaitingModalMessage("Validating session...")
		setIsConfirmationModalOpen(false)
		validateSessionAsMentor(mentorInfo?.mentee)
	}

	if (!isLoaded || !mentorInfo) {
		return (
			<div className="loading-page">
				<Loader />
			</div>
		)
	}

	if (!mentorInfo.registered) {
		return (
			<div className="page fade-in-bottom">
				<h2 className="text-center">
					You are not registered as a mentor.
				</h2>
			</div>
		)
	}

	return (
		<>
			<div
				className={`${classes.mentorProfile} page flex flex-col items-center gap-4 fade-in-bottom `}
			>
				{!!mentorNextBadge.cost && (
					<ExperienceBar
						currentExp={mentorXp}
						maxExp={mentorNextBadge.cost}
						currentBadge={mentorBadge}
						nextBadge={mentorNextBadge}
						setWaitingModalMessage={setWaitingModalMessage}
					/>
				)}
				{mentorInfo.registered && !mentorInfo.validated ? (
					<div className="flex flex-col gap-2">
						<div className={classes.reviewMessage}>
							YOUR APPLICATION IS BEING REVIEWED
						</div>
					</div>
				) : (
					<div className="flex gap-4 items-baseline">
						<MentorProfileCard
							mentorInfo={mentorInfo}
							mentorTokens={mentorTokens}
						/>
						{!!menteeSession && (
							<SessionCard
								session={menteeSession}
								mentorView={true}
								confirmSession={onConfirmSession}
							/>
						)}
					</div>
				)}
				{isWaitingForTransaction && (
					<WaitingModal>
						<div className="flex flex-col gap-2">
							<h4>{waitingModalMessage}</h4>
						</div>
					</WaitingModal>
				)}
				{isConfirmationModalOpen && (
					<ConfirmationModal
						setIsConfirmationModalOpen={setIsConfirmationModalOpen}
					>
						<div className="flex flex-col gap-2">
							<h4>Validate your session</h4>
							<div className="flex justify-center gap-2">
								<Button onClick={validateSession} filled={true}>
									Confirm
								</Button>
								<Button
									onClick={() => {
										setIsConfirmationModalOpen(false)
									}}
									filled={true}
								>
									Cancel
								</Button>
							</div>
						</div>
					</ConfirmationModal>
				)}
			</div>
			<WavesBackground />
		</>
	)
}
