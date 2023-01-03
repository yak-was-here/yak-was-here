import Link from "next/link";
import BaseMeta from "../components/BaseMeta";
import ContactIcons from "../components/ContactIcons";
import NavBar from "../components/NavBar";
import { fName, lName, nick, tagline } from "../data/meta";

export default function More() {
	return (
		<div className="more-background">
			<BaseMeta title={`Links to ${nick}'s businesses, projects, and more.`} desc={`Browse a list of ${nick}'s businesses, projects, and more.`} />
			<NavBar active="more" />
			<main className="max-page-width more">
				<section>
					<h1>
						{fName} &quot;{nick}&quot; {lName}
					</h1>
					<p className="subtitle">{tagline}</p>
				</section>
				<section className="more-link-container">
					<Link href="/" className="btn cta more-links">
						My Website
					</Link>
					<Link href="https://open.spotify.com/user/izacktheyak/playlists" className="btn cta more-links">
						Spotify Playlists
					</Link>
					<Link href="https://nsfpgaming.com" className="btn cta more-links">
						NSFP Gaming
					</Link>
				</section>
				<section>
					<ContactIcons />
				</section>
				<section className="copyright">
					<p>
						&copy; {new Date().getFullYear()} {fName} {lName} &mdash; All rights reserved.
					</p>
				</section>
			</main>
		</div>
	);
}
