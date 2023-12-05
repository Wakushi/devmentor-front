import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import classes from "./about.module.scss"
import Image from "next/image"
import tweet from "@/assets/images/screens/tweet.png"
// <span className="brand-color "></span>
export default function About() {
	return (
		<>
			<div
				className={`${classes.container} flex flex-col items-center gap-4 fade-in-bottom-forwards`}
			>
				<h1>About DEVMentor</h1>

				<p>
					This dApp was built as a submission for{" "}
					<a href="https://chain.link/hackathon" target="_blank">
						<span className="brand-color ">
							Chainlink's Constellation 2023 Hackathon
						</span>
					</a>
					, and currently runs on Ethereum Sepolia testnet.{" "}
				</p>

				<p>
					My name is{" "}
					<a href="https://twitter.com/Maxime_ELZ" target="_blank">
						<span className="brand-color ">Maxime</span>
					</a>
					, a french web developer working near Paris, and I'm the
					sole developer of this project.
				</p>

				<div>
					<Image
						className={classes.tweet}
						src={tweet}
						width={500}
						height={300}
						alt="Tweet of @Pashovkrum"
					></Image>
				</div>

				<p>
					DEVMentor is a social-fi dApp designed to connect beginners
					with experienced developers who are eager to teach. This
					connection can be a huge stress relief for beginners and
					guide them on a path to success, especially when paired with
					a learning platform like Updraft. It also allows experienced
					developers to reinforce their knowledge by teaching, share
					their passion and journey, and receive rewards for their
					engagement.
				</p>

				<p></p>
			</div>
			<WavesBackground />
		</>
	)
}
