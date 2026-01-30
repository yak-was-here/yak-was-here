import { Metadata } from "next";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import PageFooter from "../components/PageFooter";
import About from "../components/About";
import Links from "../components/Links";
import { fName, lName, nick } from "../data/meta";

export const metadata: Metadata = {
	title: `${fName} "${nick}" ${lName}'s Website`,
	description: `${nick}'s personal website: have a look at ${nick}'s portfolio, resume, and businesses or contact information.`,
};

export default function Home() {
	return (
		<>
			<NavBar active="home" />
			<Hero />
			<main>
				<section>
					<About showHeading={true} />
				</section>
				<Links showHeading={true} />
			</main>
			<PageFooter />
		</>
	);
}
