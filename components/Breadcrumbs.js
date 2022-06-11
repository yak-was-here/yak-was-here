import PropTypes from "prop-types";
import Link from "next/link";
import React from "react";

function Breadcrumbs({ trail, className = "" }) {
	return (
		<section className={`max-page-width breadcrumbs ${className}`}>
			{trail.map((link, index, ar) => {
				return (
					<React.Fragment key={link.text}>
						{ar.length - 1 !== index ? (
							<>
								<Link href={link.link}>{link.text}</Link>&nbsp;&gt;&nbsp;
							</>
						) : (
							<>{link.text}</>
						)}
					</React.Fragment>
				);
			})}
		</section>
	);
}

Breadcrumbs.defaultProps = {
	trail: [
		{
			text: "Home",
			link: "/",
		},
	],
};
Breadcrumbs.propTypes = {
	trail: PropTypes.array,
};

export default Breadcrumbs;
