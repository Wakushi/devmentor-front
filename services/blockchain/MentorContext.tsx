import { createContext, ReactNode, useState } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import { getEngagement, replacer } from "../utils"

interface Mentor {
	teachingSubjects: string[]
	mentee: string
	yearsOfExperience: number
	language: number
	totalRating: number | string
	engagement: Engagement | undefined
	sessionCount: number | string
	registered: boolean
	validated: boolean
}

interface MentorContextProviderProps {
	children: ReactNode
}

interface MentorContextProps {
	mentorInfo: Mentor
	mentorAverageRating: number
	getMentorInfo: (mentorAddress: string) => void
	getMentorAverageRating: (mentorAddress: string) => void
	registerAsMentor: (
		teachingSubjects: string[],
		engagement: number,
		language: number,
		yearsOfExperience: number
	) => void
	approveMentor: (mentorAddress: string) => void
	validateSessionAsMentor: (menteeAddress: string) => void
}

const MentorContext = createContext<MentorContextProps>({
	mentorInfo: {} as Mentor,
	mentorAverageRating: 0,
	getMentorInfo: () => {},
	getMentorAverageRating: () => {},
	registerAsMentor: () => {},
	approveMentor: () => {},
	validateSessionAsMentor: () => {}
})

export default function MentorContextProvider(
	props: MentorContextProviderProps
) {
	///////////////
	// State
	///////////////

	const [mentorInfo, setMentorInfo] = useState<Mentor>({} as Mentor)
	const [mentorAverageRating, setMentorAverageRating] = useState(0)

	///////////////
	// Read
	///////////////

	async function getMentorInfo(mentorAddress: string) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				const mentorInfoArray = await contract.getMentorInfo(
					mentorAddress
				)
				const mentorInfo = {
					teachingSubjects: JSON.parse(
						JSON.stringify(mentorInfoArray[0], replacer)
					),
					mentee: mentorInfoArray[1],
					yearsOfExperience: parseInt(mentorInfoArray[2]),
					language: parseInt(mentorInfoArray[3]),
					totalRating: mentorInfoArray[4].toString(),
					engagement: getEngagement(mentorInfoArray[5].toString()),
					sessionCount: mentorInfoArray[6].toString(),
					registered: mentorInfoArray[7],
					validated: mentorInfoArray[8]
				}
				setMentorInfo(mentorInfo)
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function getMentorAverageRating(mentorAddress: string) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				const mentorAverageRating =
					await contract.getMentorAverageRating(mentorAddress)
				setMentorAverageRating(mentorAverageRating)
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	///////////////
	// Write
	///////////////

	async function registerAsMentor(
		teachingSubjects: string[],
		engagement: number,
		language: number,
		yearsOfExperience: number
	) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			try {
				const registerMentorTx = await contract.registerAsMentor(
					teachingSubjects,
					engagement,
					language,
					yearsOfExperience
				)
				await registerMentorTx.wait()
				console.log("Mentor registered!")
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function approveMentor(mentorAddress: string) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			try {
				const approveMentorTx = await contract.approveMentor(
					mentorAddress
				)
				await approveMentorTx.wait()
				console.log("Mentor approved!")
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function validateSessionAsMentor(menteeAddress: string) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			try {
				const validateSessionAsMentorTx =
					await contract.validateSessionAsMentor(menteeAddress)
				await validateSessionAsMentorTx.wait()
				console.log("Session validated !")
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	const context: MentorContextProps = {
		mentorInfo,
		mentorAverageRating,
		getMentorInfo,
		getMentorAverageRating,
		registerAsMentor,
		approveMentor,
		validateSessionAsMentor
	}

	return (
		<MentorContext.Provider value={context}>
			{props.children}
		</MentorContext.Provider>
	)
}

export { MentorContext }
