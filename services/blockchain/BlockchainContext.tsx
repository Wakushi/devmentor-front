import { ethers } from "ethers"
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from "react"
import {
	DEVMENTOR_CONTRACT_ABI,
	DEVMENTOR_CONTRACT_ADDRESS
} from "../constants"
import { useRouter } from "next/router"
import { SnackbarContext } from "../SnackbarContext"

interface BlockchainContextProviderProps {
	children: ReactNode
}

interface BlockchainContextProps {
	languages: Language[]
	isWaitingForTransaction?: boolean
	isRegistered?: boolean
	setIsRegistered?: (isRegistered: boolean) => void
	waitForTransaction?: (transactionHash: string) => void
	transactionHash?: string
	setTransactionHash?: (transactionHash: string) => void
	getAllLanguages: () => {}
	getLanguageById: (languageId: number) => Promise<string>
	getLanguageLabel: (languageId: number) => string
	getEthPriceInUsd: () => Promise<number>
	errorHandler: (error: any) => void
}

export interface Language {
	id: number
	label: string
}

const BlockchainContext = createContext<BlockchainContextProps>({
	languages: [],
	isWaitingForTransaction: false,
	isRegistered: false,
	setIsRegistered: () => {},
	waitForTransaction: (transactionHash: string) => {},
	transactionHash: "",
	setTransactionHash: () => {},
	getAllLanguages: async () => {},
	getLanguageById: async () => {
		return ""
	},
	getLanguageLabel: () => {
		return ""
	},
	getEthPriceInUsd: async () => {
		return 0
	},
	errorHandler: (error: any) => {}
})

const ETH_PRICE_MULTIPLIER = 100000000

export default function BlockchainContextProvider({
	children
}: BlockchainContextProviderProps) {
	///////////////
	// State
	///////////////

	const [languages, setLanguages] = useState<Language[]>([])
	const [transactionHash, setTransactionHash] = useState<string>("")
	const [isRegistered, setIsRegistered] = useState(false)
	const [isWaitingForTransaction, setIsWaitingForTransaction] =
		useState<boolean>(false)
	const { openSnackBar } = useContext(SnackbarContext)

	const router = useRouter()

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

	async function getEthPriceInUsd(): Promise<number> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			provider
		)
		try {
			const ethPriceInUsd = await contract.getEthPrice()
			return parseInt(ethPriceInUsd) / ETH_PRICE_MULTIPLIER
		} catch (error) {
			console.error(error)
			return 0
		}
	}

	///////////////
	// Utils
	///////////////

	function waitForTransaction(transactionHash: string) {
		setTransactionHash(transactionHash)
		setIsWaitingForTransaction(true)
	}

	function getLanguageLabel(languageId: number): string {
		return languages[languageId]?.label
	}

	function errorHandler(error: any) {
		let errorMessage = "An unknown error occurred. Please try again later."

		if (typeof error === "object" && error !== null) {
			const errorObj = error as { data?: { message?: string } }

			if (errorObj.data && typeof errorObj.data.message === "string") {
				errorMessage = extractRevertReason(errorObj.data.message)
			}
		} else if (typeof error === "string") {
			errorMessage = error
		}

		alert(errorMessage)
		console.error(error)
	}

	function extractRevertReason(message: any) {
		const matches = message.match(/reverted with reason string '(.*)'/)
		return matches && matches[1] ? matches[1] : message
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
			setIsWaitingForTransaction(false)
			router.push("/match")
		})

		contract.on("MenteeRegistered", (mentee) => {
			console.log("MenteeRegistered event:", mentee)
			setIsWaitingForTransaction(false)
			setIsRegistered(true)
		})

		contract.on("MentorRegistered", (mentor) => {
			console.log("Mentor registered event:", mentor)
			setIsWaitingForTransaction(false)
			setIsRegistered(true)
		})

		contract.on("MenteeOpenedRequest", (mentee) => {
			console.log("MenteeOpenedRequest event:", mentee)
			router.push("/mentee/profile")
		})

		contract.on("MenteeConfirmedSession", (mentee, mentor) => {
			console.log("MenteeConfirmedSession event:", mentee, mentor)
			setIsWaitingForTransaction(false)
			openSnackBar("menteeConfirmedSession")
		})

		contract.on("MentorConfirmedSession", (mentee, mentor) => {
			console.log("MentorConfirmedSession event:", mentee, mentor)
			setIsWaitingForTransaction(false)
			openSnackBar("mentorConfirmedSession")
		})

		contract.on("RequestCancelled", (mentee) => {
			console.log("RequestCancelled event:", mentee)
			openSnackBar("cancelledRequest")
			setIsWaitingForTransaction(false)
		})

		contract.on("MentorTipped", (mentee, mentor, value) => {
			console.log("Tip event:", mentee, mentor, value)
			openSnackBar("tipSent")
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

	function listenForTransactionMine(transactionResponse: any, provider: any) {
		console.log(`Mining ${transactionResponse.hash}`)
		return new Promise<void>((resolve) => {
			provider.once(transactionResponse.hash, () => {
				setIsWaitingForTransaction(false)
				resolve()
			})
		})
	}

	const context: BlockchainContextProps = {
		languages,
		isRegistered,
		setIsRegistered,
		isWaitingForTransaction,
		waitForTransaction,
		transactionHash,
		setTransactionHash,
		getAllLanguages,
		getLanguageById,
		getLanguageLabel,
		getEthPriceInUsd,
		errorHandler
	}

	return (
		<BlockchainContext.Provider value={context}>
			{children}
		</BlockchainContext.Provider>
	)
}

export { BlockchainContext }
