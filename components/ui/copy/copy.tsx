import classes from "./copy.module.scss"
import { SnackbarContext } from "@/services/SnackbarContext"
import { useContext } from "react"

interface CopyProps {
	contentToCopy: string
}

export default function Copy({ contentToCopy }: CopyProps) {
	const { openSnackBar } = useContext(SnackbarContext)

	function copyToClipboard() {
		navigator.clipboard.writeText(contentToCopy)
		openSnackBar("copy")
	}

	return (
		<i
			className={`${classes.copy_icon} fa-regular fa-copy`}
			onClick={copyToClipboard}
		></i>
	)
}
