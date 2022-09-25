import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import BackToTop from "../components/BackToTop";

export default function MyApp({ Component, pageProps }: AppProps) {
	usePageViews();

	return (
		<>
			<GoogleAnalytics />
			<BackToTop />
			<Component {...pageProps} />
		</>
	);
}
