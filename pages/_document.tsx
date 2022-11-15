import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>{/* Global <head> code common to all pages */}</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
