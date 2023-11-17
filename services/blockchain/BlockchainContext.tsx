import { ethers } from "ethers"
import { ReactNode, createContext, use, useEffect, useState } from "react"
import {
	DEVMENTOR_CONTRACT_ABI,
	DEVMENTOR_CONTRACT_ADDRESS
} from "../constants"

interface BlockchainContextProviderProps {
	children: ReactNode
}

interface BlockchainContextProps {
	languages: Language[]
	getAllLanguages: () => {}
	getLanguageById: (languageId: number) => Promise<string>
}

export interface Language {
	id: number
	label: string
}

const BlockchainContext = createContext<BlockchainContextProps>({
	languages: [],
	getAllLanguages: async () => {},
	getLanguageById: async () => {
		return ""
	}
})

export default function BlockchainContextProvider({
	children
}: BlockchainContextProviderProps) {
	///////////////
	// State
	///////////////

	const [languages, setLanguages] = useState([])

	useEffect(() => {
		getAllLanguages()
		listenToEvents()
	}, [])

	///////////////
	// Read
	///////////////

	async function getAllLanguages() {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const languages = await contract.getAllLanguages()
			setLanguages(
				languages.map((language: string, index: number) => {
					return { id: index, label: language }
				})
			)
		} catch (error) {
			console.error(error)
		}
	}

	async function getLanguageById(languageId: number): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const language = await contract.getLanguageById(languageId)
			return language
		} catch (error) {
			console.error(error)
			return ""
		}
	}

	///////////////
	// Write
	///////////////

	///////////////
	// Events
	///////////////

	function listenToEvents() {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)

		console.log("Listening to events...")

		contract.on("MentorSelectionRequestSent", (mentee, requestId) => {
			console.log("MentorSelectionRequestSent event:", mentee, requestId)
		})

		contract.on("MenteeMatchedWithMentor", (mentee, mentor) => {
			console.log("MenteeMatchedWithMentor event:", mentee, mentor)
		})

		contract.on("MenteeRegistered", (mentee) => {
			console.log("MenteeRegistered event:", mentee)
		})

		contract.on("MenteeOpenedRequest", (mentee) => {
			console.log("MenteeOpenedRequest event:", mentee)
		})

		contract.on(
			"SessionCreated",
			(mentee, mentor, engagement, valueLocked) => {
				console.log(
					"SessionCreated event:",
					mentee,
					mentor,
					engagement,
					valueLocked
				)
			}
		)
	}

	const context: BlockchainContextProps = {
		languages,
		getAllLanguages,
		getLanguageById
	}

	return (
		<BlockchainContext.Provider value={context}>
			{children}
		</BlockchainContext.Provider>
	)
}

export { BlockchainContext }
