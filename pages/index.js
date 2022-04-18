import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CtaBtn from "../components/CtaBtn";
import Link from "next/link";
import Skill from "../components/Skill";
import { intro } from "../data/meta";

export default function Home() {
	return (
		<>
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s Portfolio' desc="Have a look at yak's portfolio of work details and included resume." />
			<NavBar active="home" />
			<Hero />
			<main className="max-page-width">
				<section>
					<h2>About</h2>
					<div className="intro">
						<p>{intro}</p>
						<p>I am seeking work that offers experience with modern web architecture (Web3) and attempts to solve meaningful problems.</p>
					</div>
				</section>
				<section>
					<h2>Skills</h2>
					<div className="skills-container">
						<ul className="skills">
							<h3>Front end</h3>
							<Skill>Next.js</Skill>
							<Skill>React.js</Skill>
							<Skill q="Liquid">Shopify Liquid</Skill>
							<Skill>TailwindCSS</Skill>
							<Skill>jQuery</Skill>
							<Skill>Bootstrap</Skill>
						</ul>
						<ul className="skills">
							<h3>Back end</h3>
							<Skill>Next.js</Skill>
							<Skill>PHP</Skill>
							<Skill>Node.js</Skill>
							<Skill>Express.js</Skill>
							<Skill>MongoDB</Skill>
						</ul>
						<ul className="skills">
							<h3>Tools</h3>
							<Skill q="Git">Git + GitHub</Skill>
							<Skill>NPM</Skill>
							<Skill>Figma</Skill>
							<Skill>Adobe Photoshop</Skill>
							<Skill>Adobe Illustrator</Skill>
						</ul>
						<ul className="skills">
							<h3>Platforms</h3>
							<Skill>Shopify</Skill>
							<Skill>AWS</Skill>
							<Skill>Vercel</Skill>
							<Skill>Heroku</Skill>
							<Skill>Wordpress</Skill>
							<Skill>WooCommerce</Skill>
						</ul>
						<ul className="skills">
							<h3>Marketing</h3>
							<Skill>SEO</Skill>
							<Skill q="Meta Ads">Meta (Facebook/Instagram) Ads</Skill>
							<Skill>Google Analytics</Skill>
							<Skill>Google Console</Skill>
							<Skill>Moz Pro</Skill>
						</ul>
					</div>
				</section>
				<section>
					<h2>Experience</h2>
					<div className="experience-timeline">
						<h3>2020-Present</h3>
						<p>
							Web Developer, Digital Marketer, E-commerce Manager
							<span>
								<Link href="/work/newbreedpb">
									<a title="View this work experience">New Breed Paintball &amp; Airsoft</a>
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
									<a title="View this work experience">YourPbFriend</a>
								</Link>
							</span>
						</p>
						<h3>2013</h3>
						<p>
							Web Designer <span>Freelance</span>
						</p>
					</div>
				</section>
			</main>
			<Footer>
				<CtaBtn ctaText="Browse work" ctaHref="/work" />
			</Footer>
		</>
	);
}
