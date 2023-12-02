import { getShortenedAddress, isAddressZero } from "@/services/utils"
import { useContext } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { Mentee } from "@/services/blockchain/MenteeContext"
import classes from "./mentee-profile-card.module.scss"
import Copy from "../ui/copy/copy"

interface MenteeProfileCardProps {
	menteeInfo: Mentee
}

export default function MenteeProfileCard({
	menteeInfo
}: MenteeProfileCardProps) {
	const { getLanguageLabel } = useContext(BlockchainContext)
	return (
		<div className={classes.profileDetails}>
			<h2>Profile</h2>
			<div className={classes.profileSection}>
				<h3>
					Preferred Language:{" "}
					<span>{getLanguageLabel(menteeInfo?.language || 0)}</span>
				</h3>
			</div>
			<div className={classes.profileSection}>
				<h3>
					Sessions: <span>{menteeInfo?.sessionCount}</span>
				</h3>
			</div>
			<div
				className={`${classes.profileSection} flex items-center gap-2`}
			>
				<h3>
					Current mentor :{" "}
					{isAddressZero(menteeInfo.mentor)
						? "You don't have a mentor yet."
						: getShortenedAddress(menteeInfo.mentor)}
				</h3>
				{!isAddressZero(menteeInfo.mentor) && (
					<Copy contentToCopy={menteeInfo.mentor} />
				)}
			</div>
		</div>
	)
}
