import { useContext, useEffect, useState } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { getShortenedAddress } from "@/services/utils"
import classes from "./mentor-list.module.scss"
import { UserContext } from "@/services/UserContext"

interface MentorTableProps {
	mentors: Mentor[]
	selectMode?: boolean
	selectedMentor?: string
	setSelectedMentor?: (address: string) => void
	leaderboardView?: boolean
}

export default function MentorList({
	mentors,
	selectMode,
	selectedMentor,
	setSelectedMentor,
	leaderboardView
}: MentorTableProps) {
	const { walletAddress } = useContext(UserContext)
	const { getMentorAverageRating, getMentorInfo } = useContext(MentorContext)
	const { getLanguageLabel } = useContext(BlockchainContext)
	const [mentorUser, setMentorUser] = useState<Mentor | null>(null)
	const [isLoaded, setIsLoaded] = useState<boolean>(false)

	useEffect(() => {
		getMentorInfo(walletAddress).then((mentor) => {
			if (mentor?.validated) {
				setMentorUser(mentor)
			}
			setIsLoaded(true)
		})
	}, [walletAddress])

	if (leaderboardView) {
		mentors = mentors.slice(0, 10)
	}

	const tableStyles = {
		cursor: selectMode ? "pointer" : "default"
	}

	return (
		<div className={`${classes.mentor_list_container} fade-in-bottom`}>
			<h2>
				{leaderboardView ? "Leaderboard" : "List of Matching Mentors"}
			</h2>
			<table className={classes.mentor_table}>
				<thead>
					<tr>
						{leaderboardView && <th>Rank</th>}
						<th>Address</th>
						<th>Average Rating</th>
						<th>Session Count</th>
						<th>Language</th>
						<th>Years of Experience</th>
					</tr>
				</thead>
				{isLoaded && (
					<tbody>
						{mentors.map((mentor, index) => (
							<tr
								key={mentor.address}
								onClick={() => {
									if (selectMode && setSelectedMentor) {
										setSelectedMentor(mentor.address)
									}
								}}
								style={tableStyles}
								className={`${
									selectedMentor === mentor.address
										? classes.selected
										: ""
								} ${
									mentorUser?.address === mentor.address
										? classes.own_address
										: ""
								}`}
							>
								{leaderboardView && <td>{index + 1}</td>}
								<td>{getShortenedAddress(mentor.address)}</td>
								<td>
									{getMentorAverageRating(mentor).toFixed(1)}{" "}
									<i className="fa-solid fa-star"></i>
								</td>
								<td>{mentor.sessionCount}</td>
								<td>
									{getLanguageLabel(mentor.language || 0)}
								</td>
								<td>{mentor.yearsOfExperience}</td>
							</tr>
						))}
					</tbody>
				)}
			</table>
		</div>
	)
}
