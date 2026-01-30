import CtaBtn from "./CtaBtn";

export default function CtaSection({ ctaBody, btnText, btnHref }: { ctaBody?: string; btnText: string; btnHref: string }) {
	const getBody = () => {
		if (ctaBody !== undefined) return ctaBody;
		return (
			<>
				<span className="block m-2">
					<strong>Take your business to the next level!</strong>
				</span>
				<span className="block m-2">Discover new solutions and strategies.</span>
			</>
		);
	};

	return (
		<>
			<section className="text-xl max-w-screen-sm min-h-[300px] text-center select-none dont-print">
				<hr className="m-auto mb-4 mt-6" />
				<p>{getBody()}</p>
				<p>
					<CtaBtn text={btnText} href={btnHref} />
				</p>
			</section>
		</>
	);
}
