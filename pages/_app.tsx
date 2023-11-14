import Layout from "@/components/layout/layout"
import UserContextProvider from "@/services/UserContext"
import GlobalBlockchainContext from "@/services/blockchain/GlobalBlockchainContext"
import "@/styles/globals.scss"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<GlobalBlockchainContext>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</GlobalBlockchainContext>
		</UserContextProvider>
	)
}
