import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Link from "next/link";

export default function Home() {
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
					<div className="experience-timeline">
						<h3>2020-Present</h3>
						<p>
							Web Developer, E-commerce Manager
							<span>
								<Link href="/work/newbreedpb" passHref>
									<a>New Breed Paintball & Airsoft</a>
								</Link>
							</span>
						</p>
						<h3>2018-Present</h3>
						<p>
							Web Developer <span>Freelance</span>
						</p>
						<h3>2014-2016</h3>
						<p>
							Web Developer, Digital Marketing Specialist
							<span>
								<Link href="/work/yourpbfriend" passHref>
									<a>YourPbFriend</a>
								</Link>
							</span>
						</p>
						<h3>2013</h3>
						<p>
							Web Designer <span>Freelance</span>
						</p>
					</div>
				</Section>
			</main>
			<Footer />
		</>
	);
}
