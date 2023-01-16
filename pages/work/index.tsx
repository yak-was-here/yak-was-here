import BaseMeta from "../../components/BaseMeta";
import WorkBrowser from "../../components/WorkBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getAllWorkMetadata } from "../../lib/work";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import { fName, lName, nick } from "../../data/meta";
import CtaSection from "../../components/CtaSection";

const Index = ({ allWorkMetadata }: { allWorkMetadata: Array<WorkFile> }) => {
	const router = useRouter();

	const updateURLSearchQuery = (q: string) => {
		if (q !== "") {
			router.push({
				pathname: router.pathname,
				query: {
					q: encodeURIComponent(q),
				},
			});
		} else {
			router.push({
				pathname: router.pathname,
				query: {},
			});
		}
	};

	const getURLSearchQuery = () => {
		try {
			return router.query.q === undefined ? "" : typeof router.query.q === "string" ? decodeURIComponent(router.query.q) : decodeURIComponent(router.query.q[0]);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<BaseMeta title={`${fName} "${nick}" ${lName}'s Portfolio${getURLSearchQuery() !== "" ? ` — "${getURLSearchQuery()}" work` : ": Work and Projects"}`} desc={`Read about and view ${nick}'s work experience and projects.`} />
			<NavBar active="work" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Work", link: "/work" },
				]}
			/>
			<Header heading="Work" />
			<main className="max-w-screen-lg m-auto">
				<section>
					Below you will find my portfolio, where you can read about my work experience and personal projects. In these summaries, I primarily write with a focus on my problem-solving thought process and the results. You may also find code links, tech stack details, screenshots, demos, performance metrics, and tools used. Even more work and projects can be found on my <Link href="https://github.com/isaacyakl">GitHub</Link>.
				</section>
				<WorkBrowser workMetadata={allWorkMetadata} tagQuery={getURLSearchQuery()} onQueryUpdate={updateURLSearchQuery} />
				<CtaSection btnText={"Email me"} btnHref="" />
			</main>
			<Footer />
		</>
	);
};

export async function getStaticProps() {
	const allWorkMetadata = await getAllWorkMetadata();

	if (allWorkMetadata) {
		return {
			props: {
				allWorkMetadata,
			},
		};
	}
	return;
}

export default Index;
