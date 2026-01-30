import { Metadata } from "next";
import NavBar from "../../../components/NavBar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";
import Image from "next/image";
import { getAllWorkIds, getWorkFileData } from "../../../lib/work";
import Link from "next/link";
import WorkTags from "../../../components/WorkTags";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { nick, siteURL } from "../../../data/meta";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
	const workIds = getAllWorkIds();
	return workIds.map((work) => ({
		id: work.params.id,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const workFileData: WorkFile | undefined = await getWorkFileData(id);

	if (!workFileData) {
		return {
			title: "Work Not Found",
		};
	}

	return {
		title: `The ${workFileData.title} development process`,
		description: `Read about the development process of ${workFileData.title} and how ${nick} was involved.`,
		openGraph: {
			images: [`${siteURL}img/work/${workFileData.images[0]}`],
		},
	};
}

export default async function WorkDetailPage({ params }: Props) {
	const { id } = await params;
	const workFileData: WorkFile | undefined = await getWorkFileData(id);

	if (!workFileData) {
		return <div>Work not found</div>;
	}

	const { title, images, tags, results, summary, links, htmlContent } = workFileData;

	const getResults = () => {
		if (results && results.length > 0) {
			return (
				<ul>
					{results.map((r: string, i: number) => {
						return <li key={`result${i}`}>{r}</li>;
					})}
				</ul>
			);
		} else return null;
	};

	const getBody = () => {
		if (htmlContent && htmlContent !== "") {
			return <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>;
		}
		return null;
	};

	return (
		<>
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
					{links !== undefined && links.length > 0 && (
						<p className="flex flex-wrap justify-center items-center">
							{links.map((l: { title: string; url: string }) => {
								return (
									<Link
										href={l.url}
										key={l.title}
										className="btn cta-arrow text-center text-white!"
										target="_blank"
										rel="noopener"
									>
										{l.title}
									</Link>
								);
							})}
						</p>
					)}
					<h3 id="tags">Skills &amp; tools used</h3>
					{tags !== undefined && <WorkTags tags={tags} />}
				</section>
				{getBody()}
			</main>
			<PageFooter />
		</>
	);
}
