import Link from "next/link";
import BaseMeta from "../components/BaseMeta";
import ContactIcons from "../components/ContactIcons";
import NavBar from "../components/NavBar";
import { fName, lName, tagline } from "../data/meta";

export default function More() {
	return (
		<div className="more-background">
			<BaseMeta title="Links to Yak's businesses, projects, and more." desc="Browse a list of Yak's businesses, projects, and more." />
			<NavBar active="more" />
			<main className="max-page-width more">
				<section>
					<h1>
						{fName}&nbsp;{lName}
					</h1>
					<p>{tagline}</p>
				</section>
				<section className="more-link-container" style={{ maxWidth: `${fName.length + lName.length + 3}rem` }}>
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
				</section>
				<section>
					<ContactIcons />
				</section>
				<section className="copyright">
					<p>&copy; {new Date().getFullYear()} Isaac Litzenberger &mdash; All rights reserved.</p>
				</section>
			</main>
		</div>
	);
}
