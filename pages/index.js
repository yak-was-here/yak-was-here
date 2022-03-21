import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Section from "../components/Section";
import CtaBtn from "../components/CtaBtn";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio' desc="Have a look at yak's portfolio of work details and included resume." />
			<NavBar active="home" />
			<Hero />
			<main className="max-page-width" role="main">
				<Section>
					<h2>About</h2>
					<p>I am a self-taught web developer based out of the San Francisco Bay Area. My experience is primarily in Javascript (ES10) frontend development, and much of my work is comprised of vanilla JS or React.js/Next.js. I also have experience with SEO, digital marketing, and design principles.</p>
					<p>I focus on delivering value through usability, maintainability, and integrity. I am seeking work that offers experience with modern web architecture and practices.</p>
				</Section>
				<Section>
					<h2>Skills</h2>
					<div className="skills-container">
						<ul className="skills">
							<h3>Frontend</h3>
							<li>React.js</li>
							<li>Next.js</li>
							<li>Shopify Liquid</li>
							<li>jQuery</li>
							<li>Bootstrap</li>
							<li>TailwindCSS</li>
						</ul>
						<ul className="skills">
							<h3>Backend</h3>
							<li>Next.js</li>
							<li>Node.js</li>
							<li>PHP</li>
						</ul>
						<ul className="skills">
							<h3>Tools</h3>
							<li>Git / GitHub</li>
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
							Web Developer, Digital Marketer, E-commerce Manager
							<span>
								<Link href="/work/newbreedpb">
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
							Web Developer, Digital Marketer
							<span>
								<Link href="/work/yourpbfriend">
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
			<Footer>
				<CtaBtn ctaText="Browse work" ctaHref="/work" />
			</Footer>
		</>
	);
}
