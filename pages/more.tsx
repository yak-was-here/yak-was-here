import BaseMeta from "../components/BaseMeta";
import ContactIcons from "../components/ContactIcons";
import NavBar from "../components/NavBar";
import { fName, lName, nick, tagline } from "../data/meta";
import { useEffect, useState } from "react";
import { getYear } from "../lib/browser";
import Links from "../components/Links";

export default function More() {
	const [currentDate, setCurrentDate] = useState(getYear());

	useEffect(() => {
		setCurrentDate(getYear());
	}, []);

	return (
		<div className="more-background">
			<BaseMeta title={`Links to ${nick}'s businesses, projects, and more.`} desc={`Browse a list of ${nick}'s businesses, projects, and more.`} />
			<NavBar active="more" />
			<main className="max-width text-center">
				<section>
					<h1>@isaacyakl</h1>
					<p className="subtitle">{tagline}</p>
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
