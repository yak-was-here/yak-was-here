"use client";

import Link from "next/link";
import NavBar from "../components/NavBar";
import CtaBtn from "../components/CtaBtn";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NotFoundContent() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fullPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
		const cleanedPath = encodeURIComponent(
			fullPath.substring(1).replace(/[^a-zA-Z0-9 ]/g, " ").replace(/[-]/g, " ")
		);
		setSearchQuery(cleanedPath);
	}, [pathname, searchParams]);

	return (
		<div className="yakground-image">
			<NavBar />
			<main className="text-center">
				<section>
					<h2>😔 Page not found</h2>
					<p>
						That page doesn&apos;t exist. Perhaps you can{" "}
						<Link href={`/work?q=${searchQuery}`}>try searching for it</Link>?
					</p>
					<p className="max-w-[10rem] m-auto">
						<CtaBtn text="Go home" href="/" />
					</p>
				</section>
			</main>
		</div>
	);
}

export default function NotFound() {
	return (
		<Suspense fallback={
			<div className="yakground-image">
				<NavBar />
				<main className="text-center">
					<section>
						<h2>😔 Page not found</h2>
						<p>That page doesn&apos;t exist.</p>
						<p className="max-w-[10rem] m-auto">
							<CtaBtn text="Go home" href="/" />
						</p>
					</section>
				</main>
			</div>
		}>
			<NotFoundContent />
		</Suspense>
	);
}
