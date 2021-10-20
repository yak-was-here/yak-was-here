import ExperienceCard from "./ExperienceCard";
import Section from "./Section";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ExperienceBrowser({ experiences, tagQuery, onQueryUpdate }) {
	const [qT, setQt] = useState(tagQuery);
	const [filteredExp, setFilter] = useState([]);

	const formatExperiences = (e) => {
		return e.map((xp) => (
			<Section key={xp.id}>
				<ExperienceCard id={xp.id} image={xp.image} title={xp.title} tags={xp.tags} body={xp.body} />
			</Section>
		));
	};

	const updateResults = (e) => {
		if (qT === "") {
			setFilter(formatExperiences(experiences));
			console.log("Showing all experiences");
			return;
		} else if (e.filter((exp) => exp.tags.includes(qT)).length === 0) {
			setFilter([
				<Section key="no-exp">
					<p>No experiences found.</p>
				</Section>,
			]);
			console.log("No experiences");
			return;
		}
		setFilter(formatExperiences(e.filter((exp) => exp.tags.includes(qT))));
		console.log("Showing queried experiences");
	};

	useEffect(() => {
		console.log("update results");
		updateResults(experiences);
	}, [qT]);

	useEffect(() => {
		console.log("update qt");
		setQt(tagQuery);
	}, [tagQuery]);

	return (
		<div className="experience-browser">
			<input
				type="text"
				placeholder={`Search... (try "React")`}
				id="experienceSearch"
				onChange={(e) => {
					onQueryUpdate(e.target.value);
					setQt(e.target.value);
				}}
				onFocus={(e) => {
					onQueryUpdate(e.target.value);
					setQt(e.target.value);
				}}
				defaultValue={tagQuery || ExperienceBrowser.defaultProps.tagQuery}
				autoFocus
			/>
			{filteredExp}
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
