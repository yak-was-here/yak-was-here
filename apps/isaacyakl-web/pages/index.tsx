import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import PageFooter from "../components/PageFooter";
import About from "../components/About";
import Links from "../components/Links";
export default function Home() {
	return (
		<>
			<BaseMeta />
			<NavBar active="home" />
			<Hero />
			<main>
				<section>
					<About showHeading={true} />
				</section>
				<Links showHeading={true} />
			</main>
			<PageFooter />
		</>
	);
}
