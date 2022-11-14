import PropTypes from "prop-types";
import Link from "next/link";
import React from "react";

type Crumb = {
	text: string;
	link: string;
};

function Breadcrumbs({ trail, className = "" }: { trail: Array<Crumb>; className?: string }) {
	return (
        <section className={`max-page-width breadcrumbs ${className}`}>
			{trail.map((link, index, ar) => {
				return (
                    <React.Fragment key={link.text}>
						{ar.length - 1 !== index ? (
							<>
								<Link href={link.link} legacyBehavior>{link.text}</Link>&nbsp;&gt;&nbsp;
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
