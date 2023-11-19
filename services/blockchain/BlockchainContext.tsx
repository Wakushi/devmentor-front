import { ethers } from "ethers"
import {
	ReactNode,
	createContext,
	use,
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
	}
})

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

		contract.on("RequestCancelled", (mentee) => {
			console.log("RequestCancelled event:", mentee)
			openSnackBar("cancelledRequest")
			setIsWaitingForTransaction(false)
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
		getLanguageLabel
	}

	return (
		<BlockchainContext.Provider value={context}>
			{children}
		</BlockchainContext.Provider>
	)
}

export { BlockchainContext }
