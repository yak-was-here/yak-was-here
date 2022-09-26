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
						{fName} "{nick}" {lName}
					</h1>
					<p>{tagline}</p>
				</section>
				<section className="more-link-container">
					<Link href="/">
						<a className="btn cta more-links">My Website</a>
					</Link>
					<Link href="/digital-marketing-services">
						<a className="btn cta cta-arrow more-links">Hire Me</a>
					</Link>
					<Link href="https://open.spotify.com/user/izacktheyak/playlists">
						<a className="btn cta more-links">Spotify Playlists</a>
					</Link>
					<Link href="https://nsfpgaming.com">
						<a className="btn cta more-links">NSFP Gaming</a>
					</Link>
					<Link href="https://www.instagram.com/iamaliveinchrist/">
						<a className="btn cta more-links">Alive in Christ Apparel</a>
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
