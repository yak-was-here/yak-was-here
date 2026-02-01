import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import EmailLink from "./EmailLink";
import { twitter, github, instagram, linkedin, nick } from "../data/meta";

const ContactIcons = ({ id, className = "" }: { id?: string; className?: string }) => {
	return (
		<div id={id} className={`py-2 select-none ${className}`}>
			<a href={twitter} title={`${nick} on Twitter`}>
				<FontAwesomeIcon icon={faTwitter} fontSize="2.25rem" className="inline-block text-black hover:text-yak-cyan transition-colors ease-out duration-500 mr-2" />
			</a>
			<a href={github} title={`${nick} on GitHub`}>
				<FontAwesomeIcon icon={faGithub} fontSize="2.25rem" className="inline-block text-black hover:text-yak-cyan transition-colors ease-out duration-500 mr-2" />
			</a>
			<a href={linkedin} title={`${nick} on LinkedIn`}>
				<FontAwesomeIcon icon={faLinkedinIn} fontSize="2.25rem" className="inline-block text-black hover:text-yak-cyan transition-colors ease-out duration-500 mr-2" />
			</a>
			<a href={instagram} title={`${nick} on Insta`}>
				<FontAwesomeIcon icon={faInstagram} fontSize="2.25rem" className="inline-block text-black hover:text-yak-cyan transition-colors ease-out duration-500 mr-2" />
			</a>
			<EmailLink>
				<FontAwesomeIcon icon={faAt} fontSize="2.25rem" className="inline-block text-black hover:text-yak-cyan transition-colors ease-out duration-500 mr-2" />
			</EmailLink>
		</div>
	);
};

export default ContactIcons;
