import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Section from "../components/Section";
import PositionExperience from "../components/PositionExperience";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio' desc='Isaac "Yak" Litzenberger&apos;s Portfolio' />
			<NavBar />
			<Hero />
			<main className="max-page-width" role="main">
				<Section>
					<h2>About</h2>
					<div id="position-experience">
						<PositionExperience time={3} position="Web Developer" />
						<PositionExperience time={5} position="E-commerce Mgmt" />
						<PositionExperience time={2} position="Digital Marketing" />
					</div>
					<p>I focus on delivering value through usability, maintainability, and integrity. I am seeking work that offers experience with modern web architecture and practices.</p>
				</Section>
				<Section>
					<h2>Skills</h2>
					<div className="skills-container">
						<ul className="skills">
							<h3>Web Tech</h3>
							<li>Next.js</li>
							<li>React.js</li>
							<li>jQuery</li>
							<li>Shopify Liquid</li>
							<li>TailwindCSS</li>
							<li>Bootstrap</li>
							<li>PHP</li>
						</ul>
						<ul className="skills">
							<h3>Tools</h3>
							<li>Git</li>
							<li>NPM</li>
							<li>Scrum</li>
							<li>Figma</li>
							<li>Adobe Photoshop</li>
							<li>Adobe Illustrator</li>
						</ul>
						<ul className="skills">
							<h3>Platforms</h3>
							<li>Vercel</li>
							<li>Shopify</li>
							<li>WooCommerce</li>
							<li>WordPress</li>
							<li>Heroku</li>
							<li>AWS</li>
						</ul>
						<ul className="skills">
							<h3>Marketing</h3>
							<li>SEO</li>
							<li>Facebook/Instagram Ads</li>
							<li>Google Analytics</li>
							<li>Google Console</li>
							<li>Moz Pro</li>
						</ul>
					</div>
				</Section>
				<Section>
					<h2>Experience</h2>
					<div className="experience-timeline">
						<h3>2020-Present</h3>
						<p>
							Web Developer, E-commerce Manager
							<span>
								<Link href="/work/newbreedpb" passHref>
									<a>New Breed Paintball &amp; Airsoft</a>
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
