import { ReactNode } from "react"
import MentorContextProvider from "./MentorContext"
import MenteeContextProvider from "./MenteeContext"

interface GlobalBlockchainContextProps {
	children: ReactNode
}

export default function GlobalBlockchainContext({
	children
}: GlobalBlockchainContextProps) {
	return (
		<MentorContextProvider>
			<MenteeContextProvider>{children}</MenteeContextProvider>
		</MentorContextProvider>
	)
}
