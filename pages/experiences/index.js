import BaseMeta from "../../components/BaseMeta";
import ExperienceBrowser from "../../components/ExperienceBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Section from "../../components/Section";
import { getAllExperienceSummaries } from "../../lib/experiences";
import { useRouter } from "next/router";
import { useState } from "react";

const index = ({ expSummaries }) => {
	const { q, setQ } = useState("");
	const { query } = useRouter();

	return (
		<>
			<BaseMeta title="Experience" desc="Isaac's experience." />
			<NavBar active="experience" />
			<Header heading="Experience" />
			<main role="main">
				<Section>
					<ExperienceBrowser experiences={expSummaries} tagQuery={query.q} />
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
