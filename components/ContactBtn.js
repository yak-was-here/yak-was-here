import EmailLink from "./EmailLink";

export default function ContactBtn() {
	return (
		<div className="cta-btn-container no-select">
			<EmailLink>
				<button className="btn cta cta-arrow">Contact me</button>
			</EmailLink>
		</div>
	);
}
