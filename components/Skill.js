import Link from "next/link";
import PropTypes from "prop-types";

function Skill({ children, q }) {
	const childToString = () => {
		return Array.isArray(children) ? children[0].props.children : typeof children === "object" ? children.props.children : children;
	};
	const setQueryString = () => {
		return q ? encodeURIComponent(q) : encodeURIComponent(childToString());
	};

	return (
		<li>
			<Link href={`/work?q=${setQueryString()}`}>
				<a title={`Browse ${childToString()} work`}>{children}</a>
			</Link>
		</li>
	);
}

Skill.defaultProps = {
	children: "Skill example",
};

Skill.propTypes = {
	children: PropTypes.string,
	q: PropTypes.string,
};

export default Skill;
