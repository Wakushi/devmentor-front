import { createContext, ReactNode, useContext } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import {
	convertProxyResult,
	getEngagement,
	isAddressZero,
	replacer
} from "../utils"
import { BlockchainContext } from "./BlockchainContext"

interface MentorContextProviderProps {
	children: ReactNode
}

interface MentorContextProps {
	getMentorInfo: (mentorAddress: string) => Promise<Mentor | null>
	getMentorContact: (mentorAddress: string) => Promise<string>
	getMentorAverageRating: (mentor: Mentor) => number
	isAccountMentor: (mentorAddress: string) => Promise<boolean>
	isMentorValidated: (mentorAddress: string) => Promise<boolean>
	registerAsMentor: (mentorRegistration: MentorRegistration) => void
	approveMentor: (mentorAddress: string) => void
	validateSessionAsMentor: (menteeAddress: string) => void
	getAllMentors: () => Promise<Mentor[]>
}

export interface Mentor {
	address: string
	teachingSubjects: string[]
	mentee: string
	contact: string
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
	contact: string
}

const MentorContext = createContext<MentorContextProps>({
	getMentorInfo: () => Promise.resolve(null),
	getMentorContact: () => Promise.resolve(""),
	getMentorAverageRating: () => 0,
	isAccountMentor: () => Promise.resolve(false),
	isMentorValidated: () => Promise.resolve(false),
	registerAsMentor: () => {},
	approveMentor: () => {},
	validateSessionAsMentor: () => {},
	getAllMentors: () => Promise.resolve([])
})
export default function MentorContextProvider(
	props: MentorContextProviderProps
) {
	const { waitForTransaction, errorHandler } = useContext(BlockchainContext)

	///////////////
	// State
	///////////////

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
				if (!mentorAddress || isAddressZero(mentorAddress)) return null
				const mentorInfoArray = await contract.getMentorInfo(
					mentorAddress
				)
				return {
					address: mentorAddress,
					teachingSubjects: JSON.parse(
						JSON.stringify(mentorInfoArray[0], replacer)
					),
					mentee: mentorInfoArray[1],
					contact: ethers.toUtf8String(mentorInfoArray[2]),
					yearsOfExperience: parseInt(mentorInfoArray[3]),
					language: parseInt(mentorInfoArray[4]),
					totalRating: parseInt(mentorInfoArray[5]),
					engagement: getEngagement(parseInt(mentorInfoArray[6])),
					sessionCount: parseInt(mentorInfoArray[7]),
					registered: mentorInfoArray[8],
					validated: mentorInfoArray[9]
				}
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return null
	}

	async function getMentorContact(mentorAddress: string): Promise<string> {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				return await contract.getMentorContact(mentorAddress)
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return ""
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
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return false
	}

	async function isMentorValidated(mentorAddress: string): Promise<boolean> {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				return await contract.isMentorValidated(mentorAddress)
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return false
	}

	async function getAllMentors(): Promise<Mentor[]> {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				const allMentorsArray = await contract.getMentors()
				const allMentors = convertProxyResult(allMentorsArray)
				const mentorPromises = allMentors.map(
					async (mentorAddress: string) => {
						return await getMentorInfo(mentorAddress)
					}
				)
				return Promise.all(mentorPromises).then((resolvedMentors) => {
					return resolvedMentors
				})
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
		return []
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
				if (registerMentorTx.hash && waitForTransaction) {
					waitForTransaction(registerMentorTx.hash)
				}
				await registerMentorTx.wait()
			} catch (error: unknown) {
				errorHandler(error)
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
			} catch (error: unknown) {
				errorHandler(error)
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
				const transaction = await contract.validateSessionAsMentor(
					menteeAddress
				)
				if (waitForTransaction) {
					await waitForTransaction(transaction.hash)
				}
				await transaction.wait()
				console.log("Session validated !")
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	///////////////
	// Utils
	///////////////

	function getMentorAverageRating(mentor: Mentor): number {
		const averageRate = +mentor.sessionCount
			? +mentor.totalRating / +mentor.sessionCount
			: 0
		if (averageRate > 5) return averageRate / 2
		return averageRate
	}

	const context: MentorContextProps = {
		getMentorInfo,
		getMentorContact,
		getMentorAverageRating,
		isAccountMentor,
		isMentorValidated,
		registerAsMentor,
		approveMentor,
		validateSessionAsMentor,
		getAllMentors
	}

	return (
		<MentorContext.Provider value={context}>
			{props.children}
		</MentorContext.Provider>
	)
}

export { MentorContext }
