import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import ExperienceBrowser from "../components/ExperienceBrowser";
import Section from "../components/Section";

export default function Home() {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio' desc='Isaac "Yak" Litzenberger&apos;s Portfolio' />
			<NavBar />
			<Hero />
			<main role="main">
				<About />
				<Skills />
				<Section>
					<h2>Experience</h2>
					<ExperienceBrowser />
				</Section>
			</main>
			<Footer />
		</>
	);
}
