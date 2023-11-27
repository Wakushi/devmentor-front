import { ReactNode } from "react"
import classes from "./button.module.scss"

interface ButtonProps {
	children: ReactNode
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	filled?: boolean
	cancel?: boolean
}

export default function Button(props: ButtonProps) {
	return (
		<button
			onClick={props.onClick}
			className={`${
				props.filled ? classes.button : classes.button_empty
			} ${props.cancel ? classes.cancel : ""}`}
		>
			{props.children}
		</button>
	)
}
