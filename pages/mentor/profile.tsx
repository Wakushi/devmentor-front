import React, { use, useContext, useEffect, useState } from "react"
import classes from "./profile.module.scss" // Assume that you have a corresponding SASS/SCSS file for styling
import { MentorContext } from "@/services/blockchain/MentorContext"
import { UserContext } from "@/services/UserContext"
import { getTeachingSubjectLabel } from "@/services/utils"

export default function MentorProfile() {
	const [isAvailable, setIsAvailable] = useState(true) // Assuming availability is a toggleable state

	const { getMentorInfo, mentorInfo } = useContext(MentorContext)
	const { walletAddress } = useContext(UserContext)

	useEffect(() => {
		if (walletAddress) {
			getMentorInfo(walletAddress)
		}
	}, [])

	return (
		<div className={classes.mentorProfile}>
			{!mentorInfo.validated ? (
				<div className={classes.reviewMessage}>
					YOUR APPLICATION IS BEING REVIEWED
				</div>
			) : (
				<div className={classes.profileDetails}>
					<div className={classes.profileSection}>
						<h2>Your subjects</h2>
						{mentorInfo.teachingSubjects?.map((subject) => (
							<div key={subject}>
								{getTeachingSubjectLabel(subject)}
							</div>
						))}
						<button>Update subjects</button>
					</div>
					<div className={classes.profileSection}>
						<h2>Engagement : {mentorInfo.engagement?.label}</h2>
						<button>Update engagement</button>
					</div>
					<div className={classes.availabilityToggle}>
						<label>
							Available
							<input
								type="checkbox"
								checked={isAvailable}
								onChange={() => setIsAvailable(!isAvailable)}
							/>
						</label>
					</div>
					<div className={classes.profileSection}>
						<h2>Rating </h2>
					</div>
					<div className={classes.profileSection}>
						<h2>Preferred Language</h2>
					</div>
					<div className={classes.profileSection}>
						<h2>Accepted Requests : {mentorInfo.sessionCount}</h2>
					</div>
					<div className={classes.profileSection}>
						<h2>Fulfilled Requests</h2>
					</div>
					<div className={classes.profileSection}>
						<h2>TIPS received : </h2>
					</div>
					<div className={classes.profileSection}>
						<h2>Current mentee : {mentorInfo.mentee}</h2>
					</div>
				</div>
			)}
		</div>
	)
}
