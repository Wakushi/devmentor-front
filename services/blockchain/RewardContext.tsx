import { ethers } from "ethers"
import { ReactNode, createContext, useContext } from "react"
import {
	DEVMENTOR_CONTRACT_ABI,
	DEVMENTOR_CONTRACT_ADDRESS,
	REWARD_MANAGER_CONTRACT_ABI,
	REWARD_MANAGER_CONTRACT_ADDRESS
} from "../constants"
import { BlockchainContext } from "./BlockchainContext"
import { convertProxyResult } from "../utils"
import { v4 as uuidv4 } from "uuid"

interface RewardContextProviderProps {
	children: ReactNode
}

export interface Badge {
	id: number
	name: string
	image: string
	description: string
	cost: number
}

export interface Reward {
	id: number
	price: number
	ethAmount: number
	totalSupply: number
	remainingSupply: number
	metadataURI: string
	externalPrice: boolean
}

interface RewardContextProps {
	getBaseUri: () => Promise<string>
	getTokenUri: (tokenId: string) => Promise<string>
	getUserXp: (userAddress: string) => Promise<string>
	getUserBadgeUri: (userAddress: string) => Promise<string>
	getUserNextBadgeUri: (
		userAddress: string,
		role: "mentee" | "mentor"
	) => Promise<{ tokenUri: string; badgeXpCost: number }>
	getBadgeXpCost: (badgeId: string) => Promise<number>
	burnXpForBadge: (badgeId: number) => Promise<void>
	getMentorTokenAmount: (mentorAddress: string) => Promise<number>
	getAvailableRewardIds: () => Promise<any>
	getRewardById: (rewardId: string) => Promise<Reward>
	claimMentorReward: (rewardId: number) => Promise<void>
	getUserRewards: (userAddress: string) => Promise<any>
	redeemReward: (rewardId: string, email?: string) => Promise<void>
	testMintXp: (mentorAddress: string, xpAmount: number) => Promise<void>
	testMintMentorToken: (
		mentorAddress: string,
		xpAmount: number
	) => Promise<void>
}

const RewardContext = createContext<RewardContextProps>({
	getBaseUri: async () => Promise.resolve(""),
	getTokenUri: async () => Promise.resolve(""),
	getUserXp: async () => Promise.resolve("0"),
	getUserBadgeUri: async () => Promise.resolve(""),
	getUserNextBadgeUri: async () =>
		Promise.resolve({ tokenUri: "", badgeXpCost: 0 }),
	getBadgeXpCost: async () => Promise.resolve(0),
	burnXpForBadge: async () => Promise.resolve(),
	getMentorTokenAmount: async () => Promise.resolve(0),
	getAvailableRewardIds: async () => Promise.resolve(null),
	getRewardById: async () =>
		Promise.resolve({
			id: 0,
			price: 0,
			ethAmount: 0,
			totalSupply: 0,
			remainingSupply: 0,
			metadataURI: "",
			externalPrice: false
		}),
	claimMentorReward: async () => Promise.resolve(),
	getUserRewards: async () => Promise.resolve(null),
	redeemReward: async () => Promise.resolve(),
	testMintXp: async () => Promise.resolve(),
	testMintMentorToken: async () => Promise.resolve()
})

