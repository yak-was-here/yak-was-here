import BaseMeta from "../../components/BaseMeta";
import WorkBrowser from "../../components/WorkBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import { getAllWorkMetadata } from "../../lib/work";
import { useRouter } from "next/router";

const index = ({ allWorkMetadata }) => {
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
					<WorkBrowser workMetadata={allWorkMetadata} tagQuery={router.query.q} onQueryUpdate={updateURLQuery} />
				</Section>
			</main>
			<Footer />
		</>
	);
};

export function getStaticProps() {
	const allWorkMetadata = getAllWorkMetadata();

	if (allWorkMetadata) {
		return {
			props: {
				allWorkMetadata,
			},
		};
	}
	return;
}

export default index;
