import { useContext, useState } from "react"
import Button from "../ui/button/button"
import classes from "./testing-menu.module.scss"
import { MentorContext } from "@/services/blockchain/MentorContext"
import { SessionContext } from "@/services/blockchain/SessionContext"
import { RewardContext } from "@/services/blockchain/RewardContext"

interface TestingMenuProps {
	isDebugTabOpen: boolean
	setIsDebugTabOpen: (value: boolean) => void
}

interface FormValues {
	mentorAddress: string
	menteeAddress: string
	engagementDuration: number
	userAddressXp: string
	xpAmount: number
	mentorAddressMTR: string
	mentorTokensAmount: number
	mentorAddressApproval: string
}

export default function TestingMenu({
	isDebugTabOpen,
	setIsDebugTabOpen
}: TestingMenuProps) {
	const { adminApproveMentor } = useContext(MentorContext)
	const { testUpdateSessionEngagement } = useContext(SessionContext)
	const { testMintXp, testMintMentorToken } = useContext(RewardContext)

	const [formValues, setFormValues] = useState<FormValues>({
		mentorAddress: "",
		menteeAddress: "",
		engagementDuration: 0,
		userAddressXp: "",
		xpAmount: 0,
		mentorAddressMTR: "",
		mentorTokensAmount: 0,
		mentorAddressApproval: ""
	})

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	function onApproveMentor() {
		adminApproveMentor(formValues.mentorAddressApproval)
	}

	function onUpdateSessionEngagement() {
		const { mentorAddress, menteeAddress, engagementDuration } = formValues
		testUpdateSessionEngagement(
			menteeAddress,
			mentorAddress,
			engagementDuration
		)
	}

	function onMintXp() {
		const { userAddressXp, xpAmount } = formValues
		testMintXp(userAddressXp, xpAmount)
	}

	function onMintMentorToken() {
		const { mentorAddressMTR, mentorTokensAmount } = formValues
		testMintMentorToken(mentorAddressMTR, mentorTokensAmount)
	}

	return (
		<div
			className={`${classes.debugTab} ${
				isDebugTabOpen ? classes.tabOpen : ""
			} flex flex-col gap-4`}
		>
			<p>
				<i
					className={`fa-solid fa-triangle-exclamation ${classes.warningIcon}`}
				></i>{" "}
				This menu is exclusively designed for use by the hackathon jury
				and testers during experimentation phases. It is not intended
				for inclusion in the production environment, nor are the
				functions it invokes.
			</p>
			<i
				className={`fa-solid fa-times ${classes.closeIcon}`}
				onClick={() => setIsDebugTabOpen(false)}
			></i>
			<div className="flex gap-5 items-baseline justify-around">
				<div className="flex flex-col gap-2 items-center">
					<h5>Update session engagement</h5>
					<label className="modal-form-label" htmlFor="mentorAddress">
						Mentor address
					</label>
					<div className="dark-input">
						<input
							type="text"
							id="mentorAddress"
							name="mentorAddress"
							value={formValues.mentorAddress}
							onChange={handleInputChange}
						/>
					</div>
					<label className="modal-form-label" htmlFor="menteeAddress">
						Mentee address
					</label>
					<div className="dark-input">
						<input
							type="text"
							id="menteeAddress"
							name="menteeAddress"
							value={formValues.menteeAddress}
							onChange={handleInputChange}
						/>
					</div>
					<label
						className="modal-form-label"
						htmlFor="engagementDuration"
					>
						Engagement duration
					</label>
					<div className="dark-input">
						<input
							type="number"
							id="engagementDuration"
							name="engagementDuration"
							value={formValues.engagementDuration}
							onChange={handleInputChange}
						/>
					</div>
					<Button onClick={onUpdateSessionEngagement}>Update</Button>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h5>Mint XP to user</h5>
					<label className="modal-form-label" htmlFor="userAddressXp">
						User address
					</label>
					<div className="dark-input">
						<input
							type="text"
							id="userAddressXp"
							name="userAddressXp"
							value={formValues.userAddressXp}
							onChange={handleInputChange}
						/>
					</div>
					<label className="modal-form-label" htmlFor="xpAmount">
						XP Amount
					</label>
					<div className="dark-input">
						<input
							type="number"
							id="xpAmount"
							name="xpAmount"
							value={formValues.xpAmount}
							onChange={handleInputChange}
						/>
					</div>
					<Button onClick={onMintXp}>Mint XP</Button>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h5>Mint MentorTokens to mentor</h5>
					<label
						className="modal-form-label"
						htmlFor="mentorAddressMTR"
					>
						Mentor address
					</label>
					<div className="dark-input">
						<input
							type="text"
							id="mentorAddressMTR"
							name="mentorAddressMTR"
							value={formValues.mentorAddressMTR}
							onChange={handleInputChange}
						/>
					</div>
					<label
						className="modal-form-label"
						htmlFor="mentorTokensAmount"
					>
						Mentor Tokens Amount
					</label>
					<div className="dark-input">
						<input
							type="number"
							id="mentorTokensAmount"
							name="mentorTokensAmount"
							value={formValues.mentorTokensAmount}
							onChange={handleInputChange}
						/>
					</div>
					<Button onClick={onMintMentorToken}>
						Mint Mentor Tokens
					</Button>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h5>Approve mentor</h5>
					<label
						className="modal-form-label"
						htmlFor="mentorAddressApproval"
					>
						Mentor address
					</label>
					<div className="dark-input">
						<input
							type="text"
							id="mentorAddressApproval"
							name="mentorAddressApproval"
							value={formValues.mentorAddressApproval}
							onChange={handleInputChange}
						/>
					</div>

					<Button onClick={onApproveMentor}>Approve</Button>
				</div>
			</div>
		</div>
	)
}
