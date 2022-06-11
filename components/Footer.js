import ContactIcons from "../components/ContactIcons";
import Branding from "../components/Branding";
import React from "react";

const Footer = ({ children }) => {
	return (
		<footer>
			<div className="dont-print">{children}</div>
			<div className="footer-branding">
				<ContactIcons className="dont-print" />
				<Branding />
				<p>&copy; {new Date().getFullYear()} Isaac Litzenberger &mdash; All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
