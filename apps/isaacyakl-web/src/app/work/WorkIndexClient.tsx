"use client";

import WorkBrowser from "../../components/WorkBrowser";
import PageHeader from "../../components/PageHeader";
import NavBar from "../../components/NavBar";
import PageFooter from "../../components/PageFooter";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function WorkIndex({ allWorkMetadata }: { allWorkMetadata: Array<WorkFile> }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const q = searchParams.get('q');
        setSearchQuery(q ? decodeURIComponent(q) : "");
    }, [searchParams]);

    const updateURLSearchQuery = (q: string) => {
        if (q !== "") {
            router.push(`/work?q=${encodeURIComponent(q)}`);
        } else {
            router.push("/work");
        }
    };

    return (
        <>
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
                        tagQuery={searchQuery}
                        onQueryUpdate={updateURLSearchQuery}
                    />
                </section>
            </main>
            <PageFooter />
        </>
    );
}
