import classes from "./header.module.scss"
import Button from "@/components/ui/button/button"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "@/services/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { getShortenedAddress } from "@/services/utils"
import { MenteeContext } from "@/services/blockchain/MenteeContext"
import { MentorContext } from "@/services/blockchain/MentorContext"
import { BlockchainContext } from "@/services/blockchain/BlockchainContext"
import logo from "@/assets/images/logo/logo.png"
import ProfileCard from "../profile-card/profile-card"
import { Badge, RewardContext } from "@/services/blockchain/RewardContext"
import metamask from "@/assets/images/logo/metamask-logo.png"

export default function Header() {
	const { walletAddress, connectWallet } = useContext(UserContext)
	const { isAccountMentee } = useContext(MenteeContext)
	const { isAccountMentor } = useContext(MentorContext)
	const { isWaitingForTransaction } = useContext(BlockchainContext)
	const {
		getUserXp,
		getMentorTokenAmount,
		getUserBadgeUri,
		getUserNextBadgeUri
	} = useContext(RewardContext)
	const shortenWalletAddress = walletAddress
		? getShortenedAddress(walletAddress)
		: null
	const headerRef = useRef<HTMLHeadElement | null>(null)

	const [isMentee, setIsMentee] = useState(false)
	const [isMentor, setIsMentor] = useState(false)
	const [userXp, setUserXp] = useState<number>(0)
	const [mentorTokens, setMentorTokens] = useState<number>(0)
	const [userBadge, setUserBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})
	const [userNextBadge, setUserNextBadge] = useState<Badge>({
		id: 0,
		name: "",
		image: "",
		description: "",
		cost: 0
	})
	const router = useRouter()

	useEffect(() => {
		if (walletAddress) {
			isAccountMentee(walletAddress).then((isMentee) => {
				setIsMentee(isMentee)
				isAccountMentor(walletAddress).then((isMentor) => {
					setIsMentor(isMentor)
					getUserXp(walletAddress).then((xp) => {
						setUserXp(parseInt(xp))
					})
					getMentorTokenAmount(walletAddress).then((tokens) => {
						setMentorTokens(tokens)
					})
					getUserBadgeUri(walletAddress).then((badgeUri) => {
						if (!badgeUri) return
						fetch(badgeUri)
							.then((response) => {
								return response.json()
							})
							.then(({ id, name, image, description }) => {
								setUserBadge({
									id,
									name: name,
									image: image,
									description: description,
									cost: 0
								})
							})
					})
					getUserNextBadgeUri(
						walletAddress,
						isMentor ? "mentor" : "mentee"
					).then((nextBadgeUri) => {
						if (!nextBadgeUri) return
						fetch(nextBadgeUri.tokenUri)
							.then((response) => {
								return response.json()
							})
							.then(({ id, name, image, description }) => {
								setUserNextBadge({
									id,
									name,
									image,
									description,
									cost: nextBadgeUri.badgeXpCost
								})
							})
					})
				})
			})
		}
	}, [walletAddress, isWaitingForTransaction])

	useEffect(() => {
		const handleScroll = () => {
			if (!headerRef.current) return
			if (window.scrollY > 0) {
				headerRef.current.classList.add(classes.header_scrolled)
			} else {
				headerRef.current.classList.remove(classes.header_scrolled)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	})

	async function handleConnectionPriorRouting(route: string) {
		if (!walletAddress) {
			const account = await connectWallet()
			if (account) {
				router.push(route)
			}
		} else {
			router.push(route)
		}
	}

	function goToProfile() {
		router.push(isMentee ? "/mentee/profile" : "/mentor/profile")
	}

	return (
		<header className={`${classes.header} fade-in-top`} ref={headerRef}>
			<div
				className={`${classes.logo_container} flex items-center cursor-pointer`}
				onClick={() => {
					router.push("/")
				}}
			>
				<Image src={logo} alt="logo" width={50} height={50} />

				<div className={classes.logo_text}>
					D<span className={classes.logo_special}>EVM</span>entor
				</div>
			</div>
			<nav className={`${classes.nav_bar} flex items-center gap-4`}>
				<ul className="flex items-center gap-14">
					{!isMentee && !isMentor && (
						<li
							className={classes.nav_link}
							tabIndex={0}
							onClick={() =>
								handleConnectionPriorRouting(
									"/signup/mentee-signup"
								)
							}
						>
							Register as mentee
						</li>
					)}
					{!isMentor && !isMentee && (
						<li
							className={classes.nav_link}
							tabIndex={0}
							onClick={() =>
								handleConnectionPriorRouting(
									"/signup/mentor-signup"
								)
							}
						>
							Register as mentor
						</li>
					)}
					{!isMentor && isMentee && (
						<li
							className={classes.nav_link}
							tabIndex={0}
							onClick={() =>
								handleConnectionPriorRouting(
									"/mentee/session-form"
								)
							}
						>
							Open session
						</li>
					)}
					{isMentor && (
						<li
							className={classes.nav_link}
							tabIndex={0}
							onClick={() =>
								handleConnectionPriorRouting("/shop")
							}
						>
							Rewards
						</li>
					)}

					<li
						className={classes.nav_link}
						tabIndex={0}
						onClick={() => router.push("/about")}
					>
						About
					</li>

					<li>
						{walletAddress && (isMentee || isMentor) ? (
							<ProfileCard
								userAddress={walletAddress}
								badge={userBadge}
								nextBadge={userNextBadge}
								xp={userXp}
								mentorTokens={mentorTokens}
								mentorView={isMentor}
								onClick={goToProfile}
							/>
						) : (
							<Button onClick={connectWallet} filled={true}>
								{walletAddress ? (
									<>
										<Image
											src={metamask}
											alt="Metamask Logo"
											width={40}
											height={40}
										/>{" "}
										{shortenWalletAddress}
									</>
								) : (
									"Connect wallet"
								)}
							</Button>
						)}
					</li>
				</ul>
			</nav>
		</header>
	)
}
