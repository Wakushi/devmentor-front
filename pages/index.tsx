import Button from "@/components/ui/button/button"
import { UserContext } from "@/services/UserContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MentorContext } from "@/services/blockchain/MentorContext"

export default function Landing() {
	const { walletAddress, connectWallet } = useContext(UserContext)
	const { approveMentor } = useContext(MentorContext)
	const [mentorToValidate, setMentorToValidate] = useState("")
	const router = useRouter()

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setMentorToValidate(event.target.value)
	}

	function goToMentorSignupPage() {
		if (walletAddress) {
			router.push("/mentor/signup")
		} else {
			connectWallet()
		}
	}

	function goToProfile() {
		if (walletAddress) {
			router.push("/mentor/profile")
		} else {
			connectWallet()
		}
	}

	function onApproveMentor() {
		console.log("mentorToValidate: ", mentorToValidate)
		approveMentor(mentorToValidate)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Button onClick={() => {}} filled={true}>
					Register as mentee
				</Button>
				<Button onClick={goToMentorSignupPage} filled={true}>
					Register as mentor
				</Button>
				<Button onClick={goToProfile} filled={true}>
					Profile
				</Button>
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
