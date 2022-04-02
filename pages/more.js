import Link from "next/link";
import BaseMeta from "../components/BaseMeta";
import ContactIcons from "../components/ContactIcons";
import NavBar from "../components/NavBar";
import Section from "../components/Section";

export default function More() {
	const title = "Isaac Litzenberger";
	const tagline = 'Web Developer | "Yak"';

	return (
		<div style={{ backgroundImage: "url('/img/isaacyakl-hero-background-4k.jpg')", backgroundSize: "cover", backgroundAttachment: "fixed", minHeight: "100vh" }}>
			<BaseMeta title="Links to Yak's businesses, projects, and more." desc="Browse a list of Yak's businesses, projects, and more." />
			<NavBar active="more" />
			<main className="max-page-width" role="main" style={{ textAlign: "center" }}>
				<Section>
					<h1>{title}</h1>
					<p>{tagline}</p>
				</Section>
				<Section style={{ margin: "auto", maxWidth: `${title.length + 2}rem`, display: "grid", gridTemplateColumns: "1fr" }}>
					<Link href="/">
						<a className="btn cta more-links">Yak&apos;s Portfolio</a>
					</Link>
					<Link href="https://iamaliveinchrist.com">
						<a className="btn cta more-links">Alive in Christ Apparel</a>
					</Link>
					<Link href="https://open.spotify.com/user/izacktheyak/playlists">
						<a className="btn cta more-links">Spotify Playlists</a>
					</Link>
					<Link href="http://nsfpgaming.com">
						<a className="btn cta more-links">NSFP Gaming</a>
					</Link>
				</Section>
				<Section>
					<ContactIcons />
				</Section>
				<Section style={{ fontSize: "small" }}>
					<p>&copy; {new Date().getFullYear()} Isaac Litzenberger &mdash; All rights reserved.</p>
				</Section>
			</main>
		</div>
	);
}
