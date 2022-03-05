import Link from "next/link";

export default function CtaBtn({ ctaText, ctaHref }) {
	return (
		<div className="cta-btn-container no-select">
			<Link href={ctaHref} passHref>
				<a>
					<button className="btn cta cta-arrow">{ctaText}</button>
				</a>
			</Link>
		</div>
	);
}
