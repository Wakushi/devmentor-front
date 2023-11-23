import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/services/UserContext"
import { Mentee, MenteeContext } from "@/services/blockchain/MenteeContext"
import Button from "@/components/ui/button/button"
import { useRouter } from "next/router"
import classes from "./session-form.module.scss"
import { isAddressZero } from "@/services/utils"
import MenteeSignupAndRequest from "../signup/mentee-signup"
import Loader from "@/components/ui/loader/loader"
import TriangleBackground from "@/components/ui/backgrounds/triangle/triangle-bg"

export default function SessionFormPage() {
	const [isLoaded, setIsLoaded] = useState(false)
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo } = useContext(MenteeContext)
	const router = useRouter()

	useEffect(() => {
		if (!menteeInfo) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				setIsLoaded(true)
			})
		}
	}, [walletAddress])

	if (!isLoaded || !menteeInfo) {
		return (
			<div className="loading-page">
				<Loader />
			</div>
		)
	}

	if (!menteeInfo?.registered) {
		return (
			<div className={`${classes.session_form_page} page fade-in-bottom`}>
				<h1>Open a session</h1>
				<div className="flex flex-col items-center gap-5">
					<h2>You need to register as a mentee first</h2>
					<Button
						onClick={() => {
							router.push("/signup/mentee-signup")
						}}
						filled={true}
					>
						Register as mentee
					</Button>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className={`${classes.session_form_page} page fade-in-bottom`}>
				<h1>Open a session</h1>
				{menteeInfo?.hasRequest ||
				(menteeInfo && !isAddressZero(menteeInfo?.mentor)) ? (
					<div className="flex flex-col items-center gap-5">
						<h2>
							You already have an opened{" "}
							{menteeInfo?.hasRequest ? "request" : "session"}.
						</h2>
						<Button
							onClick={() => {
								router.push("/mentee/profile")
							}}
							filled={true}
						>
							Check{" "}
							{menteeInfo?.hasRequest ? "request" : "session"}
						</Button>
					</div>
				) : (
					<MenteeSignupAndRequest registered={true} />
				)}
			</div>
			<TriangleBackground />
		</>
	)
}
