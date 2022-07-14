import Link from "next/link";

export default function CtaBtn({ text, href }) {
	return (
		<div className="cta-btn-container no-select">
			<Link href={href}>
				<a>
					<button className="btn cta cta-arrow">{text}</button>
				</a>
			</Link>
		</div>
	);
}
