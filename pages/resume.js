import BaseMeta from "../components/BaseMeta";
import Breadcrumbs from "../components/Breadcrumbs";
import NavBar from "../components/NavBar";
import ResumeView from "../components/ResumeView";
import { fName, lName, tagline } from "../data/meta";

function Resume() {
	return (
		<>
			<BaseMeta title={`${fName} ${lName}'s Résumé`} desc={`${fName} ${lName} &mdash; ${tagline.toLowerCase()} &mdash; Résumé`} />
			<NavBar active="resume" className="dont-print" />
			<Breadcrumbs
				className="dont-print no-select"
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Résumé", link: "/resume" },
				]}
			/>
			<ResumeView />
		</>
	);
}

export default Resume;
