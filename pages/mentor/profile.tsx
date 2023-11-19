import { useContext, useEffect, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { getTeachingSubjectLabel, isAddressZero } from "@/services/utils"
import SessionCard from "@/components/session/session"
import Loader from "@/components/ui/loader/loader"
import classes from "./profile.module.scss"
import { UserContext } from "@/services/UserContext"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"

export default function MentorProfile() {
	const [isLoaded, setIsLoaded] = useState(true)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)

	const { walletAddress } = useContext(UserContext)
	const { getMentorInfo, getMentorAverageRating } = useContext(MentorContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getLanguageLabel } = useContext(BlockchainContext)

	useEffect(() => {
		if (!mentorInfo) {
			getMentorInfo(walletAddress).then((mentor) => {
				setMentorInfo(mentor)
				if (!mentor) return
				getMenteeSession(mentor?.mentee).then((session) => {
					setMenteeSession(session)
					setIsLoaded(true)
				})
			})
		}
	}, [walletAddress])

	if (!isLoaded || !mentorInfo) {
		return <Loader />
	}

	return (
		<div
			className={`${classes.mentorProfile} flex flex-col items-center gap-4 fade-in-bottom `}
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
								{getTeachingSubjectLabel(subject)}
							</div>
						))}
						<button onClick={() => {}}>Update subjects</button>
					</div>
					<div className={classes.profileSection}>
						<h3>Engagement : {mentorInfo.engagement?.label}</h3>
						<button>Update engagement</button>
					</div>

					<div className={classes.profileSection}>
						<h3>Rating : {getMentorAverageRating(mentorInfo)} </h3>
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
				<SessionCard session={menteeSession} mentorView={true} />
			)}
		</div>
	)
}
