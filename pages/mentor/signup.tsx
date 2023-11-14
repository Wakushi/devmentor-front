import Button from "@/components/ui/button/button"
import React, { useContext, useState } from "react"
import {
	teachingSubjects,
	engagements,
	Engagement
} from "../../services/constants"
import classes from "./signup.module.scss"
import { useRouter } from "next/router"
import { MentorContext } from "@/services/blockchain/MentorContext"
import {
	BlockchainContext,
	Language
} from "@/services/blockchain/BlockchainContext"

interface FormValues {
	language: number
	teachingSubjects: string[]
	engagement: number
	yearsOfExperience: number
	selfIntroduction: string
}

interface FormErrors {
	teachingSubjects?: string
	engagement?: string
	yearsOfExperience?: string
	selfIntroduction?: string
}

export default function SignupForm() {
	const { registerAsMentor } = useContext(MentorContext)

	const { languages } = useContext(BlockchainContext)

	const [formValues, setFormValues] = useState<FormValues>({
		language: languages[0].id,
		teachingSubjects: [],
		engagement: 0,
		yearsOfExperience: 1,
		selfIntroduction: ""
	})

	const [formErrors, setFormErrors] = useState<FormErrors>({})

	const [submittedForm, setSubmittedForm] = useState(false)

	const router = useRouter()

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.type === "checkbox") {
			setFormErrors({ ...formErrors, teachingSubjects: "" })
			setFormValues({
				...formValues,
				teachingSubjects: event.target.checked
					? [...formValues.teachingSubjects, event.target.name]
					: formValues.teachingSubjects.filter(
							(subject) => subject !== event.target.name
					  )
			})
		} else {
			setFormValues({
				...formValues,
				[event.target.name]: event.target.value
			})
		}
	}

	function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setFormErrors({ ...formErrors, engagement: "" })
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function handleTextareaChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	) {
		setFormErrors({ ...formErrors, selfIntroduction: "" })
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (validateForm()) {
			console.log(formValues)
			const {
				language,
				teachingSubjects,
				engagement,
				yearsOfExperience
			} = formValues
			setSubmittedForm(true)
			registerAsMentor(
				teachingSubjects,
				engagement,
				language,
				yearsOfExperience
			)
			// Proceed with form submission logic
		}
	}

	function validateForm(): boolean {
		let errors: FormErrors = {}
		if (formValues.teachingSubjects.length === 0) {
			errors.teachingSubjects =
				"Please select at least one teaching subject."
		}
		if (formValues.engagement === 0) {
			errors.engagement = "Please choose an engagement option."
		}
		if (formValues.yearsOfExperience < 1) {
			errors.yearsOfExperience = "Please enter your years of experience."
		}
		if (formValues.selfIntroduction.trim() === "") {
			errors.selfIntroduction = "Please introduce yourself."
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	function goToProfilePage() {
		router.push("/mentor/profile")
	}

	return (
		<>
			{submittedForm ? (
				<div className="flex flex-col justify-center items-center gap-4">
					<h4>
						Your application will be reviewed and if everything is
						fine we'll validate your mentor account !{" "}
					</h4>
					<Button onClick={goToProfilePage} filled={true}>
						My profile
					</Button>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className={`${classes.mentor_form} flex flex-col gap-2 p-4`}
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
					<label>Teaching Subjects:</label>
					{teachingSubjects.map((subject, index) => (
						<div key={subject} className="flex gap-1">
							<input
								type="checkbox"
								id={subject}
								name={index.toString()}
								checked={formValues.teachingSubjects.includes(
									index.toString()
								)}
								onChange={handleInputChange}
							/>
							<label htmlFor={subject}>{subject}</label>
						</div>
					))}
					{formErrors.teachingSubjects && (
						<div className={classes.form_error}>
							{formErrors.teachingSubjects}
						</div>
					)}
					<br />
					<label htmlFor="engagement">Select your engagement:</label>
					<select
						id="engagement"
						name="engagement"
						value={formValues.engagement}
						onChange={handleSelectChange}
					>
						<option value={0}>--Please choose an option--</option>
						{engagements.map(
							({ durationInSeconds, label }: Engagement) => (
								<option key={label} value={durationInSeconds}>
									{label}
								</option>
							)
						)}
					</select>
					{formErrors.engagement && (
						<div className={classes.form_error}>
							{formErrors.engagement}
						</div>
					)}
					<br />
					<label htmlFor="yearsOfExperience">
						How many years of experience do you have ?
					</label>
					<input
						type="number"
						id="yearsOfExperience"
						name="yearsOfExperience"
						min={1}
						value={formValues.yearsOfExperience}
						onChange={handleInputChange}
					/>
					{formErrors.yearsOfExperience && (
						<div className={classes.form_error}>
							{formErrors.yearsOfExperience}
						</div>
					)}
					<br />
					<label htmlFor="selfIntroduction">
						Present yourself and tell us why you want to be a mentor
						? (share articles, twitter or github if possible)
					</label>
					<textarea
						id="selfIntroduction"
						name="selfIntroduction"
						value={formValues.selfIntroduction}
						onChange={handleTextareaChange}
					/>
					{formErrors.selfIntroduction && (
						<div className={classes.form_error}>
							{formErrors.selfIntroduction}
						</div>
					)}
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
