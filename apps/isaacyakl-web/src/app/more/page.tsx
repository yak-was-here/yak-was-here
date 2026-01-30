"use client";

import ContactIcons from "../../components/ContactIcons";
import NavBar from "../../components/NavBar";
import { fName, lName, nick, tagline } from "../../data/meta";
import { useEffect, useState } from "react";
import { getYear } from "../../lib/browser";
import Links from "../../components/Links";

export default function More() {
	const [currentDate, setCurrentDate] = useState(getYear());

	useEffect(() => {
		setCurrentDate(getYear());
		// Set document title since this is a client component
		document.title = `Links to ${nick}'s businesses, projects, and more.`;
	}, []);

	return (
		<div className="yakground-image print:bg-none">
			<NavBar active="more" />
			<main className="text-center">
				<section>
					<h1>@isaacyakl</h1>
					<p>{tagline}</p>
					<ContactIcons id="contact" />
				</section>
				<div className="w-64">
					<Links showHeading={false} />
				</div>
				<section className="text-xs">
					<p>
						&copy; {currentDate} {fName} {lName} &mdash; All rights reserved.
					</p>
				</section>
			</main>
		</div>
	);
}
