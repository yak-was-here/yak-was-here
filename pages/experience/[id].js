import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import ImageSlider from "../../components/ImageSlider";
import { getAllExperiences, getExperience } from "../../lib/experiences";
import Link from "next/link";
import ExperienceSection from "../../components/ExperienceSection";
import ExperienceTags from "../../components/ExperienceTags";

const experience = ({ experienceData }) => {
	let xpObj = JSON.parse(experienceData.json);
	let xpTitle = xpObj.summary.title;
	return (
		<>
			<BaseMeta title={xpTitle} desc={`${xpTitle} experience details.`} />
			<NavBar active="experience" />
			<Header heading={xpTitle} />
			<main role="main">
				<Section>
					<ImageSlider images={xpObj.summary.images} />
					<h2>Summary</h2>
					{xpObj.summary.tags !== undefined ? <ExperienceTags tags={xpObj.summary.tags} /> : ``}
					<p dangerouslySetInnerHTML={{ __html: xpObj.summary.body }}></p>
					{xpObj.summary.links !== undefined ? (
						<p style={{ textAlign: "center" }}>
							{xpObj.summary.links.map((l) => {
								return (
									<Link href={l.url} key={l.title} passHref>
										<a className="btn cta-link experience-links" target="_blank" rel="noopener">
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
						<ExperienceSection sections={xpObj.process.sections} />
					</Section>
				) : (
					``
				)}
				<Section>
					<h2>Result</h2>
					<ExperienceSection sections={xpObj.result.sections} />
				</Section>
			</main>
			<Footer />
		</>
	);
};

export async function getStaticPaths() {
	const paths = getAllExperiences();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	if (params.id !== undefined) {
		const experienceData = await getExperience(params.id);
		if (experienceData !== undefined) {
			return {
				props: {
					experienceData,
				},
			};
		}
	}
}

export default experience;
