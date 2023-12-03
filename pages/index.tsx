import { useContext, useEffect, useRef, useState } from "react"
import { Mentor, MentorContext } from "@/services/blockchain/MentorContext"
import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import MentorList from "@/components/mentor-list/mentor-list"
import { rankMentors } from "@/services/utils"
import classes from "./landing.module.scss"
import Button from "@/components/ui/button/button"
import { useRouter } from "next/router"
import menteeProfileImg from "@/assets/images/screens/mentee profile browser.webp"
import rewardShopImg from "@/assets/images/screens/rewards browser.webp"
import Image from "next/image"

export default function Landing() {
	const { getAllMentors } = useContext(MentorContext)

	const [mentors, setMentors] = useState<Mentor[]>([])
	const sectionRef1 = useRef<HTMLDivElement>(null)
	const sectionRef2 = useRef<HTMLDivElement>(null)
	const sectionRef3 = useRef<HTMLDivElement>(null)

	const [isVisible1, setIsVisible1] = useState(false)
	const [isVisible2, setIsVisible2] = useState(false)
	const [isVisible3, setIsVisible3] = useState(false)
	const router = useRouter()

	useEffect(() => {
		getAllMentors().then((mentors) => {
			setMentors(rankMentors(mentors))
		})

		const handleScroll = () => {
			function checkVisibility(
				ref: React.RefObject<HTMLDivElement>,
				setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
			) {
				if (
					ref.current &&
					!ref.current.classList.contains(classes.visible)
				) {
					const rect = ref.current.getBoundingClientRect()
					const offset = 700

					const isVisible = rect.top + offset <= window.innerHeight

					if (isVisible) {
						setIsVisible(true)
						ref.current.classList.add(classes.visible)
					}
				}
			}

			checkVisibility(sectionRef1, setIsVisible1)
			checkVisibility(sectionRef2, setIsVisible2)
			checkVisibility(sectionRef3, setIsVisible3)
		}

		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<div className="flex flex-col items-center gap-4">
			<section className={classes.introSection}>
				<div
					className={`${classes.introContent} flex flex-col items-center justify-center fade-in-bottom`}
				>
					<h1>
						Welcome to D<span className="brand-color">EVM</span>
						entor
					</h1>
					<p>
						Overcome challenges, accelerate growth: Connect with
						mentors who make learning seamless and stress-free for
						budding Web3 enthusiasts!
					</p>
					<div className="flex gap-4 justify-center p-4">
						<Button
							onClick={() => {
								router.push("/signup/mentor-signup")
							}}
							filled
						>
							Apply as a mentor
						</Button>
						<Button
							onClick={() => {
								router.push("/signup/mentee-signup")
							}}
							filled
						>
							Join as a mentee
						</Button>
					</div>
				</div>
			</section>

			<section
				className={`${classes.landingSection} ${
					isVisible1 ? classes.visible : ""
				} flex items-center gap-10`}
				ref={sectionRef1}
			>
				<div
					className={`${classes.landingContent} flex flex-col items-center justify-center gap-4`}
				>
					<h2>Become a Mentor</h2>
					<p>
						Share your expertise and guide the next generation of
						web3 developers. Apply to become a mentor, create your
						profile, and start connecting with mentees !
					</p>
					<ul className={classes.modernList}>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-file-alt"></i>
							</span>{" "}
							Submit an application to be reviewed by the
							DEVMentor team.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-user-friends"></i>
							</span>
							Provide a contact method for mentees (e.g., Discord,
							Twitter).
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-star"></i>
							</span>
							Receive ratings and tips after each mentoring
							session.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-trophy"></i>
							</span>
							Earn Mentor Tokens (MTR) for amazing rewards from
							our sponsors.
						</li>
					</ul>
				</div>
				<div className="flex justify-center gap-20 p-4">
					{!!mentors.length && (
						<MentorList mentors={mentors} leaderboardView={true} />
					)}
				</div>
			</section>

			<section
				className={`${classes.landingSection} ${
					isVisible2 ? classes.visible : ""
				} flex items-center gap-10`}
				ref={sectionRef2}
			>
				<div className={classes.landingImgContainer}>
					<Image
						src={menteeProfileImg}
						alt="DEVMentor mentee profile page screenshot"
					/>
				</div>
				<div
					className={`${classes.landingContent} flex flex-col items-center justify-center gap-10`}
				>
					<h2>Join as a Mentee</h2>
					<p>
						Explore a world of knowledge with personalized
						mentorship in web3. Register, request a session, and
						start learning.
					</p>
					<ul className={classes.modernList}>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-clipboard-list"></i>
							</span>
							Easy registration and session request process.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-book-open"></i>
							</span>
							Choose subjects, preferred language, and session
							duration.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-lock"></i>
							</span>
							Option to select a specific mentor by locking funds.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-robot"></i>
							</span>
							Automated service to match with available mentors.
						</li>
					</ul>
				</div>
			</section>

			<section
				className={`${classes.landingSection} ${
					isVisible3 ? classes.visible : ""
				} flex items-center gap-10`}
				ref={sectionRef3}
			>
				<div
					className={`${classes.landingContent} flex flex-col items-center justify-center gap-4`}
				>
					<h2>Rewards & Progression</h2>
					<p>
						Earn tokens, mint badges, and showcase your journey in
						web3 mentorship. Both mentors and mentees are rewarded
						for their participation and growth.
					</p>
					<ul className={classes.modernList}>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-coins"></i>
							</span>
							Both mentors and mentees earn XP tokens.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fa-solid fa-certificate"></i>
							</span>
							Use XP tokens to mint badges showing progression.
						</li>
						<li className={classes.listItem}>
							<span className={classes.icon}>
								<i className="fas fa-unlock-alt"></i>
							</span>
							Unlock new opportunities and recognition within the
							DEVMentor community.
						</li>
					</ul>
				</div>
				<div className={classes.landingImgContainer}>
					<Image
						src={rewardShopImg}
						alt="DEVMentor reward shop page screenshot"
					/>
				</div>
			</section>

			<WavesBackground />
		</div>
	)
}
