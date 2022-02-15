import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import ImageSlider from "../../components/ImageSlider";
import { getAllWorkIds, getWorkFileData } from "../../lib/work";
import Link from "next/link";
import WorkTags from "../../components/WorkTags";

const work = ({ workFileData }) => {
	return (
		<>
			<BaseMeta title={workFileData.title} desc={`${workFileData.title} work details.`} />
			<NavBar active="work" />
			<Header heading={workFileData.title} />
			<main role="main">
				<Section>
					<ImageSlider images={workFileData.images} />
					<h2>Summary</h2>
					{workFileData.tags !== undefined ? <WorkTags tags={workFileData.tags} /> : ``}
					<p dangerouslySetInnerHTML={{ __html: workFileData.summary }}></p>
					{workFileData.links !== undefined ? (
						<p style={{ textAlign: "center" }}>
							{workFileData.links.map((l) => {
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
				<Section dangerouslySetInnerHTML={{ __html: workFileData.htmlContent }}></Section>
			</main>
			<Footer />
		</>
	);
};

export async function getStaticPaths() {
	const paths = getAllWorkIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	if (params.id !== undefined) {
		const workFileData = getWorkFileData(params.id);
		if (workFileData) {
			return {
				props: {
					workFileData,
				},
			};
		}
	}
}

export default work;
