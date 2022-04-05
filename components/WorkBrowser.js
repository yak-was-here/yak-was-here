import WorkCard from "./WorkCard";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function WorkBrowser({ workMetadata, tagQuery, onQueryUpdate }) {
	const [searchQuery, setSearchQuery] = useState(tagQuery);
	const [filteredWorkComponents, setFilteredWorkComponents] = useState([]);

	// Format a raw work data array into an WorkCard components array
	const formatWork = (e) => {
		return e.map((xp) => <WorkCard id={xp.id} key={xp.id} image={xp.images[0]} title={xp.title} date={xp.date} role={xp.role} summary={xp.summary} />);
	};

	// Filter the raw work data array based on the search query
	const filterWork = () => {
		return workMetadata.filter((xp) =>
			xp.tags.some((t) => {
				return t.toLowerCase().includes(searchQuery.toLowerCase()) || xp.title.toLowerCase().includes(searchQuery.toLowerCase());
			})
		);
	};

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredWorkComponents(formatWork(workMetadata));
			return;
		} else if (filterWork().length === 0) {
			setFilteredWorkComponents([
				<section key="no-exp">
					<p>No work found for that search term.</p>
				</section>,
			]);
			return;
		}
		setFilteredWorkComponents(formatWork(filterWork()));
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
			<section className="work-view">{filteredWorkComponents}</section>
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
