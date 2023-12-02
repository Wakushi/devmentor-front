import { useContext, useEffect, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import MentorList from "@/components/mentor-list/mentor-list"
import { rankMentors } from "@/services/utils"

export default function Landing() {
	const { getAllMentors } = useContext(MentorContext)

	const [mentors, setMentors] = useState<Mentor[]>([])

	useEffect(() => {
		getAllMentors().then((mentors) => {
			setMentors(rankMentors(mentors))
		})
	}, [])

	return (
		<div className="page flex flex-col gap-4">
			<div className="flex justify-center gap-20 p-4">
				{!!mentors.length && (
					<MentorList mentors={mentors} leaderboardView={true} />
				)}
			</div>
			<WavesBackground />
		</div>
	)
}
