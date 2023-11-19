import { ReactNode } from "react"
import classes from "./waiting-modal.module.scss"
import Loader from "@/components/ui/loader/loader"

interface WaitingModalProps {
	children: ReactNode
}

export default function WaitingModal(props: WaitingModalProps) {
	return (
		<div className={classes.modal_container}>
			<div className={classes.modal_inner}>
				{props.children}
				<Loader />
			</div>
		</div>
	)
}
