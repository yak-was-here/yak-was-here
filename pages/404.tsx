import Link from "next/link";
import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import CtaBtn from "../components/CtaBtn";
import { useEffect, useState } from "react";

export default function Error404() {
	const [pathName, getPathName] = useState("");

	useEffect(() => {
		console.log(window.location);
		getPathName(encodeURIComponent(`${window.location.pathname.substring(1)}${window.location.search}`.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/[-]/g, " ")));
	}, [pathName]);

	return (
		<>
			<div className="more-background">
				<BaseMeta title="Page not found" desc="Guess that page does not exist..." robots="noindex" googlebot="noindex" />
				<NavBar />
				<main className="max-width">
					<section className="text-center">
						<h2>Page not found 😔</h2>
						<p>
							That page doesn&apos;t exist. Perhaps you can <Link href={`/work?q=${pathName}`}>try searching for it</Link>?
						</p>
					</section>
					<CtaBtn text="🏠 Home" href="/" />
				</main>
			</div>
		</>
	);
}
