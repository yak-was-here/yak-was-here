import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import HireAction from "./HireAction";

const ContactIcons = ({ id }) => {
	return (
		<div id={`${id ? id : ""}`} className="social-icons no-select">
			<a href="https://www.twitter.com/isaacyakl" title="yak on Twitter">
				<FontAwesomeIcon icon={faTwitter} />
			</a>
			<a href="https://www.github.com/isaacyakl" title="yak on GitHub">
				<FontAwesomeIcon icon={faGithub} />
			</a>
			<a href="https://www.instagram.com/isaacyakl" title="yak on Insta">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
			<HireAction>
				<FontAwesomeIcon icon={faAt} />
			</HireAction>
		</div>
	);
};

export default ContactIcons;
