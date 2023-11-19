import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/services/UserContext"
import { Mentee, MenteeContext } from "@/services/blockchain/MenteeContext"
import classes from "./profile.module.scss"
import Loader from "@/components/ui/loader/loader"
import SessionCard from "@/components/session/session"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"

export default function MenteeProfile() {
	const [isLoaded, setIsLoaded] = useState(false)
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [menteeSession, setMenteeSession] = useState<Session | null>(null)

	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo } = useContext(MenteeContext)
	const { getMenteeSession } = useContext(SessionContext)
	const { getLanguageLabel } = useContext(BlockchainContext)

	useEffect(() => {
		if (!menteeInfo) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				if (!mentee) return
				getMenteeSession(walletAddress).then((session) => {
					setMenteeSession(session)
					setIsLoaded(true)
				})
			})
		}
	}, [walletAddress])

	return isLoaded ? (
		<div
			className={`${classes.menteeProfile} flex items-baseline gap-4 fade-in-bottom `}
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
						Current mentor: <span>{menteeInfo?.mentor}</span>
					</h3>
				</div>
			</div>
			{!!menteeSession && walletAddress && (
				<SessionCard session={menteeSession} mentorView={false} />
			)}
		</div>
	) : (
		<Loader />
	)
}
