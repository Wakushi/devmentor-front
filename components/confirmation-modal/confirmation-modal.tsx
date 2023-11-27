import { MouseEvent, ReactNode } from "react"
import classes from "./confirmation-modal.module.scss"

interface ConfirmationModalProps {
	children: ReactNode
	setIsConfirmationModalOpen(isOpen: boolean): void
}

export default function ConfirmationModal({
	children,
	setIsConfirmationModalOpen
}: ConfirmationModalProps) {
	return (
		<div
			id="modal-container"
			className={classes.modal_container}
			onClick={(event: MouseEvent<HTMLElement>) => {
				if (
					event.target instanceof HTMLElement &&
					event.target.id !== "modal-container"
				)
					return
				setIsConfirmationModalOpen(false)
			}}
		>
			<div className={classes.modal_inner}>{children}</div>
		</div>
	)
}
