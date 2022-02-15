import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import Image from "next/image";
import { getAllWorkIds, getWorkFileData } from "../../lib/work";
import Link from "next/link";
import WorkTags from "../../components/WorkTags";

const Work = ({ title, date, images, tags, summary, links, htmlContent }) => {
	return (
		<>
			<BaseMeta title={title} desc={`${title} work details.`} />
			<NavBar active="work" />
			<Header heading={title} />
			<main role="main">
				<Section>
					<Image src={`/img/work/${images[0]}`} layout="responsive" width="300" height="175" alt="" />
					<h2>Summary</h2>
					<h6 className="work-date">{date}</h6>
					{tags !== undefined ? <WorkTags tags={tags} /> : ``}
					<p dangerouslySetInnerHTML={{ __html: summary }}></p>
					{links !== undefined ? (
						<p style={{ textAlign: "center" }}>
							{links.map((l) => {
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
				<Section dangerouslySetInnerHTML={{ __html: htmlContent }}></Section>
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
					...workFileData,
				},
			};
		}
	}
}

export default Work;
