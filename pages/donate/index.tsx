import WavesBackground from "@/components/ui/backgrounds/waves/waves-bg"
import classes from "./donate.module.scss"
import { REWARD_MANAGER_CONTRACT_ADDRESS } from "@/services/constants"
import Copy from "@/components/ui/copy/copy"

export default function DonationInfo() {
	return (
		<>
			<div
				className={`${classes.container} page fade-in-bottom-forwards`}
			>
				<h1>Donate to DEVMentor</h1>
				<p className={classes.donationAddress}>
					Donation contract address :{" "}
					{REWARD_MANAGER_CONTRACT_ADDRESS}{" "}
					<Copy contentToCopy={REWARD_MANAGER_CONTRACT_ADDRESS} />
				</p>

				<h2>100% For the Mentors</h2>
				<p>
					Every ETH donated goes directly towards creating a reward
					pool for our mentors. We operate on a non-profit basis for
					donations, ensuring that your generosity directly supports
					those who contribute their knowledge and expertise.
				</p>

				<h2>Donation Process</h2>
				<p>
					We accept donations exclusively in Ethereum (ETH). These
					contributions play a crucial role in sustaining and
					rewarding the mentors who are integral to our platform.
				</p>

				<h2>Why Ethereum (ETH)?</h2>
				<p>
					Ethereum is chosen for its wide accessibility and
					compatibility within the Web3 ecosystem. It facilitates
					seamless, secure transactions on our platform. Although we
					may expand in a V2 to support other tokens.
				</p>

				<h2>Security and Transparency</h2>
				<p>
					The integrity and transparency of the donation process are
					paramount. All transactions are securely recorded on the
					blockchain, providing clear and immutable records of all
					contributions.
				</p>

				<h2>No Refunds</h2>
				<p>
					Due to the nature of blockchain transactions, we cannot
					offer refunds once a donation is made. Please ensure the
					accuracy of your transaction before proceeding.
				</p>

				<h2>Privacy Assurance</h2>
				<p>
					We respect your privacy. No personal data is collected
					beyond what is necessary for transaction processing. All
					donations are recorded anonymously on the blockchain.
				</p>

				<h2>Support and Inquiries</h2>
				<p>
					For any queries or assistance with the donation process,
					please contact our support team. We are here to help ensure
					your donation experience is smooth and rewarding.
				</p>
			</div>
			<WavesBackground />
		</>
	)
}
