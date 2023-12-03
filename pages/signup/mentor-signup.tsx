import Button from "@/components/ui/button/button"
import { useContext, useEffect, useState } from "react"
import {
	teachingSubjects,
	engagements,
	Engagement,
	DEVMENTOR_API_URL
} from "../../services/constants"
import { useRouter } from "next/router"
import {
	MentorContext,
	MentorRegistration
} from "@/services/blockchain/MentorContext"
import {
	BlockchainContext,
	Language
} from "@/services/blockchain/BlockchainContext"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import { getShortenedAddress } from "@/services/utils"
import TriangleBackground from "@/components/ui/backgrounds/triangle/triangle-bg"
import { UserContext } from "@/services/UserContext"
import { SnackbarContext } from "@/services/SnackbarContext"

interface FormValues {
	language: number
	teachingSubjects: string[]
	engagement: number
	yearsOfExperience: number
	selfIntroduction: string
	contact: string
}

interface FormErrors {
	teachingSubjects?: string
	engagement?: string
	yearsOfExperience?: string
	selfIntroduction?: string
	contact?: string
}

export default function MentorSignup() {
	const { registerAsMentor, isAccountMentor } = useContext(MentorContext)
	const { setIsRegistered } = useContext(BlockchainContext)
	const { walletAddress } = useContext(UserContext)
	const { openSnackBar } = useContext(SnackbarContext)

	const {
		languages,
		isWaitingForTransaction,
		isRegistered,
		transactionHash
	} = useContext(BlockchainContext)

	const [formValues, setFormValues] = useState<FormValues>({
		language: 0,
		teachingSubjects: [],
		engagement: 0,
		yearsOfExperience: 1,
		selfIntroduction: "",
		contact: ""
	})

	const [formErrors, setFormErrors] = useState<FormErrors>({})

	const router = useRouter()

	useEffect(() => {
		if (setIsRegistered) {
			setIsRegistered(false)
		}
		if (walletAddress) {
			isAccountMentor(walletAddress).then((isMentor) => {
				if (isMentor) {
					router.push("/mentor/profile")
				}
			})
		}
	}, [walletAddress])

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
			setFormErrors({ ...formErrors, contact: "" })
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
		if (formValues.contact.trim() === "") {
			errors.contact =
				"Please add one way for your mentee to contact you."
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (validateForm()) {
			const {
				language,
				teachingSubjects,
				engagement,
				yearsOfExperience,
				contact
			} = formValues
			const mentorRegistration: MentorRegistration = {
				teachingSubjects,
				engagement,
				language,
				yearsOfExperience,
				contact
			}
			registerAsMentor(mentorRegistration).then(() => {
				sendApplication()
			})
		}
	}

	function goToProfilePage() {
		router.push("/mentor/profile")
	}

	function sendApplication() {
		const { selfIntroduction, contact, yearsOfExperience } = formValues

		const application = {
			address: walletAddress,
			selfIntroduction,
			contact,
			yearsOfExperience
		}

		fetch(`${DEVMENTOR_API_URL}/mailer/application`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(application)
		})
			.then((response) => response.json())
			.then((data) => {
				openSnackBar(data.message)
			})
			.catch(() => {
				openSnackBar("error")
			})
	}

	return (
		<>
			{isRegistered ? (
				<div
					className={`form_confirmation flex flex-col justify-center items-center gap-4 fade-in-bottom`}
				>
					<h4>
						Thank you for submitting your application. We are
						excited to review it and, if all criteria are met, we
						look forward to validating your mentor account soon!{" "}
					</h4>
					<Button onClick={goToProfilePage} filled={true}>
						My profile
					</Button>
				</div>
			) : (
				<div className="page fade-in-bottom">
					<form
						onSubmit={handleSubmit}
						className={`basic-card basic-form flex flex-col gap-2 p-4`}
					>
						<h2>Register as a mentor</h2>
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
							<div className={`form_error`}>
								{formErrors.teachingSubjects}
							</div>
						)}
						<br />
						<label htmlFor="engagement">
							Select your engagement:
						</label>
						<select
							id="engagement"
							name="engagement"
							value={formValues.engagement}
							onChange={handleSelectChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							{engagements.map(
								({ durationInSeconds, label }: Engagement) => (
									<option
										key={label}
										value={durationInSeconds}
									>
										{label}
									</option>
								)
							)}
						</select>
						{formErrors.engagement && (
							<div className={`form_error`}>
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
							<div className={`form_error`}>
								{formErrors.yearsOfExperience}
							</div>
						)}
						<br />
						<br />
						<label htmlFor="contact">
							How will your mentee contact you ? (Example :
							'Discord' + 'username')
						</label>
						<input
							type="text"
							id="contact"
							name="contact"
							value={formValues.contact}
							onChange={handleInputChange}
						/>
						{formErrors.contact && (
							<div className={`form_error`}>
								{formErrors.contact}
							</div>
						)}
						<label htmlFor="selfIntroduction">
							Present yourself and tell us why you want to be a
							mentor ? (share articles, twitter or github if
							possible)
						</label>
						<textarea
							id="selfIntroduction"
							name="selfIntroduction"
							value={formValues.selfIntroduction}
							onChange={handleTextareaChange}
						/>
						{formErrors.selfIntroduction && (
							<div className={`form_error`}>
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
				</div>
			)}
			{isWaitingForTransaction && !!transactionHash && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>
							Your application is being processed. Please wait...
						</h4>
						<p>
							You can check the status of your transaction here:{" "}
						</p>
						<a
							href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
							target="_blank"
							rel="noreferrer"
						>
							{getShortenedAddress(transactionHash)}
						</a>
					</div>
				</WaitingModal>
			)}
			<TriangleBackground />
		</>
	)
}
