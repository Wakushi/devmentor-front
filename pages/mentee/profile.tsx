import { MouseEvent, useContext, useEffect, useRef, useState } from "react"
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
import {
	getLevelLabel,
	getTeachingSubjectLabel,
	isAddressZero
} from "@/services/utils"
import Button from "@/components/ui/button/button"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import ConfirmationModal from "@/components/confirmation-modal/confirmation-modal"

export default function MenteeProfile() {
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
		rate: null,
		tipAmount: 0
	})
	const [waitingModalMessage, setWaitingModalMessage] = useState("")

	const { walletAddress } = useContext(UserContext)
	const {
		getMenteeInfo,
		getMenteeRequest,
		cancelRequestForSession,
		validateSessionAsMentee
	} = useContext(MenteeContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getLanguageLabel, isWaitingForTransaction } =
		useContext(BlockchainContext)

	const rateFormField = useRef<HTMLDivElement | null>(null)
	const tipFormField = useRef<HTMLDivElement | null>(null)

	const inputErrorStyle = "1px solid rgba(140, 140, 140, 0.29)"

	useEffect(() => {
		if (!menteeInfo || menteeInfo.hasRequest || !isWaitingForTransaction) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				if (!mentee) return
				getMenteeSession(walletAddress).then((session) => {
					setMenteeSession(session)
					setIsLoaded(true)
				})
				getMenteeRequest(walletAddress).then((request) => {
					setMenteeRequest(request)
				})
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	useEffect(() => {
		setHasRated(false)
		setFormValues({
			rate: null,
			tipAmount: 0
		})
	}, [isConfirmationModalOpen])

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.name === "rate" && rateFormField.current) {
			rateFormField.current.style.border = inputErrorStyle
		}
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

	function onConfirmSession() {
		setIsConfirmationModalOpen(true)
	}

	function onRateSession() {
		const rate = formValues.rate
		if ((rate === null || rate < 0 || rate > 5) && rateFormField.current) {
			rateFormField.current.style.border = "1px solid red"
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
			formValues.rate,
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

	return (
		<>
			<div
				className={`${classes.menteeProfile} page flex items-baseline gap-4 fade-in-bottom `}
			>
				<div className={classes.profileDetails}>
					<h2>Profile</h2>
					<div className={classes.profileSection}>
						<h3>
							Preferred Language:{" "}
							<span>
								{getLanguageLabel(menteeInfo?.language || 0)}
							</span>
						</h3>
					</div>
					<div className={classes.profileSection}>
						<h3>
							Sessions: <span>{menteeInfo?.sessionCount}</span>
						</h3>
					</div>
					<div className={classes.profileSection}>
						<h3>
							Current mentor :{" "}
							{isAddressZero(menteeInfo.mentor)
								? "You don't have a mentor yet."
								: menteeInfo.mentor}
						</h3>
					</div>
				</div>
				{menteeInfo?.hasRequest && !!menteeRequest && (
					<div className={`basic-card ${classes.request}`}>
						<h2>Opened request</h2>
						<ul>
							<li>
								Engagement: {menteeRequest.engagement?.label}{" "}
							</li>
							<li>
								Level: {getLevelLabel(menteeRequest.level)}{" "}
							</li>
							<li>
								Subjet :{" "}
								{getTeachingSubjectLabel(menteeRequest.subject)}{" "}
							</li>
						</ul>
						<Button onClick={cancelRequest} filled={true}>
							Cancel
						</Button>
					</div>
				)}
				{!!menteeSession && walletAddress && (
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
				<ConfirmationModal
					outsideClickHandler={(event: MouseEvent<HTMLElement>) => {
						if (
							event.target instanceof HTMLElement &&
							event.target.id !== "modal-container"
						)
							return
						setIsConfirmationModalOpen(false)
					}}
				>
					{!hasRated ? (
						<div className="flex flex-col gap-2">
							<h4>Please rate your session :</h4>
							<div ref={rateFormField} className="dark-input">
								<input
									type="number"
									name="rate"
									placeholder="5"
									min={0}
									max={5}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center gap-2">
								<Button onClick={onRateSession} filled={true}>
									Rate
								</Button>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-2">
							<h4>Thank your mentor with a tip !</h4>
							<p>(Amount in USD will be converted to ETH)</p>
							<div
								ref={tipFormField}
								className="dark-input flex items-center"
							>
								<input
									type="number"
									name="tipAmount"
									placeholder="5"
									min={0}
									onChange={handleInputChange}
								/>
								<span className="dollar-symbol">$</span>
							</div>
							<div className="flex justify-center gap-2">
								<Button
									onClick={() => {
										validateSession(false)
									}}
									filled={true}
								>
									Confirm
								</Button>
								<Button
									onClick={() => {
										validateSession(true)
									}}
									filled={true}
								>
									Tip and confirm
								</Button>
							</div>
						</div>
					)}
				</ConfirmationModal>
			)}
		</>
	)
}
