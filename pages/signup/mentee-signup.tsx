import Button from "@/components/ui/button/button"
import { useContext, useState } from "react"
import {
	teachingSubjects,
	engagements,
	Engagement,
	levels
} from "../../services/constants"
import classes from "./mentee-signup.module.scss"
import {
	BlockchainContext,
	Language
} from "@/services/blockchain/BlockchainContext"
import {
	MenteeContext,
	MenteeRegistrationAndRequest
} from "@/services/blockchain/MenteeContext"
import { ethers } from "ethers"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { getShortenedAddress } from "@/services/utils"
import MentorList from "@/components/mentor-list/mentor-list"

interface FormValues {
	language: number
	teachingSubject: number
	engagement: number
	level: number
}

export default function MenteeSignup() {
	const { getMatchingMentors, registerAsMenteeAndMakeRequestForSession } =
		useContext(MenteeContext)
	const { getMentorAverageRating } = useContext(MentorContext)
	const { languages, getLanguageLabel } = useContext(BlockchainContext)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [formValues, setFormValues] = useState<FormValues>({
		language: 0,
		teachingSubject: 0,
		engagement: engagements[0].durationInSeconds,
		level: 0
	})
	const [matchingMentors, setMatchingMentors] = useState<Mentor[]>([])

	function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const { language, teachingSubject, engagement } = formValues
		getMatchingMentors(teachingSubject, engagement, language).then(
			(mentors: Mentor[]) => {
				setMatchingMentors(mentors)
				setSubmittedForm(true)
			}
		)
	}

	function matchWithRandomMentor() {
		const { language, teachingSubject, engagement, level } = formValues
		const matchingMentorsAddresses: string[] = matchingMentors.map(
			(mentor: Mentor) => mentor.address
		)
		const menteeRegistrationAndRequest: MenteeRegistrationAndRequest = {
			level,
			subject: teachingSubject,
			language,
			engagement,
			matchingMentors: matchingMentorsAddresses,
			chosenMentor: ethers.ZeroAddress
		}
		registerAsMenteeAndMakeRequestForSession(
			menteeRegistrationAndRequest,
			"0"
		)
	}

	return (
		<>
			{submittedForm ? (
				<div className="flex flex-col justify-center items-center gap-4">
					<MentorList mentors={matchingMentors} />
					<div className="flex justify-center items-center gap-4">
						<button
							onClick={matchWithRandomMentor}
							className={`${classes.big_button}`}
						>
							Match with a random mentor
						</button>
						<button className={`${classes.big_button}`}>
							Lock asset and choose a mentor
						</button>
					</div>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className={`basic_form flex flex-col gap-2 p-4`}
				>
					<label htmlFor="language">Select your language:</label>
					<select
						id="language"
						name="language"
						value={formValues.language}
						onChange={handleSelectChange}
					>
						{languages.map(({ label, id }: Language) => (
							<option key={label} value={id}>
								{label}
							</option>
						))}
					</select>
					<br />
					<label htmlFor="level">Select your level:</label>
					<select
						id="level"
						name="level"
						value={formValues.level}
						onChange={handleSelectChange}
					>
						{levels.map((level) => (
							<option key={level} value={level}>
								{level}
							</option>
						))}
					</select>
					<br />
					<label>Subject you want to learn:</label>
					<select
						id="teachingSubject"
						name="teachingSubject"
						value={formValues.teachingSubject}
						onChange={handleSelectChange}
					>
						{teachingSubjects.map((subject, index) => (
							<option key={subject} value={index}>
								{subject}
							</option>
						))}
					</select>
					<br />
					<label htmlFor="engagement">Select your engagement:</label>
					<select
						id="engagement"
						name="engagement"
						value={formValues.engagement}
						onChange={handleSelectChange}
					>
						{engagements.map(
							({ durationInSeconds, label }: Engagement) => (
								<option key={label} value={durationInSeconds}>
									{label}
								</option>
							)
						)}
					</select>
					<br />

					<Button
						onClick={() => {
							handleSubmit
						}}
						filled={true}
					>
						Submit
					</Button>
				</form>
			)}
		</>
	)
}
