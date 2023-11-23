import { MouseEvent, useContext, useEffect, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { getTeachingSubjectLabel, isAddressZero } from "@/services/utils"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { UserContext } from "@/services/UserContext"
import SessionCard from "@/components/session/session"
import Loader from "@/components/ui/loader/loader"
import classes from "./profile.module.scss"
import ConfirmationModal from "@/components/confirmation-modal/confirmation-modal"
import Button from "@/components/ui/button/button"
import WaitingModal from "@/components/waiting-modal/waiting-modal"

export default function MentorProfile() {
	const [isLoaded, setIsLoaded] = useState(true)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false)

	const { walletAddress } = useContext(UserContext)
	const { getMentorInfo, getMentorAverageRating, validateSessionAsMentor } =
		useContext(MentorContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getLanguageLabel, isWaitingForTransaction } =
		useContext(BlockchainContext)

	useEffect(() => {
		if (!mentorInfo || !isWaitingForTransaction) {
			getMentorInfo(walletAddress).then((mentor) => {
				setMentorInfo(mentor)
				if (!mentor) return
				getMenteeSession(mentor?.mentee).then((session) => {
					setMenteeSession(session)
					setIsLoaded(true)
				})
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	function onConfirmSession() {
		setIsConfirmationModalOpen(true)
	}

	function validateSession() {
		if (!mentorInfo) return
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

	return (
		<div
			className={`${classes.mentorProfile} page flex  items-center gap-4 fade-in-bottom `}
		>
			{!mentorInfo.validated ? (
				<div className="flex flex-col gap-2">
					<div className={classes.reviewMessage}>
						YOUR APPLICATION IS BEING REVIEWED
					</div>
				</div>
			) : (
				<div className={classes.profileDetails}>
					<h2>Profile</h2>
					<div className={classes.profileSection}>
						<h3>Your subjects</h3>
						{mentorInfo.teachingSubjects?.map((subject) => (
							<div key={subject}>
								{getTeachingSubjectLabel(+subject)}
							</div>
						))}
						<button onClick={() => {}}>Update subjects</button>
					</div>
					<div className={classes.profileSection}>
						<h3>Engagement : {mentorInfo.engagement?.label}</h3>
						<button>Update engagement</button>
					</div>

					<div className={classes.profileSection}>
						<h3>
							Rating :{" "}
							{getMentorAverageRating(mentorInfo).toFixed(2)}{" "}
							<i className="fa-solid fa-star brand-color"></i>{" "}
						</h3>
					</div>
					<div className={classes.profileSection}>
						<h3>
							Preferred Language :{" "}
							{getLanguageLabel(mentorInfo?.language || 0)}
						</h3>
					</div>
					<div className={classes.profileSection}>
						<h3>Accepted Requests : {mentorInfo.sessionCount}</h3>
					</div>
					<div className={classes.profileSection}>
						<h3>
							Current mentee :{" "}
							{isAddressZero(mentorInfo.mentee)
								? "You don't have a mentee."
								: mentorInfo.mentee}
						</h3>
					</div>
				</div>
			)}
			{!!menteeSession && (
				<SessionCard
					session={menteeSession}
					mentorView={true}
					confirmSession={onConfirmSession}
				/>
			)}
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>Validating session...</h4>
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
	)
}
