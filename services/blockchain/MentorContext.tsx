import { createContext, ReactNode, useState } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import { getEngagement, replacer } from "../utils"

interface MentorContextProviderProps {
	children: ReactNode
}

interface MentorContextProps {
	mentorInfo: Mentor | null
	mentorAverageRating: number
	getMentorInfo: (mentorAddress: string) => Promise<Mentor | null>
	getMentorAverageRating: (mentorAddress: string) => void
	isAccountMentor: (mentorAddress: string) => Promise<boolean>
	registerAsMentor: (mentorRegistration: MentorRegistration) => void
	approveMentor: (mentorAddress: string) => void
	validateSessionAsMentor: (menteeAddress: string) => void
}

export interface Mentor {
	teachingSubjects: string[]
	mentee: string
	yearsOfExperience: number
	language: number
	totalRating: number
	engagement: Engagement | undefined
	sessionCount: number
	registered: boolean
	validated: boolean
}

export interface MentorRegistration {
	teachingSubjects: string[]
	engagement: number
	language: number
	yearsOfExperience: number
}

const MentorContext = createContext<MentorContextProps>({
	mentorInfo: null,
	mentorAverageRating: 0,
	getMentorInfo: () => Promise.resolve(null),
	getMentorAverageRating: () => {},
	isAccountMentor: () => Promise.resolve(false),
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

	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [mentorAverageRating, setMentorAverageRating] = useState(0)

	///////////////
	// Read
	///////////////

	async function getMentorInfo(
		mentorAddress: string
	): Promise<Mentor | null> {
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
				return {
					teachingSubjects: JSON.parse(
						JSON.stringify(mentorInfoArray[0], replacer)
					),
					mentee: mentorInfoArray[1],
					yearsOfExperience: parseInt(mentorInfoArray[2]),
					language: parseInt(mentorInfoArray[3]),
					totalRating: parseInt(mentorInfoArray[4]),
					engagement: getEngagement(parseInt(mentorInfoArray[5])),
					sessionCount: parseInt(mentorInfoArray[6]),
					registered: mentorInfoArray[7],
					validated: mentorInfoArray[8]
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return null
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
				setMentorAverageRating(parseInt(mentorAverageRating))
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function isAccountMentor(mentorAddress: string): Promise<boolean> {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				return await contract.isAccountMentor(mentorAddress)
			} catch (error) {
				console.log(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return false
	}

	///////////////
	// Write
	///////////////

	async function registerAsMentor(mentorRegistration: MentorRegistration) {
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
					mentorRegistration
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
		isAccountMentor,
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
