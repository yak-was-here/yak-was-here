import PropTypes from "prop-types";

const RoleExperience = ({ time, unit, role }) => {
	return (
		<div className="role-experience-container">
			<div className="role-experience-time">{time}</div>
			<div className="role-experience-unit">{unit}</div>
			<div className="role-experience-role">{role}</div>
		</div>
	);
};

RoleExperience.defaultProps = {
	time: 0,
	unit: "Years",
	role: "Your Role",
};

RoleExperience.propTypes = {
	time: PropTypes.number,
	unit: PropTypes.string,
	role: PropTypes.string,
};

export default RoleExperience;
