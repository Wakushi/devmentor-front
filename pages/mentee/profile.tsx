import { useContext, useEffect, useState } from "react"
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

export default function MenteeProfile() {
	const [isLoaded, setIsLoaded] = useState(false)
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)
	const [menteeRequest, setMenteeRequest] = useState<MenteeRequest | null>(
		null
	)

	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo, getMenteeRequest, cancelRequestForSession } =
		useContext(MenteeContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getLanguageLabel, isWaitingForTransaction } =
		useContext(BlockchainContext)

	useEffect(() => {
		if (!menteeInfo || menteeInfo.hasRequest) {
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

	function cancelRequest() {
		cancelRequestForSession()
	}

	return isLoaded && menteeInfo ? (
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
					<SessionCard session={menteeSession} mentorView={false} />
				)}
			</div>
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>Cancelling request. Please wait...</h4>
					</div>
				</WaitingModal>
			)}
		</>
	) : (
		<Loader />
	)
}
