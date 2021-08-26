import BaseMeta from "../../components/BaseMeta";
import ExperienceBrowser from "../../components/ExperienceBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Section from "../../components/Section";

const index = () => {
	return (
		<>
			<BaseMeta title="Experience" desc="Isaac's experience." />
			<NavBar active="experience" />
			<Header heading="Experience" />
			<main role="main">
				<Section>
					<ExperienceBrowser />
				</Section>
			</main>
		</>
	);
};

export default index;
