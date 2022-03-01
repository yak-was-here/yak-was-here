import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import WorkBrowser from "../components/WorkBrowser";
import Section from "../components/Section";

export default function Home({ workSummaries }) {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio' desc='Isaac "Yak" Litzenberger&apos;s Portfolio' />
			<NavBar />
			<Hero />
			<main className="max-page-width" role="main">
				<About />
				<Skills />
				<Section>
					<h2>Experience</h2>
					<h6>
						<strong>2020-Present</strong> &mdash; Ecommerce Manager / Web Developer &mdash; New Breed Paintball & Airsoft
					</h6>
					<h6>
						<strong>2018-Present</strong> &mdash; Web Developer (Freelance)
					</h6>
					<h6>
						<strong>2014-2016</strong> &mdash; Digital Marketing Specialist / Web Developer &mdash; YourPbFriend
					</h6>
					<h6>
						<strong>2013</strong> &mdash; Web Designer (Freelance)
					</h6>
				</Section>
			</main>
			<Footer />
		</>
	);
}
