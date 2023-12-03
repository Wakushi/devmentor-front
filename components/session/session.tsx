import {
	getReadableDate,
	getShortenedAddress,
	isSessionOver
} from "@/services/utils"
import classes from "./session.module.scss"
import Button from "../ui/button/button"
import { Session, SessionContext } from "@/services/blockchain/SessionContext"
import { useRouter } from "next/router"
import { ethers } from "ethers"
import { useContext, useEffect, useState } from "react"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import { MentorContext } from "@/services/blockchain/MentorContext"
import ConfirmationModal from "../confirmation-modal/confirmation-modal"
import { SnackbarContext } from "@/services/SnackbarContext"
import Copy from "../ui/copy/copy"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import HoverComponent from "../ui/hover-text/hover-text"

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
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false)

	const [partnerBadge, setPartnerBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})

	const { getEthPriceInUsd, getCurrentBlockTimestamp } =
		useContext(BlockchainContext)
	const { getMentorContact } = useContext(MentorContext)
	const { cancelSession } = useContext(SessionContext)
	const { openSnackBar } = useContext(SnackbarContext)
	const { getUserBadgeUri } = useContext(RewardContext)

	useEffect(() => {
		getEthPriceInUsd().then((price) => {
			setValueLockedInUsd(
				+ethers.formatUnits(BigInt(valueLocked), 18) * price
			)
		})
		getMentorContact(mentor).then((contact) => {
			setMentorContact(contact)
		})
		getUserBadgeUri(mentorView ? mentee : mentor).then((badgeUri) => {
			if (!badgeUri) return
			fetch(badgeUri)
				.then((response) => {
					return response.json()
				})
				.then(({ id, name, image, description }) => {
					setPartnerBadge({
						id,
						name: name,
						image: image,
						description: description,
						cost: 0
					})
				})
		})
	}, [])

	const router = useRouter()

	function openRequest() {
		router.push("/mentee/session-form")
	}

	function onCancelSession() {
		getCurrentBlockTimestamp().then((timestamp: number) => {
			if (!isSessionOver(timestamp, session)) {
				openSnackBar("sessionCantBeCancelled")
			} else {
				cancelSession(mentee, mentor, mentorView ? "mentor" : "mentee")
			}
			setIsConfirmationModalOpen(false)
		})
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
		<>
			<div className={`${classes.session} basic-card`}>
				<h2>Session</h2>
				{mentorView ? (
					<div className={classes.sessionDetail}>
						<span className={classes.sessionLabel}>Mentee:</span>{" "}
						<span className="flex items-center gap-2">
							{!!partnerBadge.id && (
								<HoverComponent title={partnerBadge.name}>
									<div className={classes.badge}>
										<img
											src={partnerBadge.image}
											alt={partnerBadge.name}
										/>
									</div>
								</HoverComponent>
							)}
							{getShortenedAddress(mentee)}{" "}
							<Copy contentToCopy={mentee} />
						</span>
					</div>
				) : (
					<>
						<div className={classes.sessionDetail}>
							<span className={classes.sessionLabel}>
								Mentor:{" "}
							</span>
							<span className="flex items-center gap-2">
								{!!partnerBadge.id && (
									<HoverComponent title={partnerBadge.name}>
										<div className={classes.badge}>
											<img
												src={partnerBadge.image}
												alt={partnerBadge.name}
											/>
										</div>
									</HoverComponent>
								)}
								{getShortenedAddress(mentor)}
								<Copy contentToCopy={mentor} />
							</span>
						</div>
						<div className={classes.sessionDetail}>
							<span className={classes.sessionLabel}>
								Contact:{" "}
							</span>
							<span className="flex items-center gap-2">
								{mentorContact}
								<Copy contentToCopy={mentorContact} />
							</span>
						</div>
					</>
				)}
				<div className={classes.sessionDetail}>
					<span className={classes.sessionLabel}>Started: </span>
					{getReadableDate(startTime)}
				</div>
				<div className={classes.sessionDetail}>
					<span className={classes.sessionLabel}>Duration: </span>
					{engagement?.label}
				</div>
				{!!engagement?.durationInSeconds && (
					<div className={classes.sessionDetail}>
						<span className={classes.sessionLabel}>
							Session end:{" "}
						</span>
						{getReadableDate(
							startTime + engagement?.durationInSeconds
						)}
					</div>
				)}
				<div className={classes.sessionDetail}>
					<span className={classes.sessionLabel}>Value locked: </span>
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
				<div className="flex justify-center gap-4">
					<Button
						onClick={() => setIsConfirmationModalOpen(true)}
						cancel={true}
					>
						Cancel session
					</Button>
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
			</div>
			{isConfirmationModalOpen && (
				<ConfirmationModal
					setIsConfirmationModalOpen={setIsConfirmationModalOpen}
				>
					<div className="flex flex-col items-center gap-10 max-w-xl text-center">
						<h2>Do you want to cancel this session?</h2>
						<p>
							You can only cancel if your{" "}
							{mentorView ? "mentee" : "mentor"} has not confirmed
							within one week following the anticipated session
							conclusion.
						</p>
						<div className="flex gap-4">
							<Button onClick={onCancelSession} cancel={true}>
								Yes
							</Button>
							<Button
								onClick={() =>
									setIsConfirmationModalOpen(false)
								}
								filled={true}
							>
								No
							</Button>
						</div>
					</div>
				</ConfirmationModal>
			)}
		</>
	)
}
