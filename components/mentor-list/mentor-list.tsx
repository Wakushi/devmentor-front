import { useContext } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { getShortenedAddress } from "@/services/utils"
import classes from "./mentor-list.module.scss"

interface MentorTableProps {
	mentors: Mentor[]
}

export default function MentorList({ mentors }: MentorTableProps) {
	const { getMentorAverageRating } = useContext(MentorContext)
	const { getLanguageLabel } = useContext(BlockchainContext)

	return (
		<div className={classes.mentor_list_container}>
			<h2>List of Matching Mentors</h2>
			<table className={classes.mentor_table}>
				<thead>
					<tr>
						<th>Address</th>
						<th>Average Rating</th>
						<th>Session Count</th>
						<th>Language</th>
						<th>Years of Experience</th>
					</tr>
				</thead>
				<tbody>
					{mentors.map((mentor) => (
						<tr key={mentor.address}>
							<td>{getShortenedAddress(mentor.address)}</td>
							<td>
								{getMentorAverageRating(mentor)}{" "}
								<i className="fa-solid fa-star"></i>
							</td>
							<td>{mentor.sessionCount}</td>
							<td>{getLanguageLabel(mentor.language || 0)}</td>
							<td>{mentor.yearsOfExperience}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
