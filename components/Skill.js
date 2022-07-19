import Link from "next/link";
import PropTypes from "prop-types";
import { siteURL } from "../data/meta";

function Skill({ children, q, absoluteURL }) {
	const childToString = () => {
		return Array.isArray(children) ? children[0].props.children : typeof children === "object" ? children.props.children : children;
	};
	const setQueryString = () => {
		return q ? encodeURIComponent(q) : encodeURIComponent(childToString());
	};

	const checkAbsoluteURL = () => {
		return absoluteURL ? siteURL.substring(0, siteURL.length - 1) : "";
	};

	return (
		<li>
			<Link href={`${checkAbsoluteURL()}/work?q=${setQueryString()}`}>
				<a title={`Browse ${childToString()} work`}>{children}</a>
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