export default function RewardContextProvider({
	children
}: RewardContextProviderProps) {
	const { errorHandler, waitForTransaction } = useContext(BlockchainContext)
	///////////////
	// State
	///////////////
	///////////////
	// Read
	///////////////

	async function getBaseUri(): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const baseUri = await contract.uri("0")
			return baseUri
		} catch (error: unknown) {
			errorHandler(error)
		}
		return ""
	}

	async function getTokenUri(tokenId: string): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const tokenUri = await contract.uri(tokenId)
			return tokenUri
		} catch (error: unknown) {
			errorHandler(error)
		}
		return ""
	}

	async function getUserXp(userAddress: string): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const xpAmount = await contract.getUserXp(userAddress)
			return xpAmount
		} catch (error: unknown) {
			errorHandler(error)
		}
		return "0"
	}

	async function getUserBadgeUri(userAddress: string): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const badgeId = await contract.getUserBadgeId(userAddress)
			if (parseInt(badgeId) === 0) return ""
			const tokenUri = await contract.uri(badgeId)
			return tokenUri
		} catch (error: unknown) {
			errorHandler(error)
		}
		return ""
	}

	async function getUserNextBadgeUri(
		userAddress: string,
		role: "mentee" | "mentor"
	): Promise<{ tokenUri: string; badgeXpCost: number }> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const badgeId = await contract.getUserBadgeId(userAddress)
			const parsedBadgeId = parseInt(badgeId)
			let queriedBadgeId
			if (parsedBadgeId === 0) {
				queriedBadgeId = role === "mentee" ? 2 : 7
			} else {
				if (role === "mentee") {
					queriedBadgeId = parsedBadgeId === 6 ? 6 : parsedBadgeId + 1
				}
				if (role === "mentor") {
					queriedBadgeId =
						parsedBadgeId === 11 ? 11 : parsedBadgeId + 1
				}
			}
			const tokenUri = await contract.uri(queriedBadgeId)
			const badgeXpCost = await contract.getBadgeXpCost(queriedBadgeId)
			return { tokenUri, badgeXpCost: parseInt(badgeXpCost) }
		} catch (error: unknown) {
			errorHandler(error)
		}
		return { tokenUri: "", badgeXpCost: 0 }
	}

	async function getBadgeXpCost(badgeId: string): Promise<number> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const badgeCost = await contract.getBadgeXpCost(badgeId)
			return parseInt(badgeCost)
		} catch (error: unknown) {
			errorHandler(error)
		}
		return 0
	}

	async function getMentorTokenAmount(
		mentorAddress: string
	): Promise<number> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const mentorTokensAmount = await contract.getUserMentorTokens(
				mentorAddress
			)
			return parseInt(mentorTokensAmount)
		} catch (error: unknown) {
			errorHandler(error)
		}
		return 0
	}

	async function getAvailableRewardIds(): Promise<any> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const availableRewardIds = await contract.getAvailableRewardIds()
			return convertProxyResult(availableRewardIds)
		} catch (error: unknown) {
			errorHandler(error)
		}
		return null
	}

	async function getUserRewards(userAddress: string): Promise<any> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const rewardIdsRaw = await contract.getUserRewards(userAddress)
			const rewardIds = convertProxyResult(rewardIdsRaw)

			const rewardPromises = rewardIds
				.filter((rewardId: string) => rewardId !== "0")
				.map(async (rewardId: string) => {
					return await getRewardById(rewardId)
				})
			return await Promise.all(rewardPromises).then((rewards) => {
				return rewards
			})
		} catch (error: unknown) {
			errorHandler(error)
		}
		return null
	}

	async function getRewardById(rewardId: string): Promise<Reward> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const contract = new ethers.Contract(
			REWARD_MANAGER_CONTRACT_ADDRESS,
			REWARD_MANAGER_CONTRACT_ABI,
			provider
		)
		try {
			const rewardArray = await contract.getRewardById(rewardId)
			return {
				id: parseInt(rewardArray[0]),
				price: parseInt(rewardArray[1]),
				ethAmount: parseInt(rewardArray[2]),
				totalSupply: parseInt(rewardArray[3]),
				remainingSupply: parseInt(rewardArray[4]),
				metadataURI: rewardArray[5],
				externalPrice: rewardArray[6]
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
		return {
			id: 0,
			price: 0,
			ethAmount: 0,
			totalSupply: 0,
			remainingSupply: 0,
			metadataURI: "",
			externalPrice: false
		}
	}

	///////////////
	// Write
	///////////////

	async function burnXpForBadge(badgeId: number): Promise<void> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			signer
		)
		try {
			const transaction = await contract.burnXpForBadge(badgeId)
			if (waitForTransaction) {
				waitForTransaction(transaction.hash)
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
	}

	async function claimMentorReward(rewardId: number): Promise<void> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			signer
		)
		try {
			const transaction = await contract.claimMentorReward(rewardId)
			if (waitForTransaction) {
				waitForTransaction(transaction.hash)
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
	}

	async function redeemReward(
		rewardId: string,
		email?: string
	): Promise<void> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			signer
		)
		try {
			const transactionUuid = uuidv4()
			let args: string[] = []
			if (email) {
				args = [email, rewardId, transactionUuid]
			}
			const transaction = await contract.redeemReward(rewardId, args)
			if (waitForTransaction) {
				waitForTransaction(transaction.hash)
			}
		} catch (error: unknown) {
			errorHandler(error)
		}
	}

	async function testMintXp(
		mentorAddress: string,
		xpAmount: number
	): Promise<void> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			signer
		)
		try {
			await contract.testMintXp(mentorAddress, xpAmount)
		} catch (error: unknown) {
			errorHandler(error)
		}
	}

	async function testMintMentorToken(
		mentorAddress: string,
		xpAmount: number
	): Promise<void> {
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			DEVMENTOR_CONTRACT_ADDRESS,
			DEVMENTOR_CONTRACT_ABI,
			signer
		)
		try {
			await contract.testMintMentorToken(mentorAddress, xpAmount)
		} catch (error: unknown) {
			errorHandler(error)
		}
	}

	const context: RewardContextProps = {
		getBaseUri,
		getTokenUri,
		getUserXp,
		getUserBadgeUri,
		getUserNextBadgeUri,
		getBadgeXpCost,
		burnXpForBadge,
		getMentorTokenAmount,
		getAvailableRewardIds,
		getRewardById,
		claimMentorReward,
		getUserRewards,
		redeemReward,
		testMintXp,
		testMintMentorToken
	}

	return (
		<RewardContext.Provider value={context}>
			{children}
		</RewardContext.Provider>
	)
}

export { RewardContext }
