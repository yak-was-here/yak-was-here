import BaseMeta from "../../components/BaseMeta";
import ExperienceBrowser from "../../components/ExperienceBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Section from "../../components/Section";
import { getAllExperienceSummaries } from "../../lib/experiences";
import { useRouter } from "next/router";

const index = ({ expSummaries }) => {
	const router = useRouter();

	const updateURLQuery = (q) => {
		console.log("index-query:", q);
		if (q !== "") {
			router.query.q = q;
			router.push(router);
		} else {
			router.push("");
		}
	};

	return (
		<>
			<BaseMeta title="Experience" desc="Isaac's experience." />
			<NavBar active="experience" />
			<Header heading="Experience" />
			<main role="main">
				<Section>
					<ExperienceBrowser experiences={expSummaries} tagQuery={router.query.q} onQueryUpdate={updateURLQuery} />
				</Section>
			</main>
		</>
	);
};

export async function getStaticProps() {
	const expSummaries = getAllExperienceSummaries();
	if (expSummaries) {
		return {
			props: {
				expSummaries,
			},
		};
	}
}

export default index;
