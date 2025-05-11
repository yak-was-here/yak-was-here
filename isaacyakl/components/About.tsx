import { intro } from "../data/meta";
import PropTypes from "prop-types";

function About({ showHeading }: { showHeading: boolean }) {
	const renderHeading = () => {
		return showHeading ? <h2>About</h2> : <></>;
	};
	return (
		<div id="about">
			{renderHeading()}
			<p>Hi! My name is Isaac, but most people call me &quot;yak&quot;.</p>
			<p dangerouslySetInnerHTML={{ __html: intro }}></p>
		</div>
	);
}

About.defaultProps = {
	showHeading: true,
};

About.propTypes = {
	showHeading: PropTypes.bool,
};

export default About;
