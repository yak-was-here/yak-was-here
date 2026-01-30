import ContactIcons from "./ContactIcons";
import Branding from "./Branding";
import React from "react";
import { fName, lName } from "../data/meta";
import { useEffect, useState } from "react";
import { getYear } from "../lib/browser";

const PageFooter = ({ children }: { children?: React.ReactNode }) => {
	const [currentDate, setCurrentDate] = useState(getYear());

	useEffect(() => {
		setCurrentDate(getYear());
	}, []);

	return (
		<footer className="print:bg-none">
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

export default PageFooter;
