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
