"use client";

import NavBar from "../components/NavBar";
import CtaBtn from "../components/CtaBtn";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="yakground-image">
			<NavBar />
			<main className="text-center">
				<section>
					<h2>⚠️ Error</h2>
					<p>An error occurred. It&apos;s probably not your fault...right?! 😳</p>
					<div className="flex gap-4 justify-center max-w-md m-auto">
						<CtaBtn text="Try again" onClick={reset} />
						<CtaBtn text="Go home" href="/" />
					</div>
				</section>
			</main>
		</div>
	);
}
