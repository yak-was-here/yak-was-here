import "../styles/globals.css";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import BackToTop from "../components/BackToTop";

function MyApp({ Component, pageProps }) {
	usePageViews();

	return (
		<>
			<GoogleAnalytics />
			<BackToTop />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
