import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "@/services/UserContext"
import {
	Mentee,
	MenteeContext,
	MenteeRequest
} from "@/services/blockchain/MenteeContext"
import classes from "./profile.module.scss"
import Loader from "@/components/ui/loader/loader"
import SessionCard from "@/components/session/session"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { isSessionOver } from "@/services/utils"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import { SnackbarContext } from "@/services/SnackbarContext"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import ExperienceBar from "@/components/xp-bar/xp-bar"
import MenteeProfileCard from "@/components/mentee-profile-card/mentee-profile-card"
import RequestCard from "@/components/request-card/request-card"
import SessionConfirmationModal from "@/components/session-confirmation-modal/session-confirmation"

export default function MenteeProfile() {
	///////////////
	// State
	///////////////
	const [isLoaded, setIsLoaded] = useState(false)
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)
	const [menteeRequest, setMenteeRequest] = useState<MenteeRequest | null>(
		null
	)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false)
	const [hasRated, setHasRated] = useState(false)
	const [formValues, setFormValues] = useState<any>({
		tipAmount: 0
	})
	const [waitingModalMessage, setWaitingModalMessage] = useState("")
	const [rating, setRating] = useState<number>(0)
	const [menteeXp, setMenteeXp] = useState<number>(0)
	const [menteeBadge, setMenteeBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})
	const [menteeNextBadge, setMenteeNextBadge] = useState<Badge>({
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
	const {
		getMenteeInfo,
		getMenteeRequest,
		cancelRequestForSession,
		validateSessionAsMentee
	} = useContext(MenteeContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { isWaitingForTransaction, getCurrentBlockTimestamp } =
		useContext(BlockchainContext)
	const { openSnackBar } = useContext(SnackbarContext)
	const { getUserXp, getUserBadgeUri, getUserNextBadgeUri } =
		useContext(RewardContext)

	///////////////
	// DOM & Style
	///////////////

	const tipFormField = useRef<HTMLDivElement | null>(null)
	const inputErrorStyle = "1px solid rgba(140, 140, 140, 0.29)"

	///////////////
	// Effects
	///////////////

	useEffect(() => {
		if (!menteeInfo || menteeInfo.hasRequest || !isWaitingForTransaction) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				if (!mentee) return
				getUserXp(walletAddress).then((xp) => {
					setMenteeXp(parseInt(xp))
				})
				getUserBadgeUri(walletAddress).then((badgeUri) => {
					if (!badgeUri) return
					fetch(badgeUri)
						.then((response) => {
							return response.json()
						})
						.then(({ id, name, image, description }) => {
							setMenteeBadge({
								id,
								name: name,
								image: image,
								description: description,
								cost: 0
							})
						})
				})
				getUserNextBadgeUri(walletAddress, "mentee").then(
					(nextBadgeUri) => {
						if (!nextBadgeUri) return
						fetch(nextBadgeUri.tokenUri)
							.then((response) => {
								return response.json()
							})
							.then(({ id, name, image, description }) => {
								setMenteeNextBadge({
									id,
									name,
									image,
									description,
									cost: nextBadgeUri.badgeXpCost
								})
							})
						setIsLoaded(true)
					}
				)
				getMenteeSession(walletAddress).then((session) => {
					setMenteeSession(session)
				})
				getMenteeRequest(walletAddress).then((request) => {
					setMenteeRequest(request)
				})
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	useEffect(() => {
		setHasRated(false)
		setRating(0)
		setFormValues({
			tipAmount: 0
		})
	}, [isConfirmationModalOpen])

	///////////////
	// Functions
	///////////////

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.name === "tipAmount" && tipFormField.current) {
			tipFormField.current.style.border = inputErrorStyle
		}
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function cancelRequest() {
		setWaitingModalMessage("Cancelling request...")
		cancelRequestForSession()
	}

	/**
	 * @notice For testing purposes we allow session confirmation even if isSessionOver is true
	 * Should be > if (menteeSession && !isSessionOver(timestamp, menteeSession)) 
	 */
	function onConfirmSession() {
		getCurrentBlockTimestamp().then((timestamp: number) => {
			if (menteeSession && isSessionOver(timestamp, menteeSession)) {
				openSnackBar("sessionNotFinished")
			} else {
				setIsConfirmationModalOpen(true)
			}
		})
	}

	function onRateSession() {
		if (rating === null || rating < 0 || rating > 5) {
			return
		}
		setHasRated(true)
	}

	function validateSession(tipped: boolean) {
		if (!menteeInfo?.mentor) return
		if (tipped && formValues.tipAmount <= 0 && tipFormField.current) {
			tipFormField.current.style.border = "1px solid red"
			return
		}
		setIsConfirmationModalOpen(false)
		setWaitingModalMessage("Validating session...")
		validateSessionAsMentee(
			menteeInfo.mentor,
			rating,
			tipped ? formValues.tipAmount : "0"
		)
	}

	if (!isLoaded || !menteeInfo) {
		return (
			<div className="loading-page">
				<Loader />
			</div>
		)
	}

	if (!menteeInfo.registered) {
		return (
			<div className="page fade-in-bottom">
				<h2 className="text-center">
					You are not registered as a mentee.
				</h2>
			</div>
		)
	}

	return (
		<>
			<div
				className={`${classes.menteeProfile} page flex flex-wrap gap-4 fade-in-bottom items-baseline`}
			>
				{!!menteeNextBadge.cost && (
					<ExperienceBar
						currentExp={menteeXp}
						maxExp={menteeNextBadge.cost}
						currentBadge={menteeBadge}
						nextBadge={menteeNextBadge}
						setWaitingModalMessage={setWaitingModalMessage}
						mentorView={false}
					/>
				)}
				<MenteeProfileCard menteeInfo={menteeInfo} />
				{menteeInfo?.hasRequest && !!menteeRequest && (
					<RequestCard
						menteeRequest={menteeRequest}
						cancelRequest={cancelRequest}
					/>
				)}
				{!!menteeSession && walletAddress && !menteeInfo.hasRequest && (
					<SessionCard
						session={menteeSession}
						mentorView={false}
						confirmSession={onConfirmSession}
					/>
				)}
			</div>
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>{waitingModalMessage}</h4>
					</div>
				</WaitingModal>
			)}
			{isConfirmationModalOpen && (
				<SessionConfirmationModal
					setIsConfirmationModalOpen={setIsConfirmationModalOpen}
					hasRated={hasRated}
					rating={rating}
					setRating={setRating}
					onRateSession={onRateSession}
					tipFormField={tipFormField}
					handleInputChange={handleInputChange}
					validateSession={validateSession}
				/>
			)}
			<WavesBackground />
		</>
	)
}
