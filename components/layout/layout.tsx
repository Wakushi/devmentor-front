import React from "react"
import Header from "@/components/layout/header"
import Snackbar from "@/components/ui/snackbar/snackbar"
import { SnackbarContext } from "@/services/SnackbarContext"
import classes from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
	const { isSnackbarShowing, snackbarMessageType } =
		React.useContext(SnackbarContext)

	return (
		<>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header />
			<main className={classes.main_container}>{props.children}</main>
		</>
	)
}
