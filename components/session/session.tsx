import { getReadableDate, getShortenedAddress } from "@/services/utils"
import classes from "./session.module.scss"
import Button from "../ui/button/button"
import { Session } from "@/services/blockchain/SessionContext"
import { useRouter } from "next/router"
import { ethers } from "ethers"
import { useContext, useEffect, useState } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { MentorContext } from "@/services/blockchain/MentorContext"

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

	const [valueLockedInUsd, setValueLockedInUsd] = useState(0)
	const [mentorContact, setMentorContact] = useState("")
	const { getEthPriceInUsd } = useContext(BlockchainContext)
	const { getMentorContact } = useContext(MentorContext)

	useEffect(() => {
		getEthPriceInUsd().then((price) => {
			setValueLockedInUsd(
				+ethers.formatUnits(BigInt(valueLocked), 18) * price
			)
		})
		getMentorContact(mentor).then((contact) => {
			setMentorContact(contact)
		})
	}, [])

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
					<span>Mentee:</span> {getShortenedAddress(mentee)}
				</div>
			) : (
				<>
					<div className={classes.sessionDetail}>
						<span>Mentor: </span>
						{getShortenedAddress(mentor)}
					</div>
					<div className={classes.sessionDetail}>
						<span>Contact: </span>
						{mentorContact}
					</div>
				</>
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
				{ethers.formatUnits(BigInt(valueLocked), 18)} ETH /{" "}
				{valueLockedInUsd.toFixed(2)}$
			</div>
			<ConfirmationStatus
				isConfirmed={mentorConfirmed}
				label={mentorView ? "You" : "Mentor"}
			/>
			<ConfirmationStatus
				isConfirmed={menteeConfirmed}
				label={mentorView ? "Mentee" : "You"}
			/>
			{mentorView && !session.mentorConfirmed && (
				<Button onClick={confirmSession} filled={true}>
					Confirm session
				</Button>
			)}
			{!mentorView && !session.menteeConfirmed && (
				<Button onClick={confirmSession} filled={true}>
					Confirm session
				</Button>
			)}
		</div>
	)
}
