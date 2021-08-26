import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import { getAllExperiences, getExperience } from "../../lib/experiences";
import Link from "next/link";

const experience = ({ experienceData }) => {
	let xpObj = {};
	let xpTitle = "Experience";
	if (experienceData) {
		xpObj = JSON.parse(experienceData.json);
		xpTitle = xpObj.summary.title;
	}

	return (
		<>
			<BaseMeta title={xpTitle} desc={`${xpTitle} experience details.`} />
			<NavBar active="experience" />
			<Header heading={xpTitle} />
			<main role="main">
				<Section>
					<img src={`/img/experiences/${xpObj.summary.image}`} />
					<h2>Summary</h2>
					<ul className="experience-tags">
						{xpObj.summary.tags.map((t) => {
							return (
								<Link href={`/experience?q=${t}`} key={t} passHref>
									<a>
										<li>{t}</li>
									</a>
								</Link>
							);
						})}
					</ul>
					<p>{xpObj.summary.body}</p>
				</Section>
				{xpObj.brief !== undefined && xpObj.brief !== "" ? (
					<Section>
						<h2>Brief</h2>
						<p>{xpObj.brief}</p>
					</Section>
				) : (
					``
				)}
				{xpObj.process !== undefined ? (
					<Section>
						<h2>Process</h2>
						{xpObj.process.sections.map((s, i) => {
							return (
								<div key={i}>
									{s.title !== "" ? <h3>{s.title}</h3> : ``}
									{s.image !== "" ? <img src={`/img/experiences/${s.image}`} /> : ``}
									{s.body !== "" ? <p>{s.body}</p> : ``}
								</div>
							);
						})}
					</Section>
				) : (
					``
				)}
				<Section>
					<h2>Result</h2>
					{xpObj.result.sections.map((s, i) => {
						return (
							<div key={i}>
								{s.title !== "" ? <h3>{s.title}</h3> : ``}
								{s.image !== "" ? <img src={`/img/experiences/${s.image}`} /> : ``}
								{s.body !== "" ? <p>{s.body}</p> : ``}
							</div>
						);
					})}
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
