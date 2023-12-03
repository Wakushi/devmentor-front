import classes from "./match.module.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/services/UserContext"
import { Mentee, MenteeContext } from "@/services/blockchain/MenteeContext"
import { getShortenedAddress } from "@/services/utils"
import Button from "@/components/ui/button/button"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import Confetti from "react-confetti"
import { useRouter } from "next/router"
import Copy from "@/components/ui/copy/copy"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import HoverComponent from "@/components/ui/hover-text/hover-text"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"

export default function Match() {
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [confetti, setConfetti] = useState(true)

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0
	})

	const [mentorBadge, setMentorBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})

	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo } = useContext(MenteeContext)
	const { getMentorInfo, getMentorAverageRating } = useContext(MentorContext)
	const { getUserBadgeUri } = useContext(RewardContext)

	const router = useRouter()

	useEffect(() => {
		if (!menteeInfo || menteeInfo.hasRequest) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				if (!mentee) return
				getMentorInfo(mentee.mentor).then((mentor) => {
					setMentorInfo(mentor)
					getUserBadgeUri(mentee.mentor).then((badgeUri) => {
						if (!badgeUri) return
						fetch(badgeUri)
							.then((response) => {
								return response.json()
							})
							.then(({ id, name, image, description }) => {
								setMentorBadge({
									id,
									name: name,
									image: image,
									description: description,
									cost: 0
								})
							})
					})
				})
			})
		}
	}, [walletAddress])

	useEffect(() => {
		const timer = setTimeout(() => {
			setConfetti(false)
		}, 1000000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			})
		}

		handleResize()

		window.addEventListener("resize", handleResize)

		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<>
			{confetti && (
				<Confetti width={windowSize.width} height={windowSize.height} />
			)}
			<div className={classes.matchContainer}>
				<div className={classes.card}>
					<div className={classes.cardInner}>
						<div className={classes.cardFront}>
							<h2 className={classes.title}>That's a match!</h2>
						</div>
						{!!menteeInfo && !!mentorInfo && (
							<div className={`${classes.cardBack} gap-6`}>
								<span className="flex items-center gap-2">
									<h2>
										{getShortenedAddress(
											menteeInfo?.mentor
										)}
									</h2>
									<Copy contentToCopy={menteeInfo?.mentor} />
								</span>
								<div className="flex items-center gap-4">
									{!!mentorBadge.id && (
										<HoverComponent
											title={mentorBadge.name}
										>
											<div className={classes.badge}>
												<img
													src={mentorBadge.image}
													alt={mentorBadge.name}
												/>
											</div>
										</HoverComponent>
									)}
									<p className={classes.mentor_info}>
										{getMentorAverageRating(
											mentorInfo
										).toFixed(2)}{" "}
										<i className="fa-solid fa-star"></i>
									</p>
								</div>
								<p className={classes.mentor_info}>
									{mentorInfo.sessionCount} session
									{mentorInfo.sessionCount > 1
										? "s"
										: ""}{" "}
									completed
								</p>
								<p className={classes.mentor_info}>
									{mentorInfo.yearsOfExperience} year
									{mentorInfo.yearsOfExperience > 1
										? "s"
										: ""}{" "}
									of experience
								</p>
								<h3>Contact</h3>
								<span className="flex items-center gap-2">
									<p> {mentorInfo.contact} </p>
									<Copy contentToCopy={mentorInfo.contact} />
								</span>
								<Button
									onClick={() => {
										router.push("/mentee/profile")
									}}
								>
									Return to profile
								</Button>
							</div>
						)}
					</div>
				</div>
				<WavesBackground />
			</div>
		</>
	)
}
