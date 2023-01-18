import ContactIcons from "./ContactIcons";
import Branding from "./Branding";
import React from "react";
import { fName, lName } from "../data/meta";
import { useEffect, useState } from "react";

const Footer = ({ children }: { children?: React.ReactNode }) => {
	const [currentDate, setCurrentDate] = useState(new Date().getFullYear());

	useEffect(() => {
		setCurrentDate(new Date().getFullYear());
	}, []);

	return (
		<footer>
			<div className="max-width m-auto p-2">
				<div className="dont-print">{children}</div>
				<div className="text-center">
					<ContactIcons id="contact" className="mt-8 mb-10 dont-print" />
					<Branding inFooter={true} />
					<p>
						&copy; {currentDate} {fName} {lName} &mdash; All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
