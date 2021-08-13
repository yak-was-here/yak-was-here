import PropTypes from "prop-types";

const Header = ({ heading }) => {
	return (
		<header>
			<div className="header-container">
				<h1>{heading}</h1>
				<hr />
			</div>
		</header>
	);
};

Header.defaultProps = {
	heading: "Experience",
};

Header.propTypes = {
	heading: PropTypes.string,
};

export default Header;
