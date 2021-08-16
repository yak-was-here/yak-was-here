import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

const experience = () => {
	const projectName = "";

	return (
		<>
			<BaseMeta title={`${projectName} - isaacyakl.com`} desc={`${projectName} experience details.`}></BaseMeta>
			<NavBar active="experience"></NavBar>
			<Header {...(projectName != "" && { heading: projectName })} />
		</>
	);
};

export default experience;
