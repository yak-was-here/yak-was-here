import Head from "next/head";
import PropTypes from "prop-types";

function BaseMeta({ title, desc, absoluteURL, robots, googlebot, author }) {
	return (
		<Head>
			{/* Next.js already adds <meta charset="utf-8"/> */}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>{title}</title>
			<meta name="theme-color" content="#03C03C" />
			{/*Theme Color for Chrome, Firefox OS and Opera*/}
			<meta name="description" content={desc} />
			<meta name="robots" content={robots} />
			<meta name="googlebot" content={googlebot} />
			<meta name="author" content={author} />

			{/* Fonts */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,400&display=swap" rel="stylesheet" />

			{/* Favicons */}
			{/* Source: https://github.com/audreyfeldroy/favicon-cheat-sheet */}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#03c03c" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
			<meta name="theme-color" content="#000000" />
			{/* Source: https://realfavicongenerator.net/favicon_result?file_id=p1fap77nug1fdj1rdl1f447ld93g6#.YPJMAuhKguU */}
			<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
			<meta name="application-name" content="yak's Website" />
			<meta name="msapplication-tooltip" content="Tooltip" />
			<meta name="msapplication-config" content="/browserconfig.xml" />

			{/* Social Media Meta Tags */}
			{/* Source: https://megatags.co/#generate-tags */}
			{/* Search Engines */}
			<meta name="description" content={desc} />
			<meta name="image" content="https://isaacyakl.com/yak-social-image.jpg" />
			{/* Schema.org for Google */}
			<meta itemProp="name" content={title} />
			<meta itemProp="description" content={desc} />
			<meta itemProp="image" content="https://isaacyakl.com/yak-social-image.jpg" />
			{/* Twitter  */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={desc} />
			<meta name="twitter:creator" content="@isaacyakl" />
			<meta name="twitter:image:src" content="https://isaacyakl.com/yak-social-image.jpg" />
			{/* Open Graph general (Facebook, Pinterest & Google+)  */}
			<meta name="og:title" content={title} />
			<meta name="og:description" content={desc} />
			<meta name="og:image" content="https://isaacyakl.com/yak-social-image.jpg" />
			<meta name="og:url" content={absoluteURL} />
			<meta name="og:site_name" content='Isaac  "Yak" Litzenberger&apos;s Website' />
			<meta name="og:type" content="website" />
		</Head>
	);
}

BaseMeta.defaultProps = {
	title: "Isaac  &quot;Yak&quot; Litzenberger&apos;s Website - isaacyakl.com",
	desc: "yak&apos;s personal website.",
	absoluteURL: "https://isaacyakl.com/",
	robots: "index,follow",
	googlebot: "index,follow",
	author: "Isaac &quot;Yak&quot; L.",
};

BaseMeta.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	absoluteURL: PropTypes.string,
	robots: PropTypes.string,
	googlebot: PropTypes.string,
	author: PropTypes.string,
};

export default BaseMeta;
