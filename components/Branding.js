import Link from "next/link";

const Branding = () => {
	return (
		<div className="branding-container">
			<Link href="/" passHref>
				<a>
					<img src="/img/yak-logo.svg" alt="yak Logo" title="Home" className="logo" />
					<span className="site-wordmark">Yak</span>
				</a>
			</Link>
		</div>
	);
};

export default Branding;
