import ContactIcons from "../components/ContactIcons";
import Branding from "../components/Branding";
import HireBtn from "./HireBtn";

const Footer = () => {
	return (
		<footer>
			<HireBtn />
			<div className="footer-container">
				<ContactIcons id="contact" />
				<Branding />
				<p>&copy; {new Date().getFullYear()} Isaac Litzenberger &mdash; All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
