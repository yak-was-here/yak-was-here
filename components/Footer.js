import ContactIcons from "../components/ContactIcons";
import Branding from "../components/Branding";
import React from "react";
import { fName, lName } from "../data/meta";

const Footer = ({ children }) => {
	return (
		<footer>
			<div className="dont-print">{children}</div>
			<div className="footer-branding">
				<ContactIcons className="dont-print" />
				<Branding />
				<p>
					&copy; {new Date().getFullYear()} {fName} {lName} &mdash; All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
