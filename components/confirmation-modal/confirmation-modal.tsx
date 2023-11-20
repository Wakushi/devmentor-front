import { MouseEvent, ReactNode } from "react"
import classes from "./confirmation-modal.module.scss"

interface ConfirmationModalProps {
	children: ReactNode
	outsideClickHandler?: (event: MouseEvent<HTMLElement>) => void
}

export default function ConfirmationModal({
	children,
	outsideClickHandler
}: ConfirmationModalProps) {
	return (
		<div
			id="modal-container"
			className={classes.modal_container}
			onClick={outsideClickHandler}
		>
			<div className={classes.modal_inner}>{children}</div>
		</div>
	)
}
