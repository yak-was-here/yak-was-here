import CtaBtn from "./CtaBtn";

export default function CtaSection({ ctaBody, btnText, btnHref }) {
	const getBody = () => {
		if (ctaBody !== undefined) return ctaBody;
		return (
			<>
				<strong>Discover new solutions and strategies.</strong>
				<br />
				Bring your business to the next level.
			</>
		);
	};

	return (
		<>
			<section className="cta-section max-page-width dont-print">
				<hr />
				<p className="text-center">{getBody()}</p>
				<CtaBtn text={btnText} href={btnHref} />
			</section>
		</>
	);
}
