import WorkCard from "./WorkCard";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { isDesktop } from "react-device-detect";

export default function WorkBrowser({ workMetadata, tagQuery, onQueryUpdate, focus }: { workMetadata: Array<WorkFile>; tagQuery: string; onQueryUpdate: Function; focus: boolean }) {
	const [searchQuery, setSearchQuery] = useState(tagQuery);
	const [filteredWorkComponents, setFilteredWorkComponents] = useState<React.ReactNode>([]);

	// Format a raw work data array into an WorkCard components array
	const formatWork = (e: Array<WorkFile>) => {
		return e.map((xp) => <WorkCard id={xp.id} key={xp.id} image={xp.images[0]} title={xp.title} summary={xp.summary} />);
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

	const searchInputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (focus === true || isDesktop === true) searchInputRef?.current?.focus();
	}, []);

	return (
		<div className="work-browser">
			<input
				type="text"
				placeholder={`Search... (try "JavaScript")`}
				id="workSearch"
				onChange={(e) => {
					if (onQueryUpdate instanceof Function) onQueryUpdate(e.target.value);
					setSearchQuery(e.target.value);
				}}
				value={searchQuery}
				autoComplete="off"
				ref={searchInputRef}
			/>
			{searchQuery !== "" && filterWork().length !== 0 ? <p>Work found under &ldquo;{searchQuery}&rdquo;:</p> : ""}
			<section className="work-view">{filteredWorkComponents}</section>
		</div>
	);
}

WorkBrowser.defaultProps = {
	workMetadata: [],
	tagQuery: "",
	onQueryUpdate: undefined,
	focus: undefined,
};
WorkBrowser.propTypes = {
	workMetadata: PropTypes.array,
	tagQuery: PropTypes.string,
	onQueryUpdate: PropTypes.func,
	focus: PropTypes.bool,
};
