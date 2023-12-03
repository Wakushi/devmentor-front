import { useContext, useState } from "react"
import Header from "@/components/layout/header"
import Snackbar from "@/components/ui/snackbar/snackbar"
import { SnackbarContext } from "@/services/SnackbarContext"
import classes from "./layout.module.scss"
import Footer from "./footer"
import TestingMenu from "../testing-menu/testing-menu"

interface LayoutProps {
	children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
	const [isDebugTabOpen, setIsDebugTabOpen] = useState(false)

	const { isSnackbarShowing, snackbarMessageType } =
		useContext(SnackbarContext)

	return (
		<div className={`${classes.layout} flex flex-col justify-between`}>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header />
			<main>{props.children}</main>
			<Footer setIsDebugTabOpen={setIsDebugTabOpen} />
			<TestingMenu
				isDebugTabOpen={isDebugTabOpen}
				setIsDebugTabOpen={setIsDebugTabOpen}
			/>
		</div>
	)
}
