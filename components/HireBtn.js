import HireAction from "./HireAction";

export default function HireBtn() {
	return (
		<div className="hire-btn-container no-select">
			<HireAction>
				<button className="btn hire cta-arrow">Hire me</button>
			</HireAction>
		</div>
	);
}
