import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { siteURL } from "../data/meta";

function Skill({ children, q, absoluteURL }: { children?: React.ReactNode; q?: string; absoluteURL?: boolean }) {
	const childToString = () => {
		// React.isValidElement - https://stackoverflow.com/a/65829088/13254325
		return Array.isArray(children) ? children[0].props.children : children && typeof children === "object" && React.isValidElement(children) ? children.props.children : children;
	};
	const setQueryString = () => {
		return q ? encodeURIComponent(q) : encodeURIComponent(childToString());
	};

	const checkAbsoluteURL = () => {
		return absoluteURL ? siteURL.substring(0, siteURL.length - 1) : "";
	};

	return (
        <li>
			<Link
                href={`${checkAbsoluteURL()}/work?q=${setQueryString()}`}
                title={`Browse ${childToString()} work`}>
				{children}
			</Link>
		</li>
    );
}

Skill.defaultProps = {
	children: "Skill example",
	absoluteURL: false,
};

Skill.propTypes = {
	children: PropTypes.string,
	q: PropTypes.string,
	absoluteURL: PropTypes.bool,
};

export default Skill;
