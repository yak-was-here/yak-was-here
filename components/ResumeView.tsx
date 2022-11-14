import { fName, lName, resumeTagline, resumeIntroWebDev, github, linkedin, siteURL, tel, email, nick, location } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink from "./TelLink";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

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
					<h1>
						{fName} &quot;{nick}&quot; {lName}
					</h1>
					<h2>{resumeTagline}</h2>
					<h3>{location}</h3>
					<p className="contact-info">
						<EmailLink>{email}</EmailLink>
						&nbsp;&#8226;&nbsp;
						<TelLink>{tel}</TelLink>
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

                                    <strong>Portfolio - isaacyakl.com</strong>

                                </Link>
								<ul>
									<li>Built with NextJS; hosted on Vercel</li>
									<li>Includes web-based resume</li>
									<li>Experiments with relative units instead of breakpoints</li>
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
						<section>
							<h2>Skills</h2>
							<div className="skills-container">
								<ul className="skills">
									<Skill absoluteURL={true} q="JavaScript">
										JavaScript
									</Skill>
									<Skill absoluteURL={true} q="TypeScript">
										TypeScript
									</Skill>
									<Skill absoluteURL={true} q="NextJS">
										NextJS
									</Skill>
									<Skill absoluteURL={true} q="ReactJS">
										ReactJS
									</Skill>
									<Skill absoluteURL={true} q="Shopify">
										Shopify API
									</Skill>
									<Skill absoluteURL={true}>Tailwind CSS</Skill>
								</ul>
								<ul className="skills">
									<Skill absoluteURL={true}>Bootstrap</Skill>
									<Skill absoluteURL={true} q="HTML">
										HTML
									</Skill>
									<Skill absoluteURL={true} q="CSS">
										CSS / SASS
									</Skill>
									<Skill absoluteURL={true} q="Git">
										Git / GitHub
									</Skill>
									<Skill absoluteURL={true}>PHP</Skill>
									<Skill absoluteURL={true}>Python</Skill>
								</ul>
								<ul className="skills">
									<Skill absoluteURL={true}>Figma</Skill>
									<Skill absoluteURL={true}>JSON</Skill>
									<Skill absoluteURL={true} q="REST">
										REST
									</Skill>
									<Skill absoluteURL={true}>SEO</Skill>
									<Skill absoluteURL={true}>SEM</Skill>
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
									<li>Computer Science I &amp; II - CSUSM</li>
									<li>Java Programming 1 &amp; 2 - MSJC</li>
									<li>The Web Developer Bootcamp - udemy.com</li>
									<li>React For Beginners - wesbos.com</li>
									<li>Front-End Nanodegree - Grow w/ Google</li>
									<li>Developing Innovative Ideas for New Companies - UMD</li>
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
