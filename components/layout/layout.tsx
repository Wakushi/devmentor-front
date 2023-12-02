import { useContext } from "react"
import Header from "@/components/layout/header"
import Snackbar from "@/components/ui/snackbar/snackbar"
import { SnackbarContext } from "@/services/SnackbarContext"
import classes from "./layout.module.scss"
import Footer from "./footer"

interface LayoutProps {
	children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
	const { isSnackbarShowing, snackbarMessageType } =
		useContext(SnackbarContext)

	return (
		<div className={`${classes.layout} flex flex-col justify-between`}>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	)
}
