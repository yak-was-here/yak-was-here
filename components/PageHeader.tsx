import PropTypes from "prop-types";

const PageHeader = ({ heading, className = "" }: { heading?: string; className?: string }) => {
	return (
		<header className={className}>
			<div className={`max-width m-auto p-2`}>
				<h1>{heading}</h1>
				<hr className="m-0" />
			</div>
		</header>
	);
};

PageHeader.defaultProps = {
	heading: "isaacyakl.com",
};

PageHeader.propTypes = {
	heading: PropTypes.string,
};

export default PageHeader;
