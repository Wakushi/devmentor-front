import { ReactNode, createContext, useContext } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import { getEngagement } from "../utils"
import { BlockchainContext } from "./BlockchainContext"

interface SessionContextProviderProps {
	children: ReactNode
}

export interface Session {
	mentor: string
	mentee: string
	startTime: number
	engagement: Engagement | undefined
	valueLocked: number
	mentorConfirmed: boolean
	menteeConfirmed: boolean
}

interface SessionContextProps {
	getMenteeSession: (menteeAddress: string) => Promise<Session | null>
	testUpdateSessionEngagement: (
		menteeAddress: string,
		mentorAddress: string,
		newEngagementDuration: number
	) => Promise<void>
	cancelSession: (
		menteeAddress: string,
		mentorAddress: string,
		as: "mentee" | "mentor"
	) => Promise<void>
}

const SessionContext = createContext<SessionContextProps>({
	getMenteeSession: async () => Promise.resolve(null),
	testUpdateSessionEngagement: async () => Promise.resolve(),
	cancelSession: async () => Promise.resolve()
})

export default function SessionContextProvider({
	children
}: SessionContextProviderProps) {
	const { errorHandler } = useContext(BlockchainContext)
	///////////////
	// State
	///////////////

	///////////////
	// Read
	///////////////

	async function getMenteeSession(
		menteeAddress: string
	): Promise<Session | null> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const menteeSessionArray = await contract.getMenteeSession(
				menteeAddress
			)
			const menteeSession: Session = {
				mentor: menteeSessionArray[0],
				mentee: menteeSessionArray[1],
				startTime: parseInt(menteeSessionArray[2]),
				engagement: getEngagement(parseInt(menteeSessionArray[3])),
				valueLocked: parseInt(menteeSessionArray[4]),
				mentorConfirmed: menteeSessionArray[5],
				menteeConfirmed: menteeSessionArray[6]
			}
			return menteeSession
		} catch (error: unknown) {
			errorHandler(error)
		}
		return null
	}

	///////////////
	// Write
	///////////////

	async function testUpdateSessionEngagement(
		menteeAddress: string,
		mentorAddress: string,
		newEngagementDuration: number
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
				const transaction = await contract.testUpdateSessionEngagement(
					menteeAddress,
					mentorAddress,
					newEngagementDuration
				)
				await transaction.wait()
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	async function cancelSession(
		menteeAddress: string,
		mentorAddress: string,
		as: "mentee" | "mentor"
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
				if (as === "mentee") {
					const menteeTransaction =
						await contract.cancelSessionAsMentee(mentorAddress)
					await menteeTransaction.wait()
				} else {
					const mentorTransaction =
						await contract.cancelSessionAsMentor(menteeAddress)
					await mentorTransaction.wait()
				}
			} catch (error: unknown) {
				errorHandler(error)
			}
		} else {
			alert("Please install MetaMask")
		}
	}

	const context: SessionContextProps = {
		getMenteeSession,
		testUpdateSessionEngagement,
		cancelSession
	}

	return (
		<SessionContext.Provider value={context}>
			{children}
		</SessionContext.Provider>
	)
}

export { SessionContext }
