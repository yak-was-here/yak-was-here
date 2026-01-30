import BaseMeta from "../../components/BaseMeta";
import WorkBrowser from "../../components/WorkBrowser";
import PageHeader from "../../components/PageHeader";
import NavBar from "../../components/NavBar";
import PageFooter from "../../components/PageFooter";
import { getAllWorkMetadata } from "../../lib/work";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import { fName, lName, nick } from "../../data/meta";
import { FaGithub } from "react-icons/fa";

const Index = ({ allWorkMetadata }: { allWorkMetadata: Array<WorkFile> }) => {
    const router = useRouter();

    const updateURLSearchQuery = (q: string) => {
        if (q !== "") {
            router.push({
                pathname: router.pathname,
                query: {
                    q: encodeURIComponent(q),
                },
            });
        } else {
            router.push({
                pathname: router.pathname,
                query: {},
            });
        }
    };

    const getURLSearchQuery = () => {
        try {
            return router.query.q === undefined
                ? ""
                : typeof router.query.q === "string"
                ? decodeURIComponent(router.query.q)
                : decodeURIComponent(router.query.q[0]);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <BaseMeta
                title={`${fName} "${nick}" ${lName}'s Portfolio${
                    getURLSearchQuery() !== ""
                        ? ` — "${getURLSearchQuery()}" work`
                        : ": Work and Projects"
                }`}
                desc={`Read about and view ${nick}'s work experience and projects.`}
            />
            <NavBar active="work" />
            <Breadcrumbs
                trail={[
                    { text: "Home", link: "/" },
                    { text: "Work", link: "/work" },
                ]}
            />
            <PageHeader heading="Work" />
            <main className="m-auto justify-around">
                <section>
                    <p>
                        Below you will find my portfolio where you can read
                        about my work experience and personal projects. In these
                        summaries, I primarily write with a focus on my
                        problem-solving, thought process and the results. You
                        may also find code links, tech stack details,
                        screenshots, demos, performance metrics, and tools used.
                        Even more work and projects can be found on my{" "}
                        <Link href="https://github.com/isaacyakl">
                            <FaGithub className="inline" /> GitHub
                        </Link>
                        .
                    </p>
                    <WorkBrowser
                        workMetadata={allWorkMetadata}
                        tagQuery={getURLSearchQuery()}
                        onQueryUpdate={updateURLSearchQuery}
                    />
                </section>
            </main>
            <PageFooter />
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
