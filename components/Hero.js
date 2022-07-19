import ContactIcons from "./ContactIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { fName, lName, title, location } from "../data/meta";

function Hero() {
	return (
		<header className="hero">
			<div className="header-container max-page-width">
				<h1 className="hero-title">
					{fName}
					<br />
					{lName}
				</h1>
				<hr />
				<div className="seeking">
					<FontAwesomeIcon icon={faCode} />
					{title}
					<br />
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					{location}
				</div>
				<ContactIcons id="social" />
			</div>
		</header>
	);
}

export default Hero;
