import classes from "./header.module.scss"
import Button from "@/components/ui/button/button"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "@/services/UserContext"
import Image from "next/image"
import metamask from "@/assets/images/logo/metamask-logo.png"
import { useRouter } from "next/router"
import { getShortenedAddress } from "@/services/utils"
import Burger from "@/components/ui/burger/burger"
import { Properties } from "csstype"
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
	const [displayMiniNav, setDisplayMiniNav] = useState(false)
	const router = useRouter()

	const smallNavStyles: Properties = {
		opacity: displayMiniNav ? "1" : "0",
		transform: displayMiniNav ? "translateY(0%)" : ""
	}

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
		if (walletAddress) {
			isAccountMentee(walletAddress).then((isMentee) => {
				if (isMentee) {
					router.push("/mentee/profile")
				} else {
					isAccountMentor(walletAddress).then((isMentor) => {
						if (isMentor) {
							router.push("/mentor/profile")
						}
					})
				}
			})
		}
	}

	function handleBurgerToggle() {
		setDisplayMiniNav((preDisplayMiniNav) => !preDisplayMiniNav)
	}

	return (
		<header className={classes.header} ref={headerRef}>
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
					<li
						className={classes.nav_link}
						tabIndex={0}
						onClick={goToProfile}
					>
						Profile
					</li>
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
				<Burger handleClick={handleBurgerToggle} />
			</nav>
			<nav
				style={smallNavStyles}
				className={`${classes.small_nav_bar} flex items-center gap-4`}
			>
				<ul className="flex items-center gap-8">
					<li
						className={classes.nav_link}
						tabIndex={0}
						onClick={() => handleConnectionPriorRouting("/create")}
					>
						Register as mentee
					</li>
					<li
						className={classes.nav_link}
						tabIndex={0}
						onClick={() => handleConnectionPriorRouting("/wallets")}
					>
						Register as mentor
					</li>
					<li className={classes.wallet_button}>
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
