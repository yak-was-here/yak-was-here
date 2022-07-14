import Link from "next/link";
import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import CtaBtn from "../components/CtaBtn";

export default function Error500() {
	return (
		<>
			<div className="more-background">
				<BaseMeta title="An error occurred" desc="Whoops! Something went wrong..." />
				<NavBar />
				<main className="max-page-width">
					<section className="text-center">
						<h2>Error ⚠️</h2>
						<p>An error occurred. It&apos;s probably not your fault...right?! 😳</p>
					</section>
					<CtaBtn text="🏠 Home" href="/" />
				</main>
			</div>
		</>
	);
}
