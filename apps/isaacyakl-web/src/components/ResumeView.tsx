"use client";

import { fName, lName, resumeIntroWebDev, github, linkedin, siteURL, tel, email, location, title } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink from "./TelLink";
import Link from "next/link";
import { FaDownload, FaPrint, FaAt, FaPhoneAlt, FaBriefcase, FaGithub, FaLinkedin } from "react-icons/fa";

function ResumeView() {
	const revealObfuscatedLinks = async (obfuscatedLinks: NodeList): Promise<void> => {
            if (obfuscatedLinks.length > 0) {
                for (let i = 0; i < obfuscatedLinks.length; i++) {
                    const link = obfuscatedLinks[i] as HTMLAnchorElement;
                    // @ts-expect-error focusVisible is an experimental option so it needed to be ignored by TS https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
                    link.focus({ preventScroll: true, focusVisible: false });
                }
            }
		};
	const printResume = () => {
		// Print to PDF in Firefox for best text recognition.
        // Reveal obfuscated contact information before printing/printing to PDF
        const links = document.querySelectorAll(
            'a[href="https://youtu.be/dQw4w9WgXcQ"'
        );
		revealObfuscatedLinks(links).then(() => {
			window.print();
		});
	};

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
				<div id="resumeContent" className="text-[10pt] leading-[1.45] w-full h-full print:max-h-full print:max-w-full grid grid-cols-6 grid-rows-6 gap-3 m-0 p-0 items-stretch justify-items-stretch overflow-hidden">
					{/* Software Resume tips
					https://www.linkedin.com/posts/dthompsondev_this-was-the-resume-that-led-someone-who-activity-7043567215891156992-Tryi */}
					<div id="resumeHeader" className="col-span-6 row-span-1 flex justify-between m-0 p-0">
						<div id="resumeHero" className="self-center m-0 p-0">
							<h1 className="text-[42pt] leading-[0.8] m-0 p-0">
								{fName} {lName}
							</h1>
							<h2 className="text-[25pt] leading-[0.8] m-0 p-0">{title}</h2>
							<h3 className="text-[15pt] leading-4 m-0 p-0">{location}</h3>
						</div>
						<div id="resumeContactInfo" className="self-center m-0 p-0 font-semibold">
							<ul className="list-none m-0 p-0">
								<li>
									<FaPhoneAlt className="inline w-[1.1em] h-[1.1em] mr-2" />
									<TelLink className="hover:underline">{tel}</TelLink>
								</li>
								<li>
									<FaAt className="inline w-[1.1em] h-[1.1em] mr-2" />
									<EmailLink className="hover:underline">{email}</EmailLink>
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
								<li>
									<FaBriefcase className="inline w-[1.1em] h-[1.1em] mr-2" />
									<a href={siteURL} title="Portfolio">
										isaacyakl.com
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div id="resumeSidebar" className="col-span-2 row-span-5 flex flex-col">
						<div id="resumeAbout" className="col-span-2 row-span-2 justify-self-start m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">About</h2>
							<p className="leading-[1.35]">{resumeIntroWebDev}</p>
						</div>
						<div id="resumeSkills" className="col-span-2 row-start-5 row-span-4 justify-self-start m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Skills</h2>
							<h3 className="text-base tracking-wide text-zinc-700 m-0 p-0">Languages</h3>
							<ul className="list-none m-0 mb-1 p-0">
								<Skill className="inline-block" absoluteURL={true}>
									JavaScript
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									TypeScript
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									HTML
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									CSS
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									SQL
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Python
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Java
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									PHP
								</Skill>
							</ul>
							<h3 className="text-base tracking-wide text-zinc-700 m-0 p-0">Frameworks</h3>
							<ul className="list-none m-0 mb-1 p-0">
								<Skill className="inline-block" absoluteURL={true}>
									NextJS
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="ReactJS">
									React
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Tailwind CSS
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Bootstrap
								</Skill>
							</ul>
							<h3 className="text-base tracking-wide text-zinc-700 m-0 p-0">Tools</h3>
							<ul className="list-none m-0 p-0">
								<Skill className="inline-block" absoluteURL={true}>
									Webpack
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="BabelJS">
									Babel
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="JestJS">
									Jest
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									MySQL
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Git
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="Git">
									GitHub
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Agile
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="Continuous Integration">
									CI
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Unit Testing
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									MVC
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									AWS
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Vercel
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									Figma
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true}>
									SEO
								</Skill>
								,&nbsp;
								<Skill className="inline-block" absoluteURL={true} q="Adobe">
									Adobe Apps
								</Skill>
							</ul>
						</div>
						<div id="resumeCourses" className="col-start-1 col-span-2 row-span-4 justify-self-start m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Courses</h2>
							<ul className="list-none m-0 p-0 ml-4 -indent-4 leading-[1.35]">
								<li className="mb-1">
									<strong className="text-zinc-700">Computer Science I &amp; II</strong>
									<br />
									CSU San Marcos
								</li>
								<li className="mb-1">
									<strong className="text-zinc-700">Front-End Nanodegree</strong>
									<br />
									Grow with Google
								</li>
								<li className="mb-1">
									<strong className="text-zinc-700">The Web Developer Bootcamp</strong>
									<br />
									udemy.com
								</li>
								<li className="mb-1">
									<strong className="text-zinc-700">React For Beginners</strong>
									<br />
									wesbos.com
								</li>
								<li className="mb-1">
									<strong className="text-zinc-700">Developing Innovative Ideas for New Companies</strong>
									<br />
									The University of Maryland
								</li>
							</ul>
						</div>
						<div id="resumeEducation" className="col-start-1 col-span-2 row-start-12 row-span-1 justify-self-start m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Education</h2>
							<ul className="list-none m-0 p-0 ml-4 -indent-4 leading-[1.35]">
								<li>
									<strong className="text-zinc-700">Bachelor of Science in Business Administration, Management</strong>
									<br />
									2020&nbsp;&mdash;&nbsp;CSU East Bay
									<br />
									<em>Dean&apos;s List</em>
								</li>
							</ul>
						</div>
					</div>
					<div id="resumeMain" className="col-span-4 row-span-5 flex flex-col">
						<div id="resumeProjects" className="m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Projects</h2>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="inline-block font-resume-body normal-case font-bold text-[11pt] leading-none text-zinc-700 m-0 p-0">
										<Link href="https://github.com/isaacyakl/isaacyakl.com">isaacyakl.com</Link> &mdash; Personal Website
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Features a portfolio, web-based resume, and blog</li>
									<li>Statically generates work entries using remark.js and gray-matter</li>
									<li>Experimented with relative CSS units in lieu of breakpoints</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 mr-1 p-0">Skills used:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 p-0">NextJS</li>,&nbsp;
									<li className="inline m-0 p-0">TypeScript</li>,&nbsp;
									<li className="inline m-0 p-0">React</li>,&nbsp;
									<li className="inline m-0 p-0">YAML</li>,&nbsp;
									<li className="inline m-0 p-0">Markdown</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="inline-block font-resume-body normal-case font-bold text-[11pt] leading-none text-zinc-700 m-0 p-0">
										<Link href="https://github.com/isaacyakl/brandojs">bRando.js</Link> &mdash; Website Background Randomizer Library
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Automatically changes CSS backgrounds on any DOM element</li>
									<li>Supports sequential or random mode and all CSS background props</li>
									<li>Full code coverage and API documentation</li>
									<li>Published on NPM; downloaded hundreds of times</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 mr-1 p-0">Skills used:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 p-0">TypeScript</li>,&nbsp;
									<li className="inline m-0 p-0">Jest</li>,&nbsp;
									<li className="inline m-0 p-0">Webpack</li>,&nbsp;
									<li className="inline m-0 p-0">Babel</li>
								</ul>
							</div>

							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="inline-block font-resume-body normal-case font-bold text-[11pt] leading-none text-zinc-700 m-0 p-0">
										<Link href="https://github.com/isaacyakl/remote-jackbox-player">Remote Jackbox Player</Link> &mdash; Single-screen Jackbox Interface
									</h3>
									<div className="m-0 p-0"></div>
								</div>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Mobile-first web app to find and play Jackbox games remotely for free</li>
									<li>Uses Twitch API to find channels streaming Jackbox games</li>
									<li>Simultaneously watch a stream and use Jackbox.tv on one screen</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 mr-1 p-0">Skills used:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 p-0">JavaScript</li>,&nbsp;
									<li className="inline m-0 p-0">Babel</li>,&nbsp;
									<li className="inline m-0 p-0">Tailwind CSS</li>,&nbsp;
									<li className="inline m-0 p-0">Twitch API</li>,&nbsp;
									<li className="inline m-0 p-0">JSON</li>
								</ul>
							</div>
						</div>
						<div id="resumeExperience" className="m-0 mb-2 p-0">
							<h2 className="text-[20pt] leading-[1.45] -mb-1 p-0">Experience</h2>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="inline-block font-resume-body normal-case font-bold text-[11pt] leading-none text-zinc-700 m-0 p-0">Web Developer & E-commerce Manager</h3>
									<div className="m-0 p-0">08/2020 - 02/2023</div>
								</div>
								<h4 className="font-resume-body normal-case text-[10pt] leading-none text-black m-0 ml-3 mb-0.5 p-0">New Breed Paintball and Airsoft &mdash; Remote</h4>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Automated structured data generation with JS; improved Google ranking</li>
									<li>Coded industry-leading, trade-in web app; mitigated need for follow-ups</li>
									<li>Built Shopify theme with product tagging and 3D model support</li>
									<li>Performed SEO tasks; increased clicks 400% and impressions 600%</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 mr-1 p-0">Skills used:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 p-0">JavaScript</li>,&nbsp;
									<li className="inline m-0 p-0">Shopify Liquid</li>,&nbsp;
									<li className="inline m-0 p-0">JSON</li>,&nbsp;
									<li className="inline m-0 p-0">PHP</li>,&nbsp;
									<li className="inline m-0 p-0">Git</li>,&nbsp;
									<li className="inline m-0 p-0">Adobe Apps</li>
								</ul>
							</div>
							<div className="-indent-4 m-0 ml-4 my-1 p-0">
								<div className="flex flex-wrap justify-between m-0 mb-1 p-0">
									<h3 className="inline-block font-resume-body normal-case font-bold text-[11pt] leading-none text-zinc-700 m-0 p-0">Web Developer</h3>
									<div className="m-0 p-0">03/2014 - 08/2016</div>
								</div>
								<h4 className="font-resume-body normal-case text-[10pt] leading-none text-black m-0 ml-3 mb-0.5 p-0">YourPbFriend &mdash; Fremont, CA</h4>
								<ul className="indent-0 m-0 ml-5 mb-0.5 p-0">
									<li>Wrote the #1 most-used paintball trade-in web app of 2015-2016</li>
									<li>Coded product tagging system; increased customer satisfaction</li>
									<li>Embedded YouTube content dynamically; increased value for customers</li>
									<li>Leveraged Shopify platform; increased revenue 10x in 2 years</li>
								</ul>
								<h4 className="font-resume-body inline-block normal-case text-[10pt] leading-none text-black m-0 ml-3 mr-1 p-0">Skills used:</h4>
								<ul className="resume-work-tools list-none inline-block m-0 ml-4 mb-0.5 p-0">
									<li className="inline m-0 p-0">jQuery</li>,&nbsp;
									<li className="inline m-0 p-0">Shopify Liquid</li>,&nbsp;
									<li className="inline m-0 p-0">Bootstrap</li>,&nbsp;
									<li className="inline m-0 p-0">PHP</li>,&nbsp;
									<li className="inline m-0 p-0">Adobe Apps</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ResumeView;
