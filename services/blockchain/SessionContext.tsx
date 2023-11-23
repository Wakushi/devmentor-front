import { ReactNode, createContext } from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI,
	Engagement
} from "../constants"
import { getEngagement } from "../utils"

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
	adminCompleteSession: (
		menteeAddress: string,
		mentorAddress: string,
		valueLocked: string
	) => Promise<void>
	adminUpdateSessionEngagement: (
		menteeAddress: string,
		mentorAddress: string,
		newEngagementDuration: number
	) => Promise<void>
}

const SessionContext = createContext<SessionContextProps>({
	getMenteeSession: async () => Promise.resolve(null),
	adminCompleteSession: async () => Promise.resolve(),
	adminUpdateSessionEngagement: async () => Promise.resolve()
})

export default function SessionContextProvider({
	children
}: SessionContextProviderProps) {
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
		} catch (error) {
			console.error("Error in getMenteeSession:", error)
		}
		return null
	}

	///////////////
	// Write
	///////////////

	async function adminCompleteSession(
		mentorAddress: string,
		menteeAddress: string,
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
				const transaction = await contract.adminCompleteSession(
					mentorAddress,
					menteeAddress,
					valueLocked
				)
				await transaction.wait()
				console.log("Completed session")
			} catch (error) {
				console.error("Error in adminCompleteSession:", error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	async function adminUpdateSessionEngagement(
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
				const transaction = await contract.updateSessionEngagement(
					menteeAddress,
					mentorAddress,
					newEngagementDuration
				)
				await transaction.wait()
				console.log("Updated session engagement")
				alert("Updated session engagement")
			} catch (error) {
				console.error("Error in adminCompleteSession:", error)
			}
		} else {
			console.log("Please install MetaMask")
		}
	}

	const context: SessionContextProps = {
		getMenteeSession,
		adminCompleteSession,
		adminUpdateSessionEngagement
	}

	return (
		<SessionContext.Provider value={context}>
			{children}
		</SessionContext.Provider>
	)
}

export { SessionContext }
