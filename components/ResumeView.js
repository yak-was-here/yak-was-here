import { fName, lName, tagline, resumeIntroWebDev, github, linkedin, siteURL } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink, { telNum } from "./TelLink";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";

function ResumeView() {
	const printResume = () => {
		// Print to PDF in Firefox for best text recognition.
		// Mouseover contact links before saving.
		window.print();
	};

	return (
		<div className="resumeBackground">
			<div className="resumeActions dont-print">
				<Link href="/litzenberger-isaac-web-developer-resume.pdf" passHref>
					<a>
						<button className="link" title="Download">
							<FontAwesomeIcon icon={faDownload} />
						</button>
					</a>
				</Link>
				<button className="link" title="Print" onClick={printResume}>
					<FontAwesomeIcon icon={faPrint} />
				</button>
			</div>
			<div className="resumePaper">
				<main className="resumeContent">
					<h1>
						{fName} {lName}
					</h1>
					<h2>{tagline}</h2>
					<p className="contact-info">
						<EmailLink />
						&nbsp;&#8226;&nbsp;
						<TelLink>{telNum}</TelLink>
						<br />
						<a href={siteURL} title="Portfolio">
							isaacyakl.com
						</a>
						&nbsp;&#8226;&nbsp;
						<a href={github} title="Github profile">
							{github.replace("https://", "")}
						</a>
						&nbsp;&#8226;&nbsp;
						<a href={linkedin} title="Linkedin profile">
							{linkedin.replace("https://", "")}
						</a>
					</p>
					<p>{resumeIntroWebDev}</p>
					<div className="resume-two-column">
						<section>
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
						<section>
							<h2>Projects</h2>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/isaacyakl.com">
									<a>
										<strong>isaacyakl.com</strong>
									</a>
								</Link>
								<br />
								Personal website built with NextJS and published on Vercel.
								<ul>
									<li>Experiments with relative units instead of breakpoints</li>
									<li>Includes web-based resume</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/remote-jackbox-player">
									<a>
										<strong>Remote Jackbox Player</strong>
									</a>
								</Link>
								<br />A web application to find and play Jackbox games remotely, even if you don&apos;t own any.
								<ul>
									<li>Uses Twitch API to find people streaming games</li>
									<li>Mobile focused design with multiple viewing formats</li>
									<li>Built with Tailwind CSS</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/brandojs">
									<a>
										<strong>bRando.js</strong>
									</a>
								</Link>
								<br />A CSS background property randomizing script capable of transitioning between images, colors, and gradients, written in vanilla JavaScript.
								<ul>
									<li>Utilizes image preloading</li>
									<li>Minified for production</li>
									<li>Published to NPM and CDN</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/fairhaven-bc-vbs-2019-soundboard">
									<a>
										<strong>Keyboard Soundboard</strong>
									</a>
								</Link>
								<br />A web browser soundboard with preset keybinds made for one of my church&apos;s events.
								<ul>
									<li>Uses JavaScript to play and stop audio elements</li>
									<li>Animates buttons when triggered</li>
									<li>Preloads sounds</li>
								</ul>
							</div>
							<div className="resume-work-entry">
								<Link href="https://github.com/isaacyakl/random-owen-wowson">
									<a>
										<strong>Random Owen Wowson</strong>
									</a>
								</Link>
								<br />A Discord bot that sends various movie clips of Owen Wilson saying &quot;Wow&quot;, written in Python.
								<ul>
									<li>Makes use of the Owen Wilson Wow API</li>
									<li>Includes a small HTTP status server</li>
								</ul>
							</div>
						</section>
						<section>
							<h2>Skills</h2>
							<div className="skills-container">
								<ul className="skills">
									<Skill absoluteURL={true} q="JavaScript">
										JavaScript / jQuery
									</Skill>
									<Skill absoluteURL={true}>NextJS / ReactJS</Skill>
									<Skill absoluteURL={true} q="HTML">
										HTML5
									</Skill>
									<Skill absoluteURL={true} q="CSS">
										CSS3 / SASS
									</Skill>
									<Skill absoluteURL={true} q="Liquid">
										Shopify Liquid
									</Skill>
								</ul>
								<ul className="skills">
									<Skill absoluteURL={true} q="Git">
										Git / GitHub
									</Skill>
									<Skill absoluteURL={true}>PHP</Skill>
									<Skill absoluteURL={true}>Figma</Skill>
									<Skill absoluteURL={true}>Bootstrap</Skill>
									<Skill absoluteURL={true}>Tailwind CSS</Skill>
								</ul>
								<ul className="skills">
									<Skill absoluteURL={true}>JSON</Skill>
									<Skill absoluteURL={true}>Python</Skill>
									<Skill absoluteURL={true} q="REST">
										REST APIs
									</Skill>
									<Skill absoluteURL={true}>SEO</Skill>
									<Skill absoluteURL={true} q="Adobe">
										Adobe Apps
									</Skill>
								</ul>
							</div>
						</section>
						<section>
							<h2>Courses</h2>
							<div className="skills-container">
								<ul className="courses">
									<li>React For Beginners - wesbos.com</li>
									<li>The Web Developer Bootcamp 2022 - udemy.com</li>
									<li>Front-End Nanodegree - Grow w/ Google</li>
									<li>Computer Science I &amp; II - CSUSM</li>
								</ul>
							</div>
						</section>
					</div>
					<h2>Education</h2>
					<p>
						<strong>Bachelor of Science in Business Administration, General Management</strong> - Dean&apos;s List - CSU East Bay | <em>2020</em>
					</p>
				</main>
			</div>
		</div>
	);
}

export default ResumeView;
