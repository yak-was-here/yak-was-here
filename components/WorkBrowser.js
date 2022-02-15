import WorkCard from "./WorkCard";
import Section from "./Section";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function WorkBrowser({ workMetadata, tagQuery, onQueryUpdate }) {
	const [searchQuery, setSearchQuery] = useState(tagQuery);
	const [filteredWorkComponents, setfilteredWorkComponents] = useState([]);

	// Format a raw work data array into an WorkCard components array
	const formatWork = (e) => {
		return e.map((xp) => (
			<Section key={xp.id}>
				<WorkCard id={xp.id} image={xp.images[0]} title={xp.title} tags={xp.tags} summary={xp.summary} />
			</Section>
		));
	};

	// Filter the raw work data array based on the search query
	const filterWork = () => {
		return workMetadata.filter((xp) =>
			xp.tags.some((t) => {
				return t.toLowerCase().includes(searchQuery.toLowerCase());
			})
		);
	};

	const updateResults = () => {
		if (searchQuery === "") {
			setfilteredWorkComponents(formatWork(workMetadata));
			return;
		} else if (filterWork().length === 0) {
			setfilteredWorkComponents([
				<Section key="no-exp">
					<p>No work found for that search term.</p>
				</Section>,
			]);
			return;
		}
		setfilteredWorkComponents(formatWork(filterWork()));
	};

	useEffect(() => {
		updateResults();
	}, [searchQuery]);

	useEffect(() => {
		setSearchQuery(tagQuery);
	}, [tagQuery]);

	return (
		<div className="work-browser">
			<input
				type="text"
				placeholder={`Search... (try "React")`}
				id="workSearch"
				onChange={(e) => {
					if (onQueryUpdate instanceof Function) onQueryUpdate(e.target.value);
					setSearchQuery(e.target.value);
				}}
				value={searchQuery}
				autoFocus
				autoComplete="off"
			/>
			{filteredWorkComponents}
		</div>
	);
}

WorkBrowser.defaultProps = {
	workMetadata: [],
	tagQuery: "",
	onQueryUpdate: undefined,
};
WorkBrowser.propTypes = {
	workMetadata: PropTypes.array,
	tagQuery: PropTypes.string,
	onQueryUpdate: PropTypes.func,
};
