import { fName, lName, tagline, intro, github, linkedin } from "../data/meta";
import EmailLink from "./EmailLink";
import Skill from "./Skill";
import TelLink, { telNum } from "./TelLink";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";

function ResumeView() {
	const printResume = () => {
		window.print();
	};

	return (
		<div className="resumeBackground">
			<div className="resumeActions">
				<Link href="./litzenberger-isaac-web-developer-resume.pdf">
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
					<p>{intro}</p>
					<h2>Work Experience</h2>
					<h2>Education</h2>
					<ul>
						<Skill />
						<Skill />
						<Skill />
					</ul>
					<h2>Projects</h2>
					<h2>Courses</h2>
				</main>
			</div>
		</div>
	);
}

export default ResumeView;
