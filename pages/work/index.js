import BaseMeta from "../../components/BaseMeta";
import WorkBrowser from "../../components/WorkBrowser";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getAllWorkMetadata } from "../../lib/work";
import { useRouter } from "next/router";
import ContactBtn from "../../components/ContactBtn";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

const Index = ({ allWorkMetadata }) => {
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
			<BaseMeta title='Isaac "Yak" Litzenberger&apos;s work and projects' desc="Look at detailed information about yak's current and past work." />
			<NavBar active="work" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Work", link: "/work" },
				]}
			/>
			<Header heading="Work" />
			<main className="max-page-width">
				<section>
					Browse my work experience and personal projects. In many cases I have included codebase links, tech stack details, screenshots, demos, performance metrics, and tools used. Even more work and projects can be found on my <Link href="https://github.com/isaacyakl">GitHub</Link>.
				</section>
				<WorkBrowser workMetadata={allWorkMetadata} tagQuery={router.query.q} onQueryUpdate={updateURLQuery} />
			</main>
			<Footer>
				<ContactBtn />
			</Footer>
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
