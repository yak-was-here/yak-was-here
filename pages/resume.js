import BaseMeta from "../components/BaseMeta";
import Breadcrumbs from "../components/Breadcrumbs";
import NavBar from "../components/NavBar";
import ResumeView from "../components/ResumeView";
import { fName, lName, tagline } from "../data/meta";

function Resume() {
	return (
		<>
			<BaseMeta title={`${fName} ${lName}'s Resume`} desc={`${fName} ${lName} &mdash; ${tagline.toLowerCase()} &mdash; Resume`} />
			<NavBar active="resume" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Resume", link: "/resume" },
				]}
			/>
			<ResumeView />
		</>
	);
}

export default Resume;
