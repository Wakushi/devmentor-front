import {
	getShortenedAddress,
	getTeachingSubjectLabel,
	isAddressZero
} from "@/services/utils"
import classes from "./mentor-profile-card.module.scss"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import { useContext, useState } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import ConfirmationModal from "../confirmation-modal/confirmation-modal"
import Button from "../ui/button/button"
import { Engagement, engagements } from "@/services/constants"
import Copy from "../ui/copy/copy"

interface MentorProfileCardProps {
	mentorInfo: Mentor
	mentorTokens: number
}

export default function MentorProfileCard({
	mentorInfo,
	mentorTokens
}: MentorProfileCardProps) {
	const { getMentorAverageRating, updateContact, changeMentorEngagement } =
		useContext(MentorContext)
	const { getLanguageLabel } = useContext(BlockchainContext)

	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false)
	const [confirmationMode, setConfirmationMode] = useState<string>("contact")

	const [formValues, setFormValues] = useState({
		contact: "",
		engagement: mentorInfo.engagement?.durationInSeconds || 0
	})

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target
		setFormValues((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function onSubmitContactForm() {
		if (confirmationMode === "contact") {
			updateContact(formValues.contact)
		} else {
			changeMentorEngagement(formValues.engagement)
		}
		setIsConfirmationModalOpen(false)
	}

	function onProfileUpdate(updateMode: "contact" | "engagement") {
		setConfirmationMode(updateMode)
		setIsConfirmationModalOpen(true)
	}

	return (
		<>
			<div className={classes.profileDetails}>
				<h2>Profile</h2>
				<div className={classes.profileSection}>
					<span className="flex items-center gap-2">
						<h3>Contact : {mentorInfo.contact}</h3>
						<Copy contentToCopy={mentorInfo.contact} />
					</span>
					<Button filled onClick={() => onProfileUpdate("contact")}>
						Update contact
					</Button>
				</div>
				<div className={classes.profileSection}>
					<h3>Your subjects</h3>
					{mentorInfo.teachingSubjects?.map((subject) => (
						<div key={subject}>
							{getTeachingSubjectLabel(+subject)}
						</div>
					))}
				</div>
				<div className={classes.profileSection}>
					<h3> {mentorTokens} MTR (Mentor tokens) </h3>
				</div>
				<div className={classes.profileSection}>
					<h3>Engagement : {mentorInfo.engagement?.label}</h3>
					<Button
						filled
						onClick={() => onProfileUpdate("engagement")}
					>
						Update engagement
					</Button>
				</div>

				<div className={classes.profileSection}>
					<h3>
						Rating : {getMentorAverageRating(mentorInfo).toFixed(2)}{" "}
						<i className="fa-solid fa-star brand-color"></i> (
						{mentorInfo.sessionCount} session
						{mentorInfo.sessionCount > 1 ? "s" : ""})
					</h3>
				</div>
				<div className={classes.profileSection}>
					<h3>
						Preferred Language :{" "}
						{getLanguageLabel(mentorInfo?.language || 0)}
					</h3>
				</div>
				<div className={`${classes.profileSection} `}>
					<div className="flex items-center gap-2">
						<h3>
							Current mentee :{" "}
							{isAddressZero(mentorInfo.mentee)
								? "You don't have a mentee."
								: getShortenedAddress(mentorInfo.mentee)}
						</h3>
						{!isAddressZero(mentorInfo.mentee) && (
							<Copy contentToCopy={mentorInfo.mentee} />
						)}
					</div>
				</div>
			</div>
			{isConfirmationModalOpen && (
				<ConfirmationModal
					setIsConfirmationModalOpen={setIsConfirmationModalOpen}
				>
					<h2>
						{confirmationMode === "contact"
							? "Update your contact information"
							: "Update your engagement"}
					</h2>
					<form className="basic-form flex flex-col gap-4">
						{confirmationMode === "contact" ? (
							<>
								<div className="dark-input">
									<input
										type="text"
										name="contact"
										placeholder="Ex. Discord username"
										onChange={handleChange}
									/>
								</div>
								<Button
									onClick={(event) => {
										event.preventDefault()
										onSubmitContactForm()
									}}
								>
									Update
								</Button>
							</>
						) : (
							<>
								<select
									id="engagement"
									name="engagement"
									value={formValues.engagement}
									onChange={handleSelectChange}
								>
									{engagements.map(
										({
											durationInSeconds,
											label
										}: Engagement) => (
											<option
												key={label}
												value={durationInSeconds}
											>
												{label}
											</option>
										)
									)}
								</select>
								<Button
									onClick={(event) => {
										event.preventDefault()
										onSubmitContactForm()
									}}
								>
									Update
								</Button>
							</>
						)}
					</form>
				</ConfirmationModal>
			)}
		</>
	)
}
