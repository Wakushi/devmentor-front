import { useContext, useEffect, useRef, useState } from "react"
import { engagements } from "../../services/constants"
import classes from "./mentee-signup.module.scss"
import {
	Mentee,
	MenteeContext,
	MenteeRegistrationAndRequest
} from "@/services/blockchain/MenteeContext"
import { ethers } from "ethers"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import MentorList from "@/components/mentor-list/mentor-list"
import MenteeForm, { FormValues } from "@/components/mentee-form/mentee-form"
import Loader from "@/components/ui/loader/loader"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { UserContext } from "@/services/UserContext"
import { useRouter } from "next/router"
import Button from "@/components/ui/button/button"
import ConfirmationModal from "@/components/confirmation-modal/confirmation-modal"
import TriangleBackground from "@/components/ui/backgrounds/triangle/triangle-bg"
import { rankMentors } from "@/services/utils"
import Image from "next/image"
import randomIcon from "@/assets/images/picto/random.png"
import selectIcon from "@/assets/images/picto/select.png"

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
		openRequestForSession,
		getMenteeInfo
	} = useContext(MenteeContext)
	const { isWaitingForTransaction } = useContext(BlockchainContext)
	const { walletAddress } = useContext(UserContext)
	const { isAccountMentor } = useContext(MentorContext)
	/////////////
	//  STATE  //
	/////////////

	const [submittedForm, setSubmittedForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [matchingMentors, setMatchingMentors] = useState<Mentor[]>([])
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [waitingModalMessage, setWaitingModalMessage] = useState("")
	const [mentorSelectionModalOpen, setMentorSelectionModalOpen] =
		useState(false)
	const [selectedMentor, setSelectedMentor] = useState<string>("")
	const [lockedValueFormError, setLockedValueFormError] = useState<string>("")
	const [formValues, setFormValues] = useState<FormValues>({
		language: 0,
		teachingSubject: 0,
		engagement: engagements[0].durationInSeconds,
		level: 0,
		lockedAmount: 0
	})

	const router = useRouter()
	const lockedAmountFormField = useRef<HTMLDivElement | null>(null)

	//////////////////
	//  USE EFFECT  //
	//////////////////

	useEffect(() => {
		if (!menteeInfo) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
			})
		}
		if (walletAddress) {
			isAccountMentor(walletAddress).then((isMentor) => {
				if (isMentor) {
					router.push("/mentor/profile")
				}
			})
		}
	}, [walletAddress])

	useEffect(() => {
		setSubmittedForm(false)
		setIsLoading(false)
	}, [isWaitingForTransaction])

	useEffect(() => {
		setLockedValueFormError("")
	}, [selectedMentor, formValues.lockedAmount, mentorSelectionModalOpen])

	useEffect(() => {
		setSelectedMentor("")
	}, [mentorSelectionModalOpen])

	//////////////
	// METHODS  //
	//////////////

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)
		const { language, teachingSubject, engagement } = formValues
		getMatchingMentors(teachingSubject, engagement, language).then(
			(mentors: Mentor[]) => {
				if (!mentors.length) {
					setWaitingModalMessage("Opening request. Please wait...")
					matchWithRandomMentor(mentors, "", false)
					setSubmittedForm(true)
					return
				}
				setWaitingModalMessage(
					"Matching you with a mentor. Please wait..."
				)
				if (mentors.length === 1) {
					setMatchingMentors(rankMentors(mentors))
					matchWithRandomMentor(mentors, "", true)
					setSubmittedForm(true)
					return
				}
				setMatchingMentors(rankMentors(mentors))
				setSubmittedForm(true)
			}
		)
	}

	function isMentorSelectionValid(): boolean {
		if (!selectedMentor || !formValues.lockedAmount) {
			setLockedValueFormError(
				"You have to select a mentor and lock some value."
			)
			return false
		}

		if (formValues.lockedAmount < 5) {
			setLockedValueFormError("You have to lock at least 5$ USD.")
			return false
		}

		return true
	}

	function matchWithRandomMentor(
		mentors: Mentor[],
		chosenMentor: string,
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
			chosenMentor: chosenMentor || ethers.ZeroAddress
		}

		if (!registered) {
			registerAsMenteeAndMakeRequestForSession(
				menteeRegistrationAndRequest,
				formValues.lockedAmount.toString(),
				expectedMatching
			)
		} else {
			openRequestForSession(
				menteeRegistrationAndRequest,
				formValues.lockedAmount.toString(),
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
				<div
					className={`${
						registered ? "fade-in-bottom" : "page fade-in-bottom"
					}  flex flex-col justify-center items-center gap-4 `}
				>
					{matchingMentors.length > 1 ? (
						<>
							<MentorList
								mentors={matchingMentors}
								selectMode={false}
								selectedMentor={selectedMentor}
								setSelectedMentor={setSelectedMentor}
							/>
							<div className="flex justify-center items-center gap-4">
								<button
									onClick={() =>
										matchWithRandomMentor(
											matchingMentors,
											"",
											true
										)
									}
									className={`${classes.big_button}`}
								>
									Match with a random mentor
									<div className={classes.iconContainer}>
										<Image
											src={randomIcon}
											alt="Random icon"
										></Image>
									</div>
								</button>
								<button
									className={`${classes.big_button}`}
									onClick={() =>
										setMentorSelectionModalOpen(true)
									}
								>
									Lock asset and choose a mentor
									<div className={classes.iconContainer}>
										<Image
											src={selectIcon}
											alt="Select icon"
										></Image>
									</div>
								</button>
							</div>
						</>
					) : (
						<div
							className={`${
								registered ? "" : "page"
							} flex flex-col justify-center items-center gap-4`}
						>
							<h4>
								{matchingMentors.length
									? "Mentor found, opening a session..."
									: "No mentor found, we'll open a request for you to be automatically matched !"}
							</h4>
							<Loader />
						</div>
					)}

					{mentorSelectionModalOpen && (
						<ConfirmationModal
							setIsConfirmationModalOpen={
								setMentorSelectionModalOpen
							}
						>
							<MentorList
								mentors={matchingMentors}
								selectMode={true}
								selectedMentor={selectedMentor}
								setSelectedMentor={setSelectedMentor}
							/>
							<div className="flex flex-col gap-2">
								<h4>Lock value to choose a mentor</h4>
								<p>(Amount in USD will be converted to ETH)</p>
								<p>
									(You can also get a random mentor without
									locking value)
								</p>
								<div
									ref={lockedAmountFormField}
									className="dark-input short"
								>
									<input
										type="number"
										name="lockedAmount"
										placeholder="5"
										min={5}
										onChange={handleInputChange}
									/>
									<span className="dollar-symbol">$</span>
								</div>
								<p className="form_error">
									{lockedValueFormError}
								</p>
								<div className="flex justify-center gap-2">
									<Button
										onClick={() => {
											if (isMentorSelectionValid()) {
												matchWithRandomMentor(
													matchingMentors,
													selectedMentor,
													true
												)
											}
										}}
										filled={true}
									>
										Connect with mentor
									</Button>
								</div>
							</div>
						</ConfirmationModal>
					)}
				</div>
			) : (
				<div
					className={
						registered ? "fade-in-bottom" : "page fade-in-bottom"
					}
				>
					<MenteeForm
						handleSubmit={handleSubmit}
						formValues={formValues}
						setFormValues={setFormValues}
						isLoading={isLoading}
						registered={registered}
					/>
				</div>
			)}
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>{waitingModalMessage}</h4>
					</div>
				</WaitingModal>
			)}
			{!registered && <TriangleBackground />}
		</>
	)
}
