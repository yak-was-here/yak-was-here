import Link from "next/link";
import PropTypes from "prop-types";

function Skill({ children, q }) {
	return (
		<li>
			<Link href={`/work?q=${q ? q : children}`}>
				<a title={`Browse ${children} work`}>{children}</a>
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
