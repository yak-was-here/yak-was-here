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
					<p>I am a self-taught web developer with experience designing and developing e-commerce websites and web application user interfaces (UI). My work has illustrated the ability to successfully identify and create competitive business solutions that produce measurable results. Outside of software development, these solutions often involve knowledge of SEO, digital marketing, business management, and design principles. I believe high quality results are produced by team collaboration, integrity, and solutions that focus on user experience (UX), competitive differentiation, and a minimum viable product.</p>
					<p>I am seeking work that offers experience with modern web architecture (Web3) and attempts to solve meaningful problems.</p>
				</Section>
				<Section>
					<h2>Skills</h2>
					<div className="skills-container">
						<ul className="skills">
							<h3>Front end</h3>
							<li>Next.js</li>
							<li>React.js</li>
							<li>Shopify Liquid</li>
							<li>TailwindCSS</li>
							<li>jQuery</li>
							<li>Bootstrap</li>
						</ul>
						<ul className="skills">
							<h3>Back end</h3>
							<li>Next.js</li>
							<li>PHP</li>
							<li>Node.js</li>
							<li>Express.js</li>
							<li>MongoDB</li>
						</ul>
						<ul className="skills">
							<h3>Tools</h3>
							<li>Git + GitHub</li>
							<li>NPM</li>
							<li>Figma</li>
							<li>Adobe Photoshop</li>
							<li>Adobe Illustrator</li>
						</ul>
						<ul className="skills">
							<h3>Platforms</h3>
							<li>Shopify</li>
							<li>AWS</li>
							<li>Vercel</li>
							<li>Heroku</li>
							<li>WordPress</li>
							<li>WooCommerce</li>
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
