import { fName, lName, resumeIntroWebDev, github, linkedin, siteURL, tel, email, nick, location } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink from "./TelLink";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPhone, faPrint, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function ResumeView() {
	let revealObfsdLinks = async (): Promise<void> => {};
	const printResume = () => {
		// Print to PDF in Firefox for best text recognition.
		// Reveal obfuscated contact information before printing/printing to PDF
		revealObfsdLinks().then(() => {
			window.print();
		});
	};

	useEffect(() => {
		revealObfsdLinks = async (): Promise<void> => {
			const obfsdLinks: NodeList = document.querySelectorAll('a[href="https://youtu.be/dQw4w9WgXcQ"');

			for (let i = 0; i < obfsdLinks.length; i++) {
				const obfsdLnk = obfsdLinks[i] as HTMLAnchorElement;
				// @ts-ignore
				obfsdLnk.focus({ preventScroll: true, focusVisible: false }); // focusVisibile is an experimental option so it needed to be ignored by TS https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
			}
		};
	});

	return (
		<div className="resumeBackground">
			<div className="resumeActions dont-print">
				<Link href="/litzenberger-isaac-web-developer-resume.pdf" passHref>
					<button className="link" title="Download">
						<FontAwesomeIcon icon={faDownload} />
					</button>
				</Link>
				<button className="link" title="Print" onClick={printResume}>
					<FontAwesomeIcon icon={faPrint} />
				</button>
			</div>
			<div className="resumePaper">
				<main className="resumeContent">
					<section className="hero">
						<h1>
							{fName} {lName}
						</h1>
						<h2 className="resumeSubtitle">{location}</h2>
					</section>
					<section className="contact-info">
						<ul className="contact-info">
							<li>
								<FontAwesomeIcon icon={faAt} style={{ width: "1em", height: "1em", marginRight: "0.65em", verticalAlign: "middle" }} />
								<EmailLink>{email}</EmailLink>
							</li>

							<li>
								<FontAwesomeIcon icon={faPhone} style={{ width: "1em", height: "1em", marginRight: "0.65em", verticalAlign: "middle" }} />
								<TelLink>{tel}</TelLink>
							</li>
							<li>
								<FontAwesomeIcon icon={faBriefcase} style={{ width: "1em", height: "1em", marginRight: "0.65em", verticalAlign: "middle" }} />
								<a href={siteURL} title="Portfolio">
									isaacyakl.com
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={faGithub} style={{ width: "1em", height: "1em", marginRight: "0.65em", verticalAlign: "middle" }} />
								<a href={github} title="Github profile">
									{github.replace("https://", "")}
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={faLinkedin} style={{ width: "1em", height: "1em", marginRight: "0.65em", verticalAlign: "middle" }} />
								<a href={linkedin} title="Linkedin profile">
									{linkedin.replace("https://", "")}
								</a>
							</li>
						</ul>
					</section>
					<section className="about">
						<h2>About</h2>
						<p>{resumeIntroWebDev}</p>
					</section>
					<section className="section-skills">
						<h2>Skills</h2>
						<ul>
							<Skill absoluteURL={true}>JavaScript</Skill>
							<Skill absoluteURL={true}>TypeScript</Skill>
							<Skill absoluteURL={true}>NextJS</Skill>
							<Skill absoluteURL={true} q="ReactJS">
								React
							</Skill>
							<Skill absoluteURL={true} q="JestJS">
								Jest
							</Skill>
							<Skill absoluteURL={true} q="BabelJS">
								Babel
							</Skill>
							<Skill absoluteURL={true}>Tailwind CSS</Skill>
							<Skill absoluteURL={true}>Shopify</Skill>
							<Skill absoluteURL={true}>Webpack</Skill>
							<Skill absoluteURL={true} q="HandlebarsJS">
								Handlebars
							</Skill>
							<Skill absoluteURL={true}>Vercel</Skill>
							<Skill absoluteURL={true}>Bootstrap</Skill>
							<Skill absoluteURL={true}>HTML</Skill>
							<Skill absoluteURL={true}>CSS</Skill>
							<Skill absoluteURL={true} q="CSS">
								SASS
							</Skill>
							<Skill absoluteURL={true}>Git</Skill>
							<Skill absoluteURL={true}>GitHub</Skill>
							<Skill absoluteURL={true}>NPM</Skill>
							<Skill absoluteURL={true}>PHP</Skill>
							<Skill absoluteURL={true}>Python</Skill>
							<Skill absoluteURL={true}>C++</Skill>
							<Skill absoluteURL={true} q="Discord">
								Discord API
							</Skill>
							<Skill absoluteURL={true} q="Twitch">
								Twitch API
							</Skill>
							<Skill absoluteURL={true}>Figma</Skill>
							<Skill absoluteURL={true}>REST</Skill>
							<Skill absoluteURL={true}>SEO</Skill>
							<Skill absoluteURL={true} q="Adobe">
								Adobe Apps
							</Skill>
						</ul>
					</section>
					<div className="section-work">
						<section className="section-experience">
							<h2>Experience</h2>
							<div className="resume-work-entry">
								<strong>Web Developer &amp; Digital Marketer</strong>
								<br />
								New Breed Paintball and Airsoft | <em>08/2020 - Present</em>
								<ul>
									<li>Programmed industry-leading, trade-in web application</li>
									<li>Automated structured data generation with JavaScript</li>
									<li>Generated average monthly revenue of $2,000+</li>
									<li>Increased domain authority by 33% through SEO tasks</li>
									<li>Wrote industry specific blogs and reviews</li>
									<li>Created ecommerce SOPs for training and workflow optimization</li>
								</ul>
								<strong>Key Achievement:</strong> Developed website features to save $100s/mo in third-party application subscriptions
							</div>
							<div className="resume-work-entry">
								<strong>Web Developer &amp; Digital Marketer</strong>
								<br />
								YourPbFriend | <em>03/2014 - 08/2016</em>
								<ul>
									<li>Increased revenue 10x in 2 years by switching to the Shopify platform</li>
									<li>Identified key areas to successfully improve over competitors</li>
									<li>Created a used gun rating system to successfully build buyer trust</li>
									<li>Embedded YouTube content to educate and create value for customers</li>
									<li>Created ecommerce SOPs for training and workflow optimization</li>
								</ul>
								<strong>Key Achievement:</strong> Developed the #1 most-used paintball trade-in web application of 2015-2016
							</div>
						</section>
						<section className="section-projects">
							<h2>Projects</h2>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/isaacyakl.com">
									<strong>Portfolio - isaacyakl.com</strong>
								</Link>
								<ul>
									<li>Portfolio built with NextJS using TypeScript</li>
									<li>Includes web-based resume</li>
									<li>Experiments with relative css units instead of breakpoints</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/remote-jackbox-player">
									<strong>Remote Jackbox Player</strong>
								</Link>
								<ul>
									<li>Web app to find and play Jackbox games remotely and for free</li>
									<li>Uses Twitch API to find people streaming games</li>
									<li>Mobile focused design with multiple viewing formats built with Tailwind CSS and JS</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/brandojs">
									<strong>bRando.js</strong>
								</Link>
								<ul>
									<li>A CSS background randomizer with support for images, colors, and gradients</li>
									<li>Utilizes image preloading</li>
									<li>Minified and published to NPM and CDN</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/fairhaven-bc-vbs-2019-soundboard">
									<strong>Keyboard Soundboard</strong>
								</Link>
								<ul>
									<li>A web browser soundboard with preset keybinds and preloaded sound files</li>
									<li>Uses JavaScript to play and stop audio elements</li>
									<li>Animates buttons when triggered</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/random-owen-wowson">
									<strong>Random Owen Wowson</strong>
								</Link>
								<ul>
									<li>A python Discord bot for sending random Owen Wilson &quot;wow&quot; movie clips</li>
									<li>Makes use of the open-source Owen Wilson Wow API</li>
									<li>Includes a small HTTP status server</li>
								</ul>
							</div>
						</section>
					</div>
					<section className="section-education">
						<h2>Education</h2>
						<ul>
							<li>
								2020 &mdash;{" "}
								<strong>
									Bachelor of Science in Business Administration,
									<br />
									General Management <em>(Dean&apos;s List)</em>
								</strong>
								<br />
								CSU East Bay
							</li>
						</ul>
					</section>
					<section className="section-courses">
						<h2>Courses</h2>
						<ul className="courses">
							<li>
								<strong>Computer Science I &amp; II</strong>
								<br />
								CSU San Marcos
							</li>
							<li>
								<strong>Front-End Nanodegree</strong>
								<br />
								Grow w/ Google
							</li>
							<li>
								<strong>The Web Developer Bootcamp</strong>
								<br />
								udemy.com
							</li>
							<li>
								<strong>React For Beginners</strong>
								<br />
								wesbos.com
							</li>
							<li>
								<strong>Developing Innovative Ideas for New Companies</strong>
								<br />
								The University of Maryland
							</li>
						</ul>
					</section>
				</main>
			</div>
		</div>
	);
}

export default ResumeView;
