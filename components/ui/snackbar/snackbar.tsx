import classes from "./snackbar.module.scss"

export default function Snackbar({ snackbarMessageType }: any) {
	function getMessage(): string {
		switch (snackbarMessageType) {
			case "copy":
				return "Copied to clipboard"

			case "lowBalance":
				return "Wallet's balance is too low"

			case "installMetamask":
				return "Please install Metamask"

			case "transactionRejected":
				return "Transaction rejected"

			case "error":
				return "Something went wrong"

			case "cancelledRequest":
				return "Request cancelled"

			case "tipSent":
				return "Tip successfully sent !"

			case "menteeConfirmedSession":
				return "Session confirmed !"

			case "mentorConfirmedSession":
				return "Session confirmed !"

			case "sessionNotFinished":
				return "Session engagement not finished yet !"

			case "requestOpened":
				return "Session request opened !"

			case "xpGained":
				return "XP gained !"

			case "badgeMinted":
				return "New badge minted !"

			case "rewardClaimed":
				return "Reward claimed !"

			case "rewardRedeemed":
				return "Reward redeemed !"

			case "contactUpdate":
				return "Contact will be updated shortly !"

			case "engagementUpdate":
				return "Engagement will be updated shortly !"

			case "sessionCantBeCancelled":
				return "You can't cancel this session yet !"

			case "notEnoughTokens":
				return "You don't have enough tokens to claim this reward"

			case "applicationSent":
				return "Your application has been sent !"

			default:
				return ""
		}
	}

	return (
		<div className={classes.snackbar_container}>
			<p> {getMessage()} </p>
		</div>
	)
}
