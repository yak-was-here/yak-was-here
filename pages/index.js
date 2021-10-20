import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import ExperienceBrowser from "../components/ExperienceBrowser";
import Section from "../components/Section";
import { getAllExperienceSummaries } from "../lib/experiences";

export default function Home({ expSummaries }) {
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
					<ExperienceBrowser experiences={expSummaries} />
				</Section>
			</main>
			<Footer />
		</>
	);
}

export async function getStaticProps() {
	const expSummaries = getAllExperienceSummaries();
	if (expSummaries) {
		return {
			props: {
				expSummaries,
			},
		};
	}
}
