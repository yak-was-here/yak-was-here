import ExperienceCard from "./ExperienceCard";
import Section from "./Section";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ExperienceBrowser({ experiences, tagQuery, onQueryUpdate }) {
	const [searchQuery, setSearchQuery] = useState(tagQuery);
	const [filteredExpComponents, setFilteredExpComponents] = useState([]);

	// Format a raw experience data array into an ExperienceCard components array
	const formatExperiences = (e) => {
		return e.map((xp) => (
			<Section key={xp.id}>
				<ExperienceCard id={xp.id} image={xp.image} title={xp.title} tags={xp.tags} body={xp.body} />
			</Section>
		));
	};

	// Filter the raw experience data array based on the search query
	const filterExperiences = () => {
		return experiences.filter((xp) =>
			xp.tags.some((t) => {
				return t.toLowerCase().includes(searchQuery.toLowerCase());
			})
		);
	};

	const updateResults = () => {
		if (searchQuery === "") {
			setFilteredExpComponents(formatExperiences(experiences));
			return;
		} else if (filterExperiences().length === 0) {
			setFilteredExpComponents([
				<Section key="no-exp">
					<p>No experiences found for that search term.</p>
				</Section>,
			]);
			return;
		}
		setFilteredExpComponents(formatExperiences(filterExperiences()));
	};

	useEffect(() => {
		updateResults();
	}, [searchQuery]);

	useEffect(() => {
		setSearchQuery(tagQuery);
	}, [tagQuery]);

	return (
		<div className="experience-browser">
			<input
				type="text"
				placeholder={`Search... (try "React")`}
				id="experienceSearch"
				onChange={(e) => {
					if (onQueryUpdate instanceof Function) onQueryUpdate(e.target.value);
					setSearchQuery(e.target.value);
				}}
				value={searchQuery}
				autoFocus
				autoComplete="off"
			/>
			{filteredExpComponents}
		</div>
	);
}

ExperienceBrowser.defaultProps = {
	experiences: [],
	tagQuery: "",
	onQueryUpdate: undefined,
};

ExperienceBrowser.propTypes = {
	experiences: PropTypes.array,
	tagQuery: PropTypes.string,
	onQueryUpdate: PropTypes.func,
};
