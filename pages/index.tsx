import Button from "@/components/ui/button/button"
import { useContext, useState } from "react"
import { MentorContext } from "@/services/blockchain/MentorContext"
import { SessionContext } from "@/services/blockchain/SessionContext"

export default function Landing() {
	const { approveMentor } = useContext(MentorContext)
	const { adminCompleteSession, adminUpdateSessionEngagement } =
		useContext(SessionContext)

	const [formValues, setFormValues] = useState<any>({
		mentorAddress: "",
		menteeAddress: ""
	})

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
			<div className="flex gap-4 p-4">
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
			</div>
		</div>
	)
}
