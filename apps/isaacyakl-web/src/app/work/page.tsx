import { Metadata } from "next";
import { getAllWorkMetadata } from "../../lib/work";
import WorkIndexClient from "./WorkIndexClient";
import { fName, lName, nick } from "../../data/meta";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `${fName} "${nick}" ${lName}'s Portfolio: Work and Projects`,
	description: `Read about and view ${nick}'s work experience and projects.`,
};

export default async function WorkPage() {
	const allWorkMetadata = await getAllWorkMetadata();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<WorkIndexClient allWorkMetadata={allWorkMetadata} />
		</Suspense>
	);
}
