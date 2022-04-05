import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { getAllWorkIds, getWorkFileData } from "../../lib/work";
import Link from "next/link";
import WorkTags from "../../components/WorkTags";
import ContactBtn from "../../components/ContactBtn";

const Work = ({ title, date, images, tags, results, role, summary, links, htmlContent }) => {
	return (
		<>
			<BaseMeta title={`The ${title} development process`} desc={`Read about the development process of ${title} and how yak was involved.`} />
			<NavBar active="work" />
			<Header heading={title} />
			<main className="max-page-width">
				<section>
					<Image src={`/img/work/${images[0]}`} layout="responsive" width="100%" height="60vh" objectFit="cover" objectPosition="center top" alt={title} />
				</section>
				<section>
					<h2 className="work-date">{date}</h2>
					<h2 className="work-role">{role}</h2>
					<ul>
						{results.map((r, i) => {
							return <li key={`result${i}`}>{r}</li>;
						})}
					</ul>
					<p dangerouslySetInnerHTML={{ __html: summary }}></p>
					{links !== undefined ? (
						<p className="text-center">
							{links.map((l) => {
								return (
									<Link href={l.url} key={l.title}>
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
					<h3 id="tags">Tags</h3>
					{tags !== undefined ? <WorkTags tags={tags} /> : ``}
				</section>
				<section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
			</main>
			<Footer>
				<ContactBtn />
			</Footer>
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
		const workFileData = await getWorkFileData(params.id);
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
