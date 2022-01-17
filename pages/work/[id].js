import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import ImageSlider from "../../components/ImageSlider";
import { getAllWork, getWork } from "../../lib/work";
import Link from "next/link";
import WorkSection from "../../components/WorkSection";
import WorkTags from "../../components/WorkTags";

const work = ({ workData }) => {
	let xpObj = JSON.parse(workData.json);
	let xpTitle = xpObj.summary.title;
	return (
		<>
			<BaseMeta title={xpTitle} desc={`${xpTitle} work details.`} />
			<NavBar active="work" />
			<Header heading={xpTitle} />
			<main role="main">
				<Section>
					<ImageSlider images={xpObj.summary.images} />
					<h2>Summary</h2>
					{xpObj.summary.tags !== undefined ? <WorkTags tags={xpObj.summary.tags} /> : ``}
					<p dangerouslySetInnerHTML={{ __html: xpObj.summary.body }}></p>
					{xpObj.summary.links !== undefined ? (
						<p style={{ textAlign: "center" }}>
							{xpObj.summary.links.map((l) => {
								return (
									<Link href={l.url} key={l.title} passHref>
										<a className="btn cta-link work-links" target="_blank" rel="noopener">
											{l.title}
										</a>
									</Link>
								);
							})}
						</p>
					) : (
						``
					)}
				</Section>
				{xpObj.brief !== undefined && xpObj.brief !== "" ? (
					<Section>
						<h2>Brief</h2>
						<p dangerouslySetInnerHTML={{ __html: xpObj.brief }}></p>
					</Section>
				) : (
					``
				)}
				{xpObj.process !== undefined ? (
					<Section>
						<h2>Process</h2>
						<WorkSection sections={xpObj.process.sections} />
					</Section>
				) : (
					``
				)}
				<Section>
					<h2>Result</h2>
					<WorkSection sections={xpObj.result.sections} />
				</Section>
			</main>
			<Footer />
		</>
	);
};

export async function getStaticPaths() {
	const paths = getAllWork();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	if (params.id !== undefined) {
		const workData = await getWork(params.id);
		if (workData !== undefined) {
			return {
				props: {
					workData,
				},
			};
		}
	}
}

export default work;
