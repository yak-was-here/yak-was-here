import "../styles/globals.css";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }) {
	usePageViews();

	return (
		<>
			<GoogleAnalytics />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
