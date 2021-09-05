import ExperienceCard from "./ExperienceCard";
import Section from "./Section";

export default function ExperienceBrowser({ experiences }) {
	return (
		<div className="experience-browser">
			<input type="text" placeholder={`Search... (try "react")`} id="experienceSearch" />
			{experiences !== undefined ? (
				experiences.map((xp) => {
					return (
						<Section>
							<ExperienceCard id={xp.id} image={xp.image} title={xp.title} tags={xp.tags} body={xp.body} />
						</Section>
					);
				})
			) : (
				<Section>
					<p>No experiences found.</p>
				</Section>
			)}
		</div>
	);
}
