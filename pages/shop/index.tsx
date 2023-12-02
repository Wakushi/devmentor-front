import { useContext, useEffect, useState } from "react"
import PrizeCard from "@/components/prize-card/prize-card"
import classes from "./shop.module.scss"
import WaitingModal from "@/components/waiting-modal/waiting-modal"
import { Reward, RewardContext } from "@/services/blockchain/RewardContext"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import { UserContext } from "@/services/UserContext"
import { SnackbarContext } from "@/services/SnackbarContext"

export default function ShopPage() {
	const {
		getAvailableRewardIds,
		getRewardById,
		claimMentorReward,
		getMentorTokenAmount
	} = useContext(RewardContext)
	const { walletAddress } = useContext(UserContext)
	const { isWaitingForTransaction } = useContext(BlockchainContext)
	const { openSnackBar } = useContext(SnackbarContext)
	const [rewards, setRewards] = useState<Reward[]>([])
	const [mentorTokens, setMentorTokens] = useState<number>(0)

	useEffect(() => {
		if (!walletAddress) return
		setRewards([])
		getMentorTokenAmount(walletAddress).then((tokens) => {
			setMentorTokens(tokens)
		})
		getAvailableRewardIds().then((rewardIds) => {
			const rewardPromises = rewardIds.map((rewardId: string) => {
				return getRewardById(rewardId)
			})

			Promise.all(rewardPromises).then((resolvedRewards) => {
				setRewards(resolvedRewards)
			})
		})
	}, [walletAddress, isWaitingForTransaction])

	function handleClaim(rewardId: number, price: number) {
		if (mentorTokens < price) {
			openSnackBar("notEnoughTokens")
			return
		}
		claimMentorReward(rewardId)
	}

	return (
		<div className={`${classes.shopPage} page flex flex-col`}>
			<div className="p-5">
				<h1 className="p-10">Rewards shop</h1>
				<div className="flex flex-wrap gap-5 justify-center p-5 items-start">
					{rewards.map((prize: Reward) => (
						<PrizeCard
							key={prize.id}
							price={prize.price}
							totalSupply={prize.totalSupply}
							remainingSupply={prize.remainingSupply}
							metaDataUri={prize.metadataURI}
							onClaim={() => handleClaim(prize.id, prize.price)}
							claimedView={false}
						/>
					))}
				</div>
			</div>
			{isWaitingForTransaction && (
				<WaitingModal>
					<div className="flex flex-col gap-2">
						<h4>Claiming prize..</h4>
					</div>
				</WaitingModal>
			)}
			<WavesBackground />
		</div>
	)
}
