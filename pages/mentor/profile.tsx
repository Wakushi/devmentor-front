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
import {
	Badge,
	Reward,
	RewardContext
} from "@/services/blockchain/RewardContext"
import ExperienceBar from "@/components/xp-bar/xp-bar"
import MentorProfileCard from "@/components/mentor-profile-card/mentor-profile-card"
import PrizeCard from "@/components/prize-card/prize-card"

interface FormValues {
	email: string
}

interface FormErrors {
	email?: string
}

export default function MentorProfile() {
	///////////////
	// State
	///////////////
	const [isLoaded, setIsLoaded] = useState(true)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false)
	const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
	const [waitingModalMessage, setWaitingModalMessage] = useState("")
	const [mentorXp, setMentorXp] = useState<number>(0)
	const [mentorTokens, setMentorTokens] = useState<number>(0)
	const [claimedRewards, setClaimedRewards] = useState<Reward[]>()
	const [targetRedeemReward, setTargetRedeemReward] = useState<Reward>()
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
	const [formValues, setFormValues] = useState<FormValues>({
		email: ""
	})
	const [formErrors, setFormErrors] = useState<FormErrors>({})

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
		getMentorTokenAmount,
		getUserRewards,
		redeemReward
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
						setIsLoaded(true)
					}
				)
				getUserRewards(walletAddress).then((rewards) => {
					setClaimedRewards(rewards)
				})
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	useEffect(() => {
		setFormErrors({ ...formErrors, email: "" })
	}, [isRedeemModalOpen])

	///////////////
	// Functions
	///////////////

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

	function validateSession() {
		if (!mentorInfo) return
		setWaitingModalMessage("Validating session...")
		setIsConfirmationModalOpen(false)
		validateSessionAsMentor(mentorInfo?.mentee)
	}

	function onRedeem() {
		if (
			(targetRedeemReward?.externalPrice && !validateForm()) ||
			!targetRedeemReward
		)
			return
		setWaitingModalMessage("Redeeming reward...")
		setIsRedeemModalOpen(false)

		redeemReward(targetRedeemReward?.id.toString(), formValues.email)
	}

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormErrors({ ...formErrors, email: "" })
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function validateForm(): boolean {
		let errors: FormErrors = {}
		if (formValues.email.trim() === "") {
			errors.email =
				"Please add one email address for us to contact you with your prize."
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
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
						mentorView
					/>
				)}
				{mentorInfo.registered && !mentorInfo.validated ? (
					<div className="flex flex-col gap-2">
						<div className={classes.reviewMessage}>
							YOUR APPLICATION IS BEING REVIEWED
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4 items-baseline">
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
						{claimedRewards && claimedRewards.length > 0 && (
							<div className="flex flex-wrap gap-5 justify-center items-start p-5">
								{claimedRewards.map((prize: Reward) => (
									<PrizeCard
										key={prize.id}
										price={prize.price}
										totalSupply={prize.totalSupply}
										remainingSupply={prize.remainingSupply}
										metaDataUri={prize.metadataURI}
										claimedView={true}
										onClaim={() => {
											setTargetRedeemReward(prize)
											setIsRedeemModalOpen(true)
										}}
									/>
								))}
							</div>
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
				{isRedeemModalOpen && (
					<ConfirmationModal
						setIsConfirmationModalOpen={setIsRedeemModalOpen}
					>
						<div className="flex flex-col gap-2">
							<h4>Redeem your prize ?</h4>
							<div className="flex flex-col justify-center gap-4">
								{targetRedeemReward?.externalPrice && (
									<>
										<label
											className="modal-form-label"
											htmlFor="email"
										>
											Enter your email so we can reach out
											to you ! 🎊
										</label>
										<div className="dark-input">
											<input
												type="email"
												id="email"
												name="email"
												value={formValues.email}
												onChange={handleInputChange}
											/>
										</div>
										{formErrors.email && (
											<div className={`form_error`}>
												{formErrors.email}
											</div>
										)}
									</>
								)}
								<div className="flex justify-center gap-2">
									<Button onClick={onRedeem} filled={true}>
										Redeem
									</Button>
									<Button
										onClick={() => {
											setIsRedeemModalOpen(false)
										}}
										filled={true}
									>
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</ConfirmationModal>
				)}
			</div>
			<WavesBackground />
		</>
	)
}
