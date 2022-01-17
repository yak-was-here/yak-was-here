import PropTypes from "prop-types";

const PositionExperience = ({ time, unit, position }) => {
	return (
		<div className="position-experience-container">
			<div className="position-experience-time">{time}</div>
			<div className="position-experience-unit">{unit}</div>
			<div className="position-experience-position">{position}</div>
		</div>
	);
};

PositionExperience.defaultProps = {
	time: 0,
	unit: "Years",
	position: "Your Position",
};

PositionExperience.propTypes = {
	time: PropTypes.number,
	unit: PropTypes.string,
	position: PropTypes.string,
};

export default PositionExperience;
