import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { getAllWorkIds, getWorkFileData } from "../../lib/work";
import Link from "next/link";
import WorkTags from "../../components/WorkTags";
import Breadcrumbs from "../../components/Breadcrumbs";
import { nick, siteURL } from "../../data/meta";
import CtaSection from "../../components/CtaSection";
import { GetStaticPaths } from "next";

const Work = ({ title, images, tags, results, summary, links, htmlContent }: WorkFile) => {
	const getResults = () => {
		if (results && results.length > 0) {
			return (
				<ul>
					{results.map((r, i) => {
						return <li key={`result${i}`}>{r}</li>;
					})}
				</ul>
			);
		} else return "";
	};

	const getBody = () => {
		if (htmlContent && htmlContent !== "") {
			return (
				<div className="work-details-body">
					<section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
				</div>
			);
		}
	};

	return (
		<>
			<BaseMeta title={`The ${title} development process`} desc={`Read about the development process of ${title} and how ${nick} was involved.`} shareImg={`${siteURL}img/work/${images[0]}`} />
			<NavBar active="work" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Work", link: "/work" },
					{ text: title, link: "" },
				]}
			/>
			<Header heading={title} />
			<main className="work">
				<section>
					<div className="drop-shadow ss">
						<Link href={`/img/work/${images[0]}`} passHref>
							<a title="Enlarge screenshot">
								<Image src={`/img/work/${images[0]}`} layout="responsive" width="100%" height="60vh" objectFit="cover" objectPosition="center top" alt={`${title} screenshot`} />
							</a>
						</Link>
					</div>
					<h2>Summary</h2>
					{getResults()}
					<p dangerouslySetInnerHTML={{ __html: summary }}></p>
					{links !== undefined ? (
						<p className="work-links text-center">
							{links.map((l) => {
								return (
									<Link href={l.url} key={l.title}>
										<a className="btn cta-link work-link" target="_blank" rel="noopener">
											{l.title}
										</a>
									</Link>
								);
							})}
						</p>
					) : (
						``
					)}
					<h3 id="tags">Skills &amp; tools used</h3>
					{tags !== undefined ? <WorkTags tags={tags} /> : ``}
				</section>
				{getBody()}
				<CtaSection btnText="Hire me" btnHref={"../digital-marketing-services"} />
			</main>
			<Footer />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllWorkIds();
	return {
		paths,
		fallback: false,
	};
};

// Add typing https://nextjs.org/docs/basic-features/typescript#static-generation-and-server-side-rendering
// https://github.com/vercel/next.js/discussions/16522
export async function getStaticProps({ params }: { params: WorkFile }) {
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
