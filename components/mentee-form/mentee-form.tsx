import {
	BlockchainContext,
	Language
} from "@/services/blockchain/BlockchainContext"
import {
	Engagement,
	engagements,
	levels,
	teachingSubjects
} from "@/services/constants"
import { FormEvent, useContext } from "react"
import Button from "../ui/button/button"
import Loader from "../ui/loader/loader"

interface MenteeFormProps {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void
	formValues: FormValues
	setFormValues: (formValues: FormValues) => void
	isLoading?: boolean
	registered?: boolean
}

export interface FormValues {
	language: number
	teachingSubject: number
	engagement: number
	level: number
	lockedAmount: number
}

export default function MenteeForm({
	handleSubmit,
	formValues,
	setFormValues,
	isLoading,
	registered
}: MenteeFormProps) {
	const { languages } = useContext(BlockchainContext)

	function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}
	return (
		<form
			onSubmit={handleSubmit}
			className={`basic-card basic-form flex flex-col gap-2 p-4`}
		>
			{!registered && <h2>Start your mentee journey</h2>}
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
				{levels.map((level, index) => (
					<option key={level} value={index}>
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
				{engagements.map(({ durationInSeconds, label }: Engagement) => (
					<option key={label} value={durationInSeconds}>
						{label}
					</option>
				))}
			</select>
			<br />

			{isLoading ? (
				<div className="flex justify-center">
					<Loader />
				</div>
			) : (
				<Button
					onClick={() => {
						handleSubmit
					}}
					filled={true}
				>
					Submit
				</Button>
			)}
		</form>
	)
}
