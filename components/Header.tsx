import PropTypes from "prop-types";

const Header = ({ heading }: { heading?: string }) => {
	return (
		<header>
			<div className="max-width
				<h1>{heading}</h1>
				<hr className="m-0" />
			</div>
		</header>
	);
};

Header.defaultProps = {
	heading: "isaacyakl.com",
};

Header.propTypes = {
	heading: PropTypes.string,
};

export default Header;
