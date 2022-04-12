import { fName, lName, tagline, intro, github, linkedin } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink, { telNum } from "./TelLink";

function ResumeView() {
	return (
		<div className="resumeBackground">
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
						<a href="https://isaacyakl.com" title="Portfolio">
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
					<h2>Intro</h2>
					{intro}
					<h2>Work Experience</h2>
					<h2>Education</h2>
					<Skill />
					<h2>Projects</h2>
					<h2>Courses</h2>
				</main>
			</div>
		</div>
	);
}

export default ResumeView;
