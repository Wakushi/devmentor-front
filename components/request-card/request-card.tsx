import { getLevelLabel, getTeachingSubjectLabel } from "@/services/utils"
import { MenteeRequest } from "@/services/blockchain/MenteeContext"
import classes from "./request-card.module.scss"
import Button from "../ui/button/button"

interface RequestCardProps {
	menteeRequest: MenteeRequest
	cancelRequest: () => void
}

export default function RequestCard({
	menteeRequest,
	cancelRequest
}: RequestCardProps) {
	return (
		<div className={`basic-card ${classes.request}`}>
			<h2>Opened request</h2>
			<ul>
				<li className={classes.requestSection}>
					Engagement: {menteeRequest.engagement?.label}{" "}
				</li>
				<li className={classes.requestSection}>
					Level: {getLevelLabel(menteeRequest.level)}{" "}
				</li>
				<li className={classes.requestSection}>
					Subject : {getTeachingSubjectLabel(menteeRequest.subject)}{" "}
				</li>
			</ul>
			<Button onClick={cancelRequest} filled={true}>
				Cancel
			</Button>
		</div>
	)
}
