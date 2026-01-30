import { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavBar from "../../components/NavBar";
import ResumeView from "../../components/ResumeView";
import { fName, lName, resumeIntroWebDev } from "../../data/meta";

export const metadata: Metadata = {
	title: `${fName} ${lName}'s Resume`,
	description: `${fName} ${lName}: ${resumeIntroWebDev.substring(0, 100)}...`,
};

export default function Resume() {
	return (
		<>
			<NavBar active="resume" className="dont-print" />
			<Breadcrumbs
				className="dont-print select-none"
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Resume", link: "/resume" },
				]}
			/>
			<ResumeView />
		</>
	);
}
