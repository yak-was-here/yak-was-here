import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import CtaBtn from "../components/CtaBtn";

export default function Error500() {
	return (
		<div className="more-background">
			<BaseMeta title="An error occurred" desc="Whoops! Something went wrong..." robots="noindex" googlebot="noindex" />
			<NavBar />
			<main className="text-center">
				<section>
					<h2>⚠️ Error</h2>
					<p>An error occurred. It&apos;s probably not your fault...right?! 😳</p>
					<p className="max-w-[10rem] m-auto">
						<CtaBtn text="Go home" href="/" />
					</p>
				</section>
			</main>
		</div>
	);
}
