import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from "react"
import { ethers } from "ethers"
import {
	DEVMENTOR_CONTRACT_ADDRESS,
	DEVMENTOR_CONTRACT_ABI
} from "../constants"

interface MentorContextProviderProps {
	children: ReactNode
}

interface MentorContextProps {
	getMentorInfo: (mentorAddress: string) => void
	getMentorAverageRating: (mentorAddress: string) => void
	registerAsMentor: (
		teachingSubjects: number[],
		engagement: number,
		language: number,
		yearsOfExperience: number
	) => void
	approveMentor: (mentorAddress: string) => void
	validateSessionAsMentor: (menteeAddress: string) => void
}

const MentorContext = createContext<MentorContextProps>({
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
				const mentorInfo = await contract.getMentorInfo(mentorAddress)
				return mentorInfo
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
				return mentorAverageRating
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
		teachingSubjects: number[],
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
				const registerMentorTx = await contract.registerMentor(
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
