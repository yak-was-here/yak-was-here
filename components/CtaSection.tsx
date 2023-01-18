import CtaBtn from "./CtaBtn";

export default function CtaSection({ ctaBody, btnText, btnHref }: { ctaBody?: string; btnText: string; btnHref: string }) {
	const getBody = () => {
		if (ctaBody !== undefined) return ctaBody;
		return (
			<>
				<strong>Discover new solutions and strategies.</strong>
				<br />
				Take your business to the next level.
			</>
		);
	};

	return (
		<>
			<section className="text-xl max-w-screen-sm min-h-[300px] select-none dont-print">
				<hr className="m-auto mb-4 mt-6" />
				<p className="text-center">{getBody()}</p>
				<CtaBtn text={btnText} href={btnHref} />
			</section>
		</>
	);
}
