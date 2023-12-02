import { createContext, ReactNode, useContext } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import { convertProxyResult, getEngagement, isAddressZero } from "../utils"
import { Mentor, MentorContext } from "./MentorContext"
import { BlockchainContext } from "./BlockchainContext"

interface MenteeContextProviderProps {
	children: ReactNode
}

interface MenteeContextProps {
	getMatchingMentors: (
		subject: number,
		engagement: number,
		language: number
	) => Promise<Mentor[]>
	getMenteeInfo: (menteeAddress: string) => Promise<Mentee | null>
	getMenteeRequest: (menteeAddress: string) => Promise<MenteeRequest | null>
	isAccountMentee: (menteeAddress: string) => Promise<boolean>
	registerAsMenteeAndMakeRequestForSession: (
		menteeRegistrationAndRequest: MenteeRegistrationAndRequest,
		valueLocked: string,
		expectedMatching: boolean
	) => Promise<void>
	openRequestForSession: (
		menteeRegistrationAndRequest: MenteeRegistrationAndRequest,
		valueLocked: string,
		expectedMatching: boolean
	) => Promise<void>
	validateSessionAsMentee: (
		mentorAddress: string,
		rating: number,
		tipAmountInUSD: string
	) => Promise<void>
	cancelRequestForSession: () => Promise<void>
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

export interface MenteeRequest {
	level: number
	subject: number
	engagement: Engagement | undefined
}

const MenteeContext = createContext<MenteeContextProps>({
	getMatchingMentors: async () => Promise.resolve([]),
	getMenteeInfo: async () => Promise.resolve(null),
	getMenteeRequest: async () => Promise.resolve(null),
	isAccountMentee: async () => Promise.resolve(false),
	registerAsMenteeAndMakeRequestForSession: async () => {},
	openRequestForSession: async () => {},
	validateSessionAsMentee: async () => {},
	cancelRequestForSession: async () => {}
})

export default function MenteeContextProvider({
	children
}: MenteeContextProviderProps) {
	const { getMentorInfo } = useContext(MentorContext)
	const { waitForTransaction, getEthPriceInUsd, errorHandler } =
		useContext(BlockchainContext)

	///////////////
	// State
	///////////////

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
			if (!menteeAddress || isAddressZero(menteeAddress)) return null
			const menteeInfoArray = await contract.getMenteeInfo(menteeAddress)
			return {
				language: parseInt(menteeInfoArray[0]),
				sessionCount: parseInt(menteeInfoArray[1]),
				mentor: menteeInfoArray[2],
				registered: menteeInfoArray[3],
				hasRequest: menteeInfoArray[4]
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
		return null
	}

	async function getMenteeRequest(
		menteeAddress: string
	): Promise<MenteeRequest | null> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const menteeRequestArray = await contract.getMenteeRequest(
				menteeAddress
			)
			return {
				level: parseInt(menteeRequestArray[0]),
				subject: parseInt(menteeRequestArray[1]),
				engagement: getEngagement(parseInt(menteeRequestArray[2]))
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
		return null
	}

	async function getMatchingMentors(
		subject: number,
		engagement: number,
		language: number
	): Promise<Mentor[]> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const matchingMentorsResponse = await contract.getMatchingMentors(
				subject,
				engagement,
				language
			)
			const matchingMentorsAddresses = convertProxyResult(
				matchingMentorsResponse
			)
			let matchingMentors: Mentor[] = []
			for (const mentorAddress of matchingMentorsAddresses) {
				const mentor = await getMentorInfo(mentorAddress)
				if (mentor) matchingMentors.push(mentor)
			}
			return matchingMentors
		} catch (error: unknown) {
			errorHandler(error)
		}
		return []
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
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
		return false
	}

	///////////////
	// Write
	///////////////

	async function registerAsMenteeAndMakeRequestForSession(
		menteeRegistrationAndRequest: MenteeRegistrationAndRequest,
		valueLocked: string,
		expectedMatching: boolean
	) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			if (waitForTransaction) {
				waitForTransaction("")
			}
			try {
				let price
				let valueLockedInEth = ethers.parseUnits("0", "ether")
				if (+valueLocked > 0) {
					price = await getEthPriceInUsd()
					valueLockedInEth = ethers.parseUnits(
						(+valueLocked / price).toFixed(4),
						"ether"
					)
				}

				const transaction =
					await contract.registerAsMenteeAndOpenSession(
						menteeRegistrationAndRequest,
						{ value: valueLockedInEth }
					)
				if (expectedMatching && waitForTransaction) {
					waitForTransaction(transaction.hash)
				}
				await transaction.wait()
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	async function openRequestForSession(
		menteeRequestForSession: MenteeRegistrationAndRequest,
		valueLocked: string,
		expectedMatching: boolean
	) {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			if (waitForTransaction) {
				waitForTransaction("")
			}
			try {
				let price
				let valueLockedInEth = ethers.parseUnits("0", "ether")
				if (+valueLocked > 0) {
					price = await getEthPriceInUsd()
					valueLockedInEth = ethers.parseUnits(
						(+valueLocked / price).toFixed(4),
						"ether"
					)
				}

				const transaction = await contract.openRequestForSession(
					menteeRequestForSession,
					{ value: valueLockedInEth }
				)
				if (expectedMatching && waitForTransaction) {
					waitForTransaction(transaction.hash)
				}
				await transaction.wait()
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	async function validateSessionAsMentee(
		mentorAddress: string,
		rating: number,
		tipAmountInUSD: string
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
				let price
				let tipAmountInEth = ethers.parseUnits("0", "ether")
				if (+tipAmountInUSD > 0) {
					price = await getEthPriceInUsd()
					tipAmountInEth = ethers.parseUnits(
						(+tipAmountInUSD / price).toFixed(4),
						"ether"
					)
				}

				const transaction = await contract.validateSessionAsMentee(
					mentorAddress,
					rating,
					{ value: tipAmountInEth }
				)

				if (waitForTransaction) {
					await waitForTransaction(transaction.hash)
				}
				await transaction.wait()
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	async function cancelRequestForSession() {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(
				DEVMENTOR_CONTRACT_ADDRESS,
				DEVMENTOR_CONTRACT_ABI,
				signer
			)
			try {
				const transaction = await contract.cancelRequestForSession()
				if (transaction.hash && waitForTransaction) {
					waitForTransaction(transaction.hash)
				}
				await transaction.wait()
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	const context: MenteeContextProps = {
		getMatchingMentors,
		getMenteeInfo,
		getMenteeRequest,
		isAccountMentee,
		registerAsMenteeAndMakeRequestForSession,
		openRequestForSession,
		validateSessionAsMentee,
		cancelRequestForSession
	}

	return (
		<MenteeContext.Provider value={context}>
			{children}
		</MenteeContext.Provider>
	)
}

export { MenteeContext }
