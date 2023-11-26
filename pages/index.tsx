import Button from "@/components/ui/button/button"
import { useContext, useEffect, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { SessionContext } from "@/services/blockchain/SessionContext"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import MentorList from "@/components/mentor-list/mentor-list"
import { rankMentors } from "@/services/utils"

export default function Landing() {
	const { approveMentor, getAllMentors } = useContext(MentorContext)
	const { adminCompleteSession, adminUpdateSessionEngagement } =
		useContext(SessionContext)

	const [formValues, setFormValues] = useState<any>({
		mentorAddress: "",
		menteeAddress: ""
	})
	const [mentors, setMentors] = useState<Mentor[]>([])

	useEffect(() => {
		getAllMentors().then((mentors) => {
			setMentors(rankMentors(mentors))
		})
	}, [])

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function onApproveMentor() {
		approveMentor(formValues.mentorAddress)
	}

	function onCompleteSession() {
		adminCompleteSession(
			formValues.mentorAddress,
			formValues.menteeAddress,
			"0"
		)
	}

	function onUpdateEngagement() {
		adminUpdateSessionEngagement(
			formValues.menteeAddress,
			formValues.mentorAddress,
			10
		)
	}

	return (
		<div className="page flex flex-col gap-4">
			<div className="flex gap-20 p-4">
				<div className="flex flex-col items-center gap-2">
					<input
						id="mentorToValidate"
						name="mentorAddress"
						type="text"
						placeholder="Enter mentor address"
						value={formValues.mentorAddress}
						onChange={handleInputChange}
					/>
					<Button onClick={onApproveMentor} filled={true}>
						Validate mentor
					</Button>
				</div>
				<div className="flex flex-col items-center gap-2">
					<input
						id="mentorToValidate"
						name="menteeAddress"
						type="text"
						placeholder="Enter mentee address"
						value={formValues.menteeAddress}
						onChange={handleInputChange}
					/>
					<input
						id="mentorToValidate"
						name="mentorAddress"
						type="text"
						placeholder="Enter mentor address"
						value={formValues.mentorAddress}
						onChange={handleInputChange}
					/>
					<Button onClick={onCompleteSession} filled={true}>
						Complete session
					</Button>
					<Button onClick={onUpdateEngagement} filled={true}>
						Update engagement
					</Button>
				</div>
				{!!mentors.length && (
					<MentorList mentors={mentors} leaderboardView={true} />
				)}
			</div>
			<WavesBackground />
		</div>
	)
}
