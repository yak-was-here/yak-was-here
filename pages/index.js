import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio - isaacyakl.com' desc='Isaac "Yak" Litzenberger&apos;s Portfolio'></BaseMeta>
			<NavBar></NavBar>
			<Hero></Hero>
			<main role="main">
				<About></About>
				<Skills></Skills>
				<Experience></Experience>
			</main>
			<Footer></Footer>
		</>
	);
}
