import ContactIcons from "./ContactIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fName, lName, title, location, acceptingWork } from "../data/meta";
import EmailLink from "./EmailLink";

function Hero() {
	const renderWorkStatus = () => {
		if (acceptingWork) {
			return (
				<EmailLink>
					<div className="work-status bg-yak-green">
						<FontAwesomeIcon icon={faCheck} />
						Accepting work
					</div>
				</EmailLink>
			);
		}
	};

	return (
		<header className="hero">
			<div className="max-w-screen-lg m-auto">
				<h1 className="hero-title">
					{fName}
					<br />
					{lName}
				</h1>
				<hr />
				<div className="seeking">
					<FontAwesomeIcon icon={faBriefcase} />
					{title}
					<br />
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					{location}
				</div>
				<ContactIcons id="social" />
				{renderWorkStatus()}
			</div>
		</header>
	);
}

export default Hero;
