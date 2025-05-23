import "../styles/globals.css";
import { Bebas_Neue } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import BackToTop from "../components/BackToTop";

const bebasNeue = Bebas_Neue({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	usePageViews();

	return (
		<>
			<GoogleAnalytics />
			<BackToTop />
			<style jsx global>{`
				:root {
					--font-family-headings: ${bebasNeue.style.fontFamily}, "Arial Narrow", Arial, Helvetica, sans-serif;
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}
