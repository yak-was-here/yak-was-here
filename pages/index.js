import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CtaBtn from "../components/CtaBtn";
import About from "../components/About";

export default function Home() {
	return (
		<>
			<BaseMeta />
			<NavBar active="home" />
			<Hero />
			<main className="max-page-width">
				<section>
					<About />
					<CtaBtn text="Browse work" href="/work" />
				</section>
			</main>
			<Footer />
		</>
	);
}
