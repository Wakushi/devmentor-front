import { useContext, useEffect } from "react"
import { UserContext } from "@/services/UserContext"
import { MenteeContext } from "@/services/blockchain/MenteeContext"
import { getLanguageLabel } from "@/services/utils"
import classes from "./profile.module.scss"

export default function MenteeProfile() {
	const { getMenteeInfo, menteeInfo } = useContext(MenteeContext)
	const { walletAddress } = useContext(UserContext)

	useEffect(() => {
		if (walletAddress) {
			getMenteeInfo(walletAddress)
		}
	}, [])

	return (
		<div className={classes.mentorProfile}>
			<div className={classes.profileDetails}>
				<div className={classes.profileSection}>
					<h2>
						Preferred Language :{" "}
						{getLanguageLabel(menteeInfo?.language || 0)}
					</h2>
				</div>
				<div className={classes.profileSection}>
					<h2>Sessions : {menteeInfo?.sessionCount}</h2>
				</div>

				<div className={classes.profileSection}>
					<h2>Current mentor : {menteeInfo?.mentor}</h2>
				</div>
			</div>
		</div>
	)
}
