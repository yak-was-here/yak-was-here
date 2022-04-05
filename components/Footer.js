import ContactIcons from "../components/ContactIcons";
import Branding from "../components/Branding";

const Footer = ({ children }) => {
	return (
		<footer>
			{children}
			<div className="footer-branding">
				<ContactIcons />
				<Branding />
				<p>&copy; {new Date().getFullYear()} Isaac Litzenberger &mdash; All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
