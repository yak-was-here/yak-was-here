import BaseMeta from "../../components/BaseMeta";
import WorkBrowser from "../../components/WorkBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Section from "../../components/Section";
import { getAllWorkSummaries } from "../../lib/work";
import { useRouter } from "next/router";

const index = ({ workSummaries }) => {
	const router = useRouter();

	const updateURLQuery = (q) => {
		if (q !== "") {
			router.query.q = q;
			router.push(router);
		} else {
			router.push("");
		}
	};

	return (
		<>
			<BaseMeta title="Experience" desc="Isaac's work." />
			<NavBar active="work" />
			<Header heading="Work" />
			<main role="main">
				<Section>
					<WorkBrowser work={workSummaries} tagQuery={router.query.q} onQueryUpdate={updateURLQuery} />
				</Section>
			</main>
		</>
	);
};

export async function getStaticProps() {
	const workSummaries = getAllWorkSummaries();
	if (workSummaries) {
		return {
			props: {
				workSummaries,
			},
		};
	}
}

export default index;
