import BaseMeta from "../../components/BaseMeta";
import NavBar from "../../components/NavBar";
import PageHeader from "../../components/PageHeader";
import PageFooter from "../../components/PageFooter";
import Image from "next/image";
import { getAllWorkIds, getWorkFileData } from "../../lib/work";
import Link from "next/link";
import WorkTags from "../../components/WorkTags";
import Breadcrumbs from "../../components/Breadcrumbs";
import { nick, siteURL } from "../../data/meta";
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
			return <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>;
		}
	};

	return (
        <>
            <BaseMeta
                title={`The ${title} development process`}
                desc={`Read about the development process of ${title} and how ${nick} was involved.`}
                shareImg={`${siteURL}img/work/${images[0]}`}
            />
            <NavBar active="work" />
            <Breadcrumbs
                trail={[
                    { text: "Home", link: "/" },
                    { text: "Work", link: "/work" },
                    { text: title, link: "" },
                ]}
            />
            <PageHeader heading={title} />
            <main className="m-auto">
                <section>
                    <Link
                        href={`/img/work/${images[0]}`}
                        className="block"
                        passHref
                        title="Enlarge screenshot"
                    >
                        <div className="relative w-full portrait:h-[65vw] landscape:h-[70vh] drop-shadow overflow-hidden">
                            <Image
                                src={`/img/work/${images[0]}`}
                                alt={`${title} screenshot`}
                                className="object-cover"
                                fill
                            />
                        </div>
                    </Link>
                    <h2>Summary</h2>
                    {getResults()}
                    <p dangerouslySetInnerHTML={{ __html: summary }}></p>
                    {links !== undefined ? (
                        <p className="flex flex-wrap justify-center items-center">
                            {links.map((l) => {
                                return (
                                    <Link
                                        href={l.url}
                                        key={l.title}
                                        className="btn cta-arrow text-center !text-white"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {l.title}
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
            </main>
            <PageFooter />
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
