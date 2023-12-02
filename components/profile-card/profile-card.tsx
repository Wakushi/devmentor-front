import { Badge } from "@/services/blockchain/RewardContext"
import classes from "./profile-card.module.scss"
import { getShortenedAddress } from "@/services/utils"
import HoverComponent from "../ui/hover-text/hover-text"

interface ProfileCardProps {
	userAddress: string
	badge: Badge
	nextBadge: Badge
	xp: number
	mentorTokens: number
	mentorView: boolean
	onClick?: () => void
}

export default function ProfileCard({
	userAddress,
	badge,
	nextBadge,
	xp,
	mentorTokens,
	mentorView,
	onClick
}: ProfileCardProps) {
	return (
		<div className={`${classes.profileCard} flex gap-4`} onClick={onClick}>
			{badge.image ? (
				<HoverComponent title={badge.name}>
					<div className={classes.badge}>
						<img src={badge.image} alt={badge.name} />
					</div>
				</HoverComponent>
			) : (
				<HoverComponent title="Next badge">
					<div className={classes.nextBadge}>
						<img src={nextBadge.image} alt={nextBadge.name} />
					</div>
				</HoverComponent>
			)}
			<div className="flex flex-col items-center justify-center gap-2">
				<p>{getShortenedAddress(userAddress)}</p>
				<div className="flex gap-2 font-medium">
					<p>{xp} XP</p>
					{mentorView && <p>{mentorTokens} MTR</p>}
				</div>
			</div>
		</div>
	)
}
