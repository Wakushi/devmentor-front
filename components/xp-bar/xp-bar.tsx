import { useContext, useState } from "react"
import classes from "./xp-bar.module.scss"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import ConfirmationModal from "../confirmation-modal/confirmation-modal"
import Button from "../ui/button/button"
import HoverComponent from "../ui/hover-text/hover-text"

interface ExperienceBarProps {
	currentExp: number
	maxExp: number
	currentBadge?: Badge
	nextBadge?: Badge
	setWaitingModalMessage?: (message: string) => void
	mentorView: boolean
}

export default function ExperienceBar({
	currentExp,
	maxExp,
	currentBadge,
	nextBadge,
	setWaitingModalMessage,
	mentorView
}: ExperienceBarProps) {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false)

	const { burnXpForBadge } = useContext(RewardContext)
	const fillWidth = Math.min(100, (currentExp / maxExp) * 100)

	function openBadgeModal() {
		setIsConfirmationModalOpen(true)
	}

	function hasLastBadge(): boolean {
		if (mentorView && currentBadge?.id === 11) return true
		if (!mentorView && currentBadge?.id === 6) return true
		return false
	}

	return (
		<>
			<div
				className={`${classes.experienceBarContainer} flex items-center justify-center`}
			>
				<HoverComponent title={`Current badge: ${currentBadge?.name}`}>
					<div className={classes.badgeContainer}>
						<img src={currentBadge?.image} alt="" />
					</div>
				</HoverComponent>
				<div className={classes.experienceBar}>
					<div
						className={classes.experienceBarFill}
						style={{ width: `${fillWidth}%` }}
					></div>
				</div>
				{!hasLastBadge() && (
					<HoverComponent title={`Next badge: ${nextBadge?.name}`}>
						<div
							className={`${classes.badgeContainer} ${
								currentExp < maxExp ? classes.locked : ""
							}`}
							onClick={openBadgeModal}
						>
							<img src={nextBadge?.image} alt="" />
						</div>
					</HoverComponent>
				)}
				<p className={classes.xpCounter}>
					{currentExp} {hasLastBadge() ? "" : `/ ${maxExp}`} XP
				</p>
			</div>
			{isConfirmationModalOpen && (
				<ConfirmationModal
					setIsConfirmationModalOpen={setIsConfirmationModalOpen}
				>
					<div className="flex flex-col items-center justify-center">
						<h2 className="text-2xl font-bold mb-4">
							Unlock your next badge
						</h2>
						<p className="text-center mb-4">
							Burn {nextBadge?.cost} XP to unlock the next badge ?
						</p>
						<Button
							onClick={() => {
								if (!nextBadge || !setWaitingModalMessage)
									return
								burnXpForBadge(nextBadge?.id)
								setWaitingModalMessage("Minting next badge..")
								setIsConfirmationModalOpen(false)
							}}
						>
							Unlock
						</Button>
					</div>
				</ConfirmationModal>
			)}
		</>
	)
}
