import { fName, lName, title } from "../data/meta";
import EmailLink from "./EmailLink";

function Resume() {
	return (
		<div className="resumeBackground">
			<main className="resumePaper">
				<h1>
					{fName}&nbsp;
					{lName}
				</h1>
				<h2>{title}</h2>
				<p>
					Email:
					<strong>
						<EmailLink />
					</strong>
				</p>
			</main>
		</div>
	);
}

export default Resume;
