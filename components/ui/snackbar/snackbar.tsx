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

			case "error":
				return "Something went wrong"

			case "cancelledRequest":
				return "Request cancelled"

			case "tipSent":
				return "Tip successfully sent !"

			case "menteeConfirmedSession":
				return "Session confirmed !"

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
