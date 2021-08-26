import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import { getAllExperiences, getExperience } from "../../lib/experiences";

const experience = ({ experienceData }) => {
	let xpObj = {};
	let xpTitle = "Experience";
	if (experienceData) {
		xpObj = JSON.parse(experienceData.json);
		xpTitle = xpObj.about.title;
	}

	return (
		<>
			<BaseMeta title={xpTitle} desc={`${xpTitle} experience details.`} />
			<NavBar active="experience" />
			<Header heading={xpTitle} />
			<main role="main">
				<Section>{xpObj.about.summary}</Section>
			</main>
			<Footer />
		</>
	);
};

export async function getStaticPaths() {
	const paths = getAllExperiences();
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const experienceData = await getExperience(params.id);
	if (experienceData.json) {
		return {
			props: {
				experienceData,
			},
		};
	}

	return {
		redirect: {
			destination: "/experience",
			permanent: false,
		},
	};
}

export default experience;
