import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import EmailLink from "./EmailLink";
import { twitter, github, instagram, linkedin, nick } from "../data/meta";

const ContactIcons = ({ id, className = "" }) => {
	return (
		<div id={id} className={`social-icons no-select ${className}`}>
			<a href={twitter} title={`${nick} on Twitter`}>
				<FontAwesomeIcon icon={faTwitter} />
			</a>
			<a href={github} title={`${nick} on GitHub`}>
				<FontAwesomeIcon icon={faGithub} />
			</a>
			<a href={linkedin} title={`${nick} on Insta`}>
				<FontAwesomeIcon icon={faLinkedinIn} />
			</a>
			<a href={instagram} title={`${nick} on Insta`}>
				<FontAwesomeIcon icon={faInstagram} />
			</a>
			<EmailLink>
				<FontAwesomeIcon icon={faAt} />
			</EmailLink>
		</div>
	);
};

export default ContactIcons;
