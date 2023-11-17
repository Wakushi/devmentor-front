import { createContext, ReactNode, useState } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI
} from "../constants"
import { convertProxyResult } from "../utils"

interface MenteeContextProviderProps {
	children: ReactNode
}

interface MenteeContextProps {
	matchingMentors: string[]
	getMatchingMentors: (
		subject: number,
		engagement: number,
		language: number
	) => Promise<void>
	getMenteeInfo: (menteeAddress: string) => Promise<Mentee | null>
	getMenteeRequest: (menteeAddress: string) => Promise<any>
	isAccountMentee: (menteeAddress: string) => Promise<boolean>
	registerAsMenteeAndMakeRequestForSession: (
		menteeRegistrationAndRequest: MenteeRegistrationAndRequest,
		valueLocked: string
	) => Promise<void>
	openRequestForSession: (
		subject: number,
		level: number,
		engagement: number,
		matchingMentors: string[],
		chosenMentor: string,
		valueLocked: string
	) => Promise<void>
	validateSessionAsMentee: (
		mentorAddress: string,
		rating: number
	) => Promise<void>
}

export interface Mentee {
	language: number
	sessionCount: number
	mentor: string
	registered: boolean
	hasRequest: boolean
}

export interface MenteeRegistrationAndRequest {
	level: number
	subject: number
	language: number
	engagement: number
	matchingMentors: string[]
	chosenMentor: string
}

const MenteeContext = createContext<MenteeContextProps>({
	matchingMentors: [],
	getMatchingMentors: async () => {},
	getMenteeInfo: async () => Promise.resolve(null),
	getMenteeRequest: async () => ({}),
	isAccountMentee: async () => Promise.resolve(false),
	registerAsMenteeAndMakeRequestForSession: async () => {},
	openRequestForSession: async () => {},
	validateSessionAsMentee: async () => {}
})

export default function MenteeContextProvider({
	children
}: MenteeContextProviderProps) {
	///////////////
	// State
	///////////////

	const [matchingMentors, setMatchingMentors] = useState<string[]>([])

	///////////////
	// Read
	///////////////

	async function getMenteeInfo(
		menteeAddress: string
	): Promise<Mentee | null> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const menteeInfoArray = await contract.getMenteeInfo(menteeAddress)
			return {
				language: parseInt(menteeInfoArray[0]),
				sessionCount: parseInt(menteeInfoArray[1]),
				mentor: menteeInfoArray[2],
				registered: menteeInfoArray[3],
				hasRequest: menteeInfoArray[4]
			}
		} catch (error) {
			console.error("Error in getMenteeInfo:", error)
		}
		return null
	}

	async function getMenteeRequest(menteeAddress: string) {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const menteeRequest = await contract.getMenteeRequest(menteeAddress)
			return menteeRequest
		} catch (error) {
			console.error("Error in getMenteeRequest:", error)
		}
	}

	async function getMatchingMentors(
		subject: number,
		engagement: number,
		language: number
	) {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const matchingMentors = await contract.getMatchingMentors(
				subject,
				engagement,
				language
			)
			setMatchingMentors(convertProxyResult(matchingMentors))
		} catch (error) {
			console.error("Error in getMatchingMentors:", error)
		}
	}

	async function isAccountMentee(menteeAddress: string): Promise<boolean> {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				provider
			)
			try {
				return await contract.isAccountMentee(menteeAddress)
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

	async function registerAsMenteeAndMakeRequestForSession(
		menteeRegistrationAndRequest: MenteeRegistrationAndRequest,
		valueLocked: string
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
				const transaction =
					await contract.registerAsMenteeAndMakeRequestForSession(
						menteeRegistrationAndRequest,
						{ value: ethers.parseEther(valueLocked) }
					)
				await transaction.wait()
				console.log("Mentee registered and request made!")
			} catch (error) {
				console.error(
					"Error in registerAsMenteeAndMakeRequestForSession:",
					error
				)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function openRequestForSession(
		subject: number,
		level: number,
		engagement: number,
		matchingMentors: string[],
		chosenMentor: string,
		valueLocked: string
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
				const transaction = await contract.openRequestForSession(
					subject,
					level,
					engagement,
					matchingMentors,
					chosenMentor,
					{ value: ethers.parseEther(valueLocked) }
				)
				await transaction.wait()
				console.log("Session request opened!")
			} catch (error) {
				console.error("Error in openRequestForSession:", error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function validateSessionAsMentee(
		mentorAddress: string,
		rating: number
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
				const transaction = await contract.validateSessionAsMentee(
					mentorAddress,
					rating
				)
				await transaction.wait()
				console.log("Session validated and rated by mentee!")
			} catch (error) {
				console.error("Error in validateSessionAsMentee:", error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	const context: MenteeContextProps = {
		matchingMentors,
		getMatchingMentors,
		getMenteeInfo,
		getMenteeRequest,
		isAccountMentee,
		registerAsMenteeAndMakeRequestForSession,
		openRequestForSession,
		validateSessionAsMentee
	}

	return (
		<MenteeContext.Provider value={context}>
			{children}
		</MenteeContext.Provider>
	)
}

export { MenteeContext }
