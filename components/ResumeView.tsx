import { fName, lName, resumeIntroWebDev, github, linkedin, siteURL, tel, email, location } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink from "./TelLink";
import Link from "next/link";
import { useEffect } from "react";
import { FaDownload, FaPrint, FaAt, FaPhoneAlt, FaBriefcase, FaGithub, FaLinkedin } from "react-icons/fa";

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

	// Golden nugget on Stackoverflow about best settings for full page print styling
	// https://stackoverflow.com/a/36690658/13254325
	return (
		<div className="yakground-image overflow-auto p-[0.3in] print:bg-none print:p-0">
			<main id="resumePaper" className="relative yak-shadow block m-auto bg-white w-[8.5in] h-[11in] p-[0.5in] overflow-hidden print:absolute print:top-0 print:bottom-0 print:!mt-0 print:p-0 print:w-full print:h-full">
				<div id="resumeActions" className="absolute w-full h-[0.5in] flex flex-nowrap justify-end items-start m-0 p-1 top-0 right-0 print:hidden overflow-hidden">
					<Link href="/litzenberger-isaac-resume.pdf" className="btn w-auto flex-none m-0.5 py-1 px-2 drop-shadow-none !text-yak-green !bg-transparent hover:!text-white hover:!bg-yak-green hover:!drop-shadow-md" title="Download" passHref>
						<FaDownload className="inline m-0 p-0" />
					</Link>
					<Link href="#" onClick={printResume} className="btn w-auto flex-none m-0.5 py-1 px-2 drop-shadow-none !text-yak-green !bg-transparent hover:!text-white hover:!bg-yak-green hover:!drop-shadow-md" title="Print" passHref>
						<FaPrint className="inline m-0 p-0" />
					</Link>
				</div>
				<div id="resumeContent" className="text-[10pt] leading-[1.45] w-full h-full print:max-h-full print:max-w-full grid grid-cols-[repeat(6,1fr)] grid-rows-[repeat(6,1fr)] gap-[0.5em] m-0 p-0 items-stretch justify-items-stretch overflow-hidden">
					<div id="resumeHero" className="col-start-1 col-end-5 row-start-1 row-end-2 self-center justify-self-start m-0 p-0">
						<h1 className="text-[42pt] leading-[0.8] m-0 p-0">
							{fName} {lName}
						</h1>
						<h2 className="text-[22pt] leading-[0.8] m-0 p-0">{location}</h2>
					</div>
					<div id="resumeContactInfo" className="font-semibold col-start-5 col-end-7 row-start-1 row-end-2 self-center justify-self-end m-0 p-0">
						<ul className="list-none m-0 p-0">
							<li>
								<FaAt className="inline w-[1.1em] h-[1.1em] mr-2" />
								<EmailLink className="hover:underline">{email}</EmailLink>
							</li>
							<li>
								<FaPhoneAlt className="inline w-[1.1em] h-[1.1em] mr-2" />
								<TelLink className="hover:underline">{tel}</TelLink>
							</li>
							<li>
								<FaBriefcase className="inline w-[1.1em] h-[1.1em] mr-2" />
								<a href={siteURL} title="Portfolio">
									isaacyakl.com
								</a>
							</li>
							<li>
								<FaGithub className="inline w-[1.1em] h-[1.1em] mr-2" />
								<a href={github} title="Github profile">
									{github.replace("https://", "")}
								</a>
							</li>
							<li>
								<FaLinkedin className="inline w-[1.1em] h-[1.1em] mr-2" />
								<a href={linkedin} title="Linkedin profile">
									{linkedin.replace("https://", "")}
								</a>
							</li>
						</ul>
					</div>
					<div id="resumeAbout" className="col-start-1 col-end-3 row-start-2 row-end-3 justify-self-start m-0 p-0">
						<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">About</h2>
						<p className="leading-[1.35]">{resumeIntroWebDev}</p>
					</div>
					<div id="resumeSkills" className="col-start-1 col-end-3 row-start-3 row-end-4 self-center m-0 p-0">
						<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Skills</h2>
						<ul className="list-none m-0 p-0">
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								JavaScript
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								TypeScript
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								NextJS
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="ReactJS">
								React
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="JestJS">
								Jest
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="BabelJS">
								Babel
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Shopify
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Webpack
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="HandlebarsJS">
								Handlebars
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Git
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								GitHub
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								NPM
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Vercel
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Bootstrap
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								HTML
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								CSS
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="CSS">
								SCSS
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Tailwind CSS
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								PHP
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Python
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								C++
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="Discord">
								Discord API
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true} q="Twitch">
								Twitch API
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								Figma
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								REST
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								SEO
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								SEM
							</Skill>
							<Skill className="inline-block after:content-['\00a0\002f\00a0']" absoluteURL={true}>
								SMM
							</Skill>
							<Skill className="inline-block" absoluteURL={true} q="Adobe">
								Adobe Apps
							</Skill>
						</ul>
					</div>
					<div id="resumeWork" className="col-start-3 col-end-7 row-start-2 row-end-7 m-0 p-0">
						<div id="resumeExperience" className="m-0 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Experience</h2>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">Web Developer & E-commerce Manager</h3>
									<div className="m-0 p-0">08/2020 - 02/2023</div>
								</div>
								<h4 className="font-resume-body normal-case text-[10pt] leading-none text-black m-0 ml-3 mb-0.5 p-0">New Breed Paintball and Airsoft &mdash; Remote</h4>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>
										<u>Developed website features; saved $100s/mo in 3rd-party app subs</u>
									</li>
									<li>Coded industry-leading, trade-in web app; mitigated follow-up clarification</li>
									<li>Automated structured data generation; improved Google results</li>
									<li>Performed SEO tasks; increased clicks 400% and impressions 600%</li>
									<li>Generated average monthly revenue of $2,000+</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">JavaScript</li>
									<li className="inline m-0 mx-1 p-0 underline">Shopify Liquid</li>
									<li className="inline m-0 mx-1 p-0 underline">JSON</li>
									<li className="inline m-0 mx-1 p-0 underline">PHP</li>
									<li className="inline m-0 mx-1 p-0 underline">Git</li>
									<li className="inline m-0 mx-1 p-0 underline">Adobe Apps</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">Web Developer</h3>
									<div className="m-0 p-0">03/2014 - 08/2016</div>
								</div>
								<h4 className="font-resume-body normal-case text-[10pt] leading-none text-black m-0 ml-3 mb-0.5 p-0">YourPbFriend &mdash; Fremont, CA</h4>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>
										<u>Wrote the #1 most-used paintball trade-in web app of 2015-2016</u>
									</li>
									<li>Identified key website improvements; became #2 online paintball store</li>
									<li>Embedded YouTube content to educate and create value for customers</li>
									<li>Increased revenue 10x in 2 years by utilizing the Shopify ecosystem</li>
									<li>Created a used-gun, rating system calculator; increased buyer trust</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">jQuery</li>
									<li className="inline m-0 mx-1 p-0 underline">Shopify Liquid</li>
									<li className="inline m-0 mx-1 p-0 underline">Bootstrap</li>
									<li className="inline m-0 mx-1 p-0 underline">PHP</li>
									<li className="inline m-0 mx-1 p-0 underline">Adobe Apps</li>
								</ul>
							</div>
						</div>
						<div id="resumeProjects" className="m-0 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Projects</h2>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">
										<Link href="https://github.com/isaacyakl/brandojs">bRando.js</Link> &mdash; Website Background Randomizer Library
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Automatically changes CSS backgrounds on any DOM element</li>
									<li>
										Published on <Link href="https://www.npmjs.com/package/brandojs">NPM</Link>; downloaded hundreds of times per week
									</li>
									<li>100% code coverage and API documentation</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">TypeScript</li>
									<li className="inline m-0 mx-1 p-0 underline">Jest</li>
									<li className="inline m-0 mx-1 p-0 underline">Webpack</li>
									<li className="inline m-0 mx-1 p-0 underline">Babel</li>
									<li className="inline m-0 mx-1 p-0 underline">Git</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">
										<Link href="https://github.com/isaacyakl/isaacyakl.com">isaacyakl.com</Link> &mdash; Personal Website
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Portfolio, web-based resume, and blog</li>
									<li>Work entries statically generated using remark.js and gray-matter</li>
									<li>An experiment in using relative CSS units instead of breakpoints</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">NextJS</li>
									<li className="inline m-0 mx-1 p-0 underline">TypeScript</li>
									<li className="inline m-0 mx-1 p-0 underline">React</li>
									<li className="inline m-0 mx-1 p-0 underline">TSX/JSX</li>
									<li className="inline m-0 mx-1 p-0 underline">YAML</li>
									<li className="inline m-0 mx-1 p-0 underline">Markdown</li>
									<li className="inline m-0 mx-1 p-0 underline">Git</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">
										<Link href="https://github.com/isaacyakl/remote-jackbox-player">Remote Jackbox Player</Link> &mdash; Single-screen Jackbox Interface
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Mobile-first web app to find and play Jackbox games remotely for free</li>
									<li>Simultaneously watch a stream and use Jackbox.tv on one screen</li>
									<li>Uses Twitch API to find channels streaming Jackbox games</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">JavaScript</li>
									<li className="inline m-0 mx-1 p-0 underline">Babel</li>
									<li className="inline m-0 mx-1 p-0 underline">Tailwind CSS</li>
									<li className="inline m-0 mx-1 p-0 underline">Twitch API</li>
									<li className="inline m-0 mx-1 p-0 underline">JSON</li>
									<li className="inline m-0 mx-1 p-0 underline">Git</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="font-resume-body normal-case font-bold text-[10pt] leading-none text-black m-0 p-0">
										<Link href="https://github.com/isaacyakl/random-owen-wowson">Random Owen Wowson</Link> &mdash; Discord bot to send Owen Wilson clips
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Gets random Owen Wilson &quot;wow&quot; movie clips</li>
									<li>Makes use of the open-source Owen Wilson Wow API</li>
									<li>Includes a small HTTP status server</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 p-0">Tools:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 mx-1 p-0 underline">Python</li>
									<li className="inline m-0 mx-1 p-0 underline">Discord API</li>
									<li className="inline m-0 mx-1 p-0 underline">JSON</li>
									<li className="inline m-0 mx-1 p-0 underline">Git</li>
									<li className="inline m-0 mx-1 p-0 underline">hikari</li>
									<li className="inline m-0 mx-1 p-0 underline">hikari-lightbulb</li>
								</ul>
							</div>
						</div>
					</div>
					<div id="resumeEducation" className="col-start-1 col-end-3 row-start-4 row-end-5 self-center m-0 p-0">
						<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Education</h2>
						<ul className="list-none m-0 p-0 ml-4 -indent-4 leading-[1.35]">
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
					</div>
					<div id="resumeCourses" className="col-start-1 col-end-3 row-start-5 row-end-7 m-0 p-0">
						<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Courses</h2>
						<ul className="list-none m-0 p-0 ml-4 -indent-4 leading-[1.35]">
							<li className="mb-1">
								<strong>Computer Science I &amp; II</strong>
								<br />
								CSU San Marcos
							</li>
							<li className="mb-1">
								<strong>Front-End Nanodegree</strong>
								<br />
								Grow w/ Google
							</li>
							<li className="mb-1">
								<strong>The Web Developer Bootcamp</strong>
								<br />
								udemy.com
							</li>
							<li className="mb-1">
								<strong>React For Beginners</strong>
								<br />
								wesbos.com
							</li>
							<li className="mb-1">
								<strong>Developing Innovative Ideas for New Companies</strong>
								<br />
								The University of Maryland
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ResumeView;
