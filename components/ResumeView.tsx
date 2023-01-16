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
				<Link href="/litzenberger-isaac-resume.pdf" passHref>
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
							<Skill absoluteURL={true}>Shopify</Skill>
							<Skill absoluteURL={true}>Webpack</Skill>
							<Skill absoluteURL={true} q="HandlebarsJS">
								Handlebars
							</Skill>
							<Skill absoluteURL={true}>Git</Skill>
							<Skill absoluteURL={true}>GitHub</Skill>
							<Skill absoluteURL={true}>NPM</Skill>
							<Skill absoluteURL={true}>Vercel</Skill>
							<Skill absoluteURL={true}>Bootstrap</Skill>
							<Skill absoluteURL={true}>HTML</Skill>
							<Skill absoluteURL={true}>CSS</Skill>
							<Skill absoluteURL={true} q="CSS">
								SCSS
							</Skill>
							<Skill absoluteURL={true}>Tailwind CSS</Skill>
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
							<Skill absoluteURL={true}>SEM</Skill>
							<Skill absoluteURL={true}>SMM</Skill>
							<Skill absoluteURL={true} q="Adobe">
								Adobe Apps
							</Skill>
						</ul>
					</section>
					<div className="section-work">
						<section className="section-experience">
							<h2>Experience</h2>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>Web Developer & E-commerce Manager</h3>
									<div>08/2020 - Present</div>
								</div>
								<h4>New Breed Paintball and Airsoft &mdash; Remote</h4>
								<ul>
									<li>
										<u>Developed website features; saved $100s/mo in 3rd-party app subs</u>
									</li>
									<li>Coded industry-leading, trade-in web app; mitigated follow-up clarification</li>
									<li>Automated structured data generation; improved Google results</li>
									<li>Performed SEO tasks; increased clicks 400% and impressions 600%</li>
									<li>Generated average monthly revenue of $2,000+</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>JavaScript</li>
									<li>Shopify Liquid</li>
									<li>JSON</li>
									<li>PHP</li>
									<li>Git</li>
									<li>Adobe Apps</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>Web Developer</h3>
									<div>03/2014 - 08/2016</div>
								</div>
								<h4>YourPbFriend &mdash; Fremont, CA</h4>
								<ul>
									<li>
										<u>Wrote the #1 most-used paintball trade-in web app of 2015-2016</u>
									</li>
									<li>Identified key website improvements; became #2 online paintball store</li>
									<li>Embedded YouTube content to educate and create value for customers</li>
									<li>Increased revenue 10x in 2 years by utilizing the Shopify ecosystem</li>
									<li>Created a used-gun, rating system calculator; increased buyer trust</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>jQuery</li>
									<li>Shopify Liquid</li>
									<li>Bootstrap</li>
									<li>PHP</li>
									<li>Adobe Apps</li>
								</ul>
							</div>
						</section>
						<section className="section-projects">
							<h2>Projects</h2>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>
										<Link href="https://github.com/isaacyakl/brandojs">bRando.js</Link> &mdash; Website Background Randomizer Library
									</h3>
									<div></div>
								</div>
								<ul>
									<li>Automatically changes CSS backgrounds on any DOM element</li>
									<li>
										Published on <Link href="https://www.npmjs.com/package/brandojs">NPM</Link>; downloaded hundreds of times per week
									</li>
									<li>100% code coverage and API documentation</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>TypeScript</li>
									<li>Jest</li>
									<li>Webpack</li>
									<li>Babel</li>
									<li>Git</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>
										<Link href="https://github.com/isaacyakl/isaacyakl.com">isaacyakl.com</Link> &mdash; Personal Website
									</h3>
									<div></div>
								</div>
								<ul>
									<li>Features a portfolio, web-based resume, and blog</li>
									<li>Work entires generated statically using remark.js and gray-matter</li>
									<li>Experiments with relative css units instead of breakpoints</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>NextJS</li>
									<li>TypeScript</li>
									<li>React</li>
									<li>TSX/JSX</li>
									<li>YAML</li>
									<li>Git</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>
										<Link href="https://github.com/isaacyakl/remote-jackbox-player">Remote Jackbox Player</Link> &mdash; Single-screen Jackbox Interface
									</h3>
									<div></div>
								</div>
								<ul>
									<li>Mobile-first web app to find and play Jackbox games remotely for free</li>
									<li>Simultaneously watch a stream and use Jackbox.tv on one screen</li>
									<li>Uses Twitch API to find channels streaming Jackbox games</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>JavaScript</li>
									<li>Babel</li>
									<li>Tailwind CSS</li>
									<li>Twitch API</li>
									<li>JSON</li>
									<li>Git</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<div className="resume-work-details">
									<h3>
										<Link href="https://github.com/isaacyakl/random-owen-wowson">Random Owen Wowson</Link> &mdash; Discord bot to send Owen Wilson clips
									</h3>
									<div></div>
								</div>
								<ul>
									<li>Gets random Owen Wilson &quot;wow&quot; movie clips</li>
									<li>Makes use of the open-source Owen Wilson Wow API</li>
									<li>Includes a small HTTP status server</li>
								</ul>
								<h4>Tools:</h4>
								<ul className="resume-work-tools">
									<li>Python</li>
									<li>Discord API</li>
									<li>JSON</li>
									<li>Git</li>
									<li>hikari</li>
									<li>hikari-lightbulb</li>
								</ul>
							</div>
						</section>
					</div>
					<section className="section-education">
						<h2>Education</h2>
						<ul>
							<li>
								2020&nbsp;&mdash;&nbsp;
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
