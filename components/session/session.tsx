import { getReadableDate } from "@/services/utils"
import classes from "./session.module.scss"
import Button from "../ui/button/button"
import { Session } from "@/services/blockchain/SessionContext"
import { useRouter } from "next/router"

interface SessionProps {
	session: Session
	mentorView: boolean
	confirmSession: () => void
}

export default function SessionCard({
	session,
	mentorView,
	confirmSession
}: SessionProps) {
	const {
		mentee,
		mentor,
		startTime,
		engagement,
		valueLocked,
		mentorConfirmed,
		menteeConfirmed
	} = session

	const router = useRouter()

	function openRequest() {
		router.push("/mentee/session-form")
	}

	const ConfirmationStatus = ({
		isConfirmed,
		label
	}: {
		isConfirmed: boolean
		label: string
	}) => (
		<div className={classes.sessionDetail}>
			<span>{label} confirmed: </span>
			<div
				className={`${classes.confirmation_light} ${
					isConfirmed ? classes.confirmed : classes.notConfirmed
				}`}
			></div>
		</div>
	)

	if (!startTime) {
		return (
			<div className={`${classes.session} basic-card`}>
				<div className={`${classes.sessionDetail} flex-col gap-5`}>
					<span>No session scheduled</span>
					{!mentorView && (
						<Button onClick={openRequest} filled={true}>
							Open session
						</Button>
					)}
				</div>
			</div>
		)
	}

	return (
		<div className={`${classes.session} basic-card`}>
			<h3>Session</h3>
			{mentorView ? (
				<div className={classes.sessionDetail}>
					<span>Mentee: </span>
					{mentee}
				</div>
			) : (
				<div className={classes.sessionDetail}>
					<span>Mentor: </span>
					{mentor}
				</div>
			)}
			<div className={classes.sessionDetail}>
				<span>Started: </span>
				{getReadableDate(startTime)}
			</div>
			<div className={classes.sessionDetail}>
				<span>Duration: </span>
				{engagement?.label}
			</div>
			<div className={classes.sessionDetail}>
				<span>Value locked: </span>
				{valueLocked}
			</div>
			<ConfirmationStatus
				isConfirmed={mentorConfirmed}
				label={mentorView ? "You" : "Mentor"}
			/>
			<ConfirmationStatus
				isConfirmed={menteeConfirmed}
				label={mentorView ? "Mentee" : "You"}
			/>
			<Button onClick={confirmSession} filled={true}>
				Confirm session
			</Button>
		</div>
	)
}
