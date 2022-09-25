import PropTypes from "prop-types";
import React from "react";
import CtaBtn from "./CtaBtn";

function ServicePackage({ children, name, href, price }: { children: React.ReactNode; name?: string; href?: string; price?: string }) {
	const getCTABtn = () => {
		if (href === null || href === "") return <CtaBtn />;
		else <CtaBtn href={href} />;
	};

	return (
		<div className="service-package">
			<h2>{name}</h2>
			{children}
			<p style={{ textAlign: "right" }}>{price}</p>
			<div className="text-center">{getCTABtn()}</div>
		</div>
	);
}

ServicePackage.defaultProps = {
	name: "Sample package",
	href: null,
	price: "$0",
};

ServicePackage.propTypes = {
	name: PropTypes.string,
	href: PropTypes.string,
	price: PropTypes.string,
};

export default ServicePackage;
