import Button from "@/components/ui/button/button"
import { useContext, useState } from "react"
import { MentorContext } from "@/services/blockchain/MentorContext"

export default function Landing() {
	const { approveMentor } = useContext(MentorContext)
	const [mentorToValidate, setMentorToValidate] = useState("")

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setMentorToValidate(event.target.value)
	}

	function onApproveMentor() {
		console.log("mentorToValidate: ", mentorToValidate)
		approveMentor(mentorToValidate)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<div className="flex flex-col items-center gap-2">
					<input
						id="mentorToValidate"
						name="mentorToValidate"
						type="text"
						placeholder="Enter mentor address"
						value={mentorToValidate}
						onChange={handleInputChange}
					/>
					<Button onClick={onApproveMentor} filled={true}>
						Validate mentor
					</Button>
				</div>
			</div>
		</div>
	)
}
