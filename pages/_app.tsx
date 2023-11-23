import Layout from "@/components/layout/layout"
import SnackbarContextProvider from "@/services/SnackbarContext"
import UserContextProvider from "@/services/UserContext"
import BlockchainContextProvider from "@/services/blockchain/BlockchainContext"
import MenteeContextProvider from "@/services/blockchain/MenteeContext"
import MentorContextProvider from "@/services/blockchain/MentorContext"
import SessionContextProvider from "@/services/blockchain/SessionContext"
import "@/styles/globals.scss"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarContextProvider>
			<UserContextProvider>
				<BlockchainContextProvider>
					<MentorContextProvider>
						<MenteeContextProvider>
							<SessionContextProvider>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</SessionContextProvider>
						</MenteeContextProvider>
					</MentorContextProvider>
				</BlockchainContextProvider>
			</UserContextProvider>
		</SnackbarContextProvider>
	)
}
