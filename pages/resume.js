import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import ResumeView from "../components/Resume";
import { fName, lName, tagline } from "../data/meta";

function Resume() {
	return (
		<>
			<BaseMeta title={`${fName} ${lName}'s Resume`} desc={`${fName} ${lName} &mdash; ${tagline.toLowerCase()} &mdash; Resume`} />
			<NavBar active="resume" />
			<ResumeView />
		</>
	);
}

export default Resume;
