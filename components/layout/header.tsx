import classes from "./header.module.scss"
import Button from "@/components/ui/button/button"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "@/services/UserContext"
import Image from "next/image"
import metamask from "@/assets/images/logo/metamask-logo.png"
import { useRouter } from "next/router"
import { getShortenedAddress } from "@/services/utils"
import { MenteeContext } from "@/services/blockchain/MenteeContext"
import { MentorContext } from "@/services/blockchain/MentorContext"

export default function Header() {
	const { walletAddress, connectWallet } = useContext(UserContext)
	const { isAccountMentee } = useContext(MenteeContext)
	const { isAccountMentor } = useContext(MentorContext)
	const shortenWalletAddress = walletAddress
		? getShortenedAddress(walletAddress)
		: null
	const headerRef = useRef<HTMLHeadElement | null>(null)

	const [isMentee, setIsMentee] = useState(false)
	const [isMentor, setIsMentor] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (walletAddress) {
			isAccountMentee(walletAddress).then((isMentee) => {
				setIsMentee(isMentee)
			})
			isAccountMentor(walletAddress).then((isMentor) => {
				setIsMentor(isMentor)
			})
		}
	}, [walletAddress])

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
				<div className="logo-img-container">
					{/* <Image
						src={together}
						alt="TogEther Logo"
						width={40}
						height={40}
					/> */}
				</div>
				<div className={classes.logo_text}>
					<span>D</span>
					<span className={classes.logo_special}>EVM</span>
					<span>entor</span>
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
					{!isMentor && (
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
					{(isMentee || isMentor) && (
						<li
							className={classes.nav_link}
							tabIndex={0}
							onClick={goToProfile}
						>
							Profile
						</li>
					)}
					<li>
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
					</li>
				</ul>
			</nav>
		</header>
	)
}
