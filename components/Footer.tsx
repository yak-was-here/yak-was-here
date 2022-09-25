import ContactIcons from "./ContactIcons";
import Branding from "./Branding";
import React from "react";
import { fName, lName } from "../data/meta";

const Footer = ({ children }: { children?: React.ReactNode }) => {
	return (
		<footer>
			<div className="dont-print">{children}</div>
			<div className="footer-branding">
				<ContactIcons id="contact" className="dont-print" />
				<Branding />
				<p>
					&copy; {new Date().getFullYear()} {fName} {lName} &mdash; All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
