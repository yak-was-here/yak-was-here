import PropTypes from "prop-types";
import Link from "next/link";
import React from "react";

type Crumb = {
	text: string;
	link: string;
};

function Breadcrumbs({ trail, className = "" }: { trail: Array<Crumb>; className?: string }) {
	return (
		<div className={`max-width m-auto flex flex-wrap content-around items-center justify-end text-xs p-2 ${className}`}>
			{trail.map((link, index, ar) => {
				return (
					<React.Fragment key={link.text}>
						{ar.length - 1 !== index ? (
							<>
								<Link href={link.link}>{link.text}</Link>
								&nbsp;&#47;&nbsp;
							</>
						) : (
							<>{link.text}</>
						)}
					</React.Fragment>
				);
			})}
		</div>
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
