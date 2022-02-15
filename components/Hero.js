import ContactIcons from "./ContactIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

function Hero() {
	return (
		<header className="hero no-select">
			<div className="header-container max-page-width">
				<h1 className="hero-title">
					Isaac
					<br />
					Litzenberger
				</h1>
				<hr />
				<div className="seeking">
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					San Francisco Bay Area
				</div>
				<ContactIcons id="contact" />
			</div>
		</header>
	);
}

export default Hero;
