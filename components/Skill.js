import Link from "next/link";
import PropTypes from "prop-types";

function Skill({ children, q }) {
	return (
		<Link href={`/work?q=${q ? q : children}`}>
			<a title={`Browse ${children} work`}>
				<li>{children}</li>
			</a>
		</Link>
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
