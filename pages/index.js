import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CtaBtn from "../components/CtaBtn";
import { intro } from "../data/meta";

export default function Home() {
	return (
		<>
			<BaseMeta />
			<NavBar active="home" />
			<Hero />
			<main className="max-page-width">
				<section>
					<h2>About</h2>
					<div className="intro">
						<p>{intro}</p>
					</div>
					<CtaBtn text="Browse work" href="/work" />
				</section>
			</main>
			<Footer />
		</>
	);
}
