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
}

const SessionContext = createContext<SessionContextProps>({
	getMenteeSession: async () => Promise.resolve(null)
})

export default function SessionContextProvider({
	children
}: SessionContextProviderProps) {
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

	const context: SessionContextProps = {
		getMenteeSession
	}

	return (
		<SessionContext.Provider value={context}>
			{children}
		</SessionContext.Provider>
	)
}

export { SessionContext }
