import { useContext, useEffect, useState } from "react"
import { engagements } from "../../services/constants"
import classes from "./mentee-signup.module.scss"
import {
	Mentee,
	MenteeContext,
	MenteeRegistrationAndRequest
} from "@/services/blockchain/MenteeContext"
import { ethers } from "ethers"
import { Mentor } from "@/services/blockchain/MentorContext"
import MentorList from "@/components/mentor-list/mentor-list"
import MenteeForm, { FormValues } from "@/components/mentee-form/mentee-from"
import Loader from "@/components/ui/loader/loader"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { UserContext } from "@/services/UserContext"
import { useRouter } from "next/router"
import Button from "@/components/ui/button/button"

interface MenteeSignupAndRequestProps {
	registered?: boolean
}

export default function MenteeSignupAndRequest({
	registered
}: MenteeSignupAndRequestProps) {
	/////////////
	// CONTEXT //
	/////////////

	const {
		getMatchingMentors,
		registerAsMenteeAndMakeRequestForSession,
		openRequestForSession
	} = useContext(MenteeContext)
	const { isWaitingForTransaction } = useContext(BlockchainContext)
	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo } = useContext(MenteeContext)

	/////////////
	//  STATE  //
	/////////////
	const [submittedForm, setSubmittedForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [matchingMentors, setMatchingMentors] = useState<Mentor[]>([])
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [formValues, setFormValues] = useState<FormValues>({
		language: 0,
		teachingSubject: 0,
		engagement: engagements[0].durationInSeconds,
		level: 0
	})

	const router = useRouter()

	useEffect(() => {
		if (!menteeInfo) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
			})
		}
	}, [walletAddress])

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)
		const { language, teachingSubject, engagement } = formValues
		getMatchingMentors(teachingSubject, engagement, language).then(
			(mentors: Mentor[]) => {
				if (!mentors.length) {
					matchWithRandomMentor(mentors, false)
					setSubmittedForm(true)
					return
				}
				if (mentors.length === 1) {
					setMatchingMentors(mentors)
					matchWithRandomMentor(mentors, true)
					setSubmittedForm(true)
					return
				}
				setMatchingMentors(mentors)
				setSubmittedForm(true)
			}
		)
	}

	function matchWithRandomMentor(
		mentors: Mentor[],
		expectedMatching: boolean
	) {
		const { language, teachingSubject, engagement, level } = formValues
		const matchingMentorsAddresses: string[] = mentors.map(
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
		if (!registered) {
			registerAsMenteeAndMakeRequestForSession(
				menteeRegistrationAndRequest,
				"0",
				expectedMatching
			)
		} else {
			openRequestForSession(
				menteeRegistrationAndRequest,
				"0",
				expectedMatching
			)
		}
	}

	if (menteeInfo?.registered && !registered) {
		return (
			<div className="page flex flex-col items-center gap-5">
				<h2>You are already registered as a mentee.</h2>
				<Button
					onClick={() => {
						router.push("/mentee/session-form")
					}}
					filled={true}
				>
					Open a session
				</Button>
			</div>
		)
	}

	return (
		<>
			{submittedForm ? (
				<div className=" flex flex-col justify-center items-center gap-4">
					{matchingMentors.length > 1 ? (
						<>
							<MentorList mentors={matchingMentors} />
							<div className="flex justify-center items-center gap-4">
								<button
									onClick={() =>
										matchWithRandomMentor(
											matchingMentors,
											true
										)
									}
									className={`${classes.big_button}`}
								>
									Match with a random mentor
								</button>
								<button className={`${classes.big_button}`}>
									Lock asset and choose a mentor
								</button>
							</div>
						</>
					) : (
						<div className="flex flex-col justify-center items-center gap-4">
							<h4>
								{matchingMentors.length
									? "Mentor found, opening a session..."
									: "No mentor found, we'll open a request for you to be automatically matched !"}
							</h4>
							<Loader />
						</div>
					)}
				</div>
			) : (
				<div>
					<MenteeForm
						handleSubmit={handleSubmit}
						formValues={formValues}
						setFormValues={setFormValues}
						isLoading={isLoading}
					/>
				</div>
			)}
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>Matching you with a mentor. Please wait...</h4>
					</div>
				</WaitingModal>
			)}
		</>
	)
}
