import classes from "./match.module.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/services/UserContext"
import { Mentee, MenteeContext } from "@/services/blockchain/MenteeContext"
import { getShortenedAddress } from "@/services/utils"
import Button from "@/components/ui/button/button"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import Confetti from "react-confetti"

export default function Match() {
	const [menteeInfo, setMenteeInfo] = useState<Mentee | null>(null)
	const [mentorInfo, setMentorInfo] = useState<Mentor | null>(null)
	const [confetti, setConfetti] = useState(true)

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0
	})

	const { walletAddress } = useContext(UserContext)
	const { getMenteeInfo } = useContext(MenteeContext)
	const { getMentorInfo, getMentorAverageRating } = useContext(MentorContext)

	useEffect(() => {
		if (!menteeInfo || menteeInfo.hasRequest) {
			getMenteeInfo(walletAddress).then((mentee) => {
				setMenteeInfo(mentee)
				if (!mentee) return
				getMentorInfo(mentee.mentor).then((mentor) => {
					setMentorInfo(mentor)
				})
			})
		}
	}, [walletAddress])

	useEffect(() => {
		const timer = setTimeout(() => {
			setConfetti(false)
		}, 10000)

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
								<h2>
									{getShortenedAddress(menteeInfo?.mentor)}
								</h2>
								<p className={classes.mentor_info}>
									{getMentorAverageRating(mentorInfo).toFixed(
										2
									)}{" "}
									<i className="fa-solid fa-star"></i>
								</p>
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
								<Button onClick={() => {}}>Connect</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
