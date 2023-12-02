import { useContext, useEffect, useState } from "react"
import classes from "./prize-card.module.scss"
import Button from "../ui/button/button"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"

interface PrizeCardProps {
	price: number
	totalSupply: number
	remainingSupply: number
	metaDataUri: string
	onClaim: () => void
	claimedView: boolean
}

interface PrizeInfo {
	image: string
	name: string
	description: string
}

export default function PrizeCard({
	price,
	totalSupply,
	remainingSupply,
	metaDataUri,
	onClaim,
	claimedView
}: PrizeCardProps) {
	const [prizeInfo, setPrizeInfo] = useState<PrizeInfo>({
		image: "",
		name: "",
		description: ""
	})

	const { isWaitingForTransaction } = useContext(BlockchainContext)

	useEffect(() => {
		fetch(metaDataUri)
			.then((res) => res.json())
			.then((data) => {
				setPrizeInfo({
					image: data.image,
					name: data.name,
					description: data.description
				})
			})
	}, [isWaitingForTransaction])

	return (
		<div className={`${classes.prizeCard} fade-in-bottom`}>
			<img
				src={prizeInfo.image}
				alt={prizeInfo.name}
				className={classes.prizeImage}
			/>
			<h3 className={classes.prizeName}>{prizeInfo.name}</h3>
			<p className={classes.prizeDescription}>{prizeInfo.description}</p>
			{!claimedView && (
				<>
					<div className={classes.prizeCost}>
						{price} Mentor Tokens
					</div>
					<p className={classes.prizeDescription}>
						{remainingSupply}/{totalSupply} left
					</p>
				</>
			)}

			<Button onClick={onClaim} filled={true}>
				{claimedView ? "Redeem" : "Claim"}
			</Button>
		</div>
	)
}
