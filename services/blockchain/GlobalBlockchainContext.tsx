import { ReactNode } from "react"
import MentorContextProvider from "./MentorContext"
import MenteeContextProvider from "./MenteeContext"
import BlockchainContextProvider from "./BlockchainContext"

interface GlobalBlockchainContextProps {
	children: ReactNode
}

export default function GlobalBlockchainContext({
	children
}: GlobalBlockchainContextProps) {
	return (
		<BlockchainContextProvider>
			<MentorContextProvider>
				<MenteeContextProvider>{children}</MenteeContextProvider>
			</MentorContextProvider>
		</BlockchainContextProvider>
	)
}
