import ExperienceCard from "./ExperienceCard";
import Section from "./Section";
import PropTypes from "prop-types";

export default function ExperienceBrowser({ experiences, tagQuery }) {
	return (
		<div className="experience-browser">
			<input type="text" placeholder={`Search... (try "react")`} id="experienceSearch" value={tagQuery} autoFocus />
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

ExperienceBrowser.defaultProps = {
	experiences: undefined,
	tagQuery: "",
};

ExperienceBrowser.propTypes = {
	experiences: PropTypes.object,
	tagQuery: PropTypes.string,
};
