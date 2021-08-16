import ContactIcons from "../components/ContactIcons";
import Branding from "../components/Branding";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<ContactIcons id="contact" />
				<Branding />
				<p>&copy; {new Date().getFullYear()} Isaac L. &mdash; All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
