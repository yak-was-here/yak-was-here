import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Branding from "./Branding";
import EmailLink from "./EmailLink";

const NavBar = ({ active, className = "" }: { active?: string; className?: string }) => {
	const [isNavMenuOpen, setNavMenuState] = useState(true); // Nav menu starts open

	return (
		<nav className={`no-select ${className}`}>
			<div id="top" className="nav-dash">
				<Branding />
				<div className="hamburger dont-print" onClick={() => setNavMenuState(!isNavMenuOpen)} role="menu" aria-owns="home-menuitem work-menuitem resume-menuitem contact-menuitem more-menuitem">
					<FontAwesomeIcon icon={faBars} />
				</div>
			</div>
			<ul className={`nav-menu dont-print${isNavMenuOpen ? " hidden" : ""}`}>
				<li id="home-menuitem" className={`${active === "home" ? "active" : ""}`} role="menuitem">
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li id="work-menuitem" className={`${active === "work" ? "active" : ""}`} title="Browse work" role="menuitem">
					<Link href="/work">
						<a>Work</a>
					</Link>
				</li>
				<li id="resume-menuitem" className={`${active === "resume" ? "active" : ""}`} title="View résumé" role="menuitem">
					<Link href="/resume">
						<a>Résumé</a>
					</Link>
				</li>
				<li id="contact-menuitem" className={`${active === "contact" ? "active" : ""}`} role="menuitem">
					<EmailLink>Contact</EmailLink>
				</li>
				<li id="more-menuitem" className={`${active === "more" ? "active" : ""}`} title="More links" role="menuitem">
					<Link href="/more">
						<a>More</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

NavBar.defaultProps = {
	active: "home",
};

NavBar.propTypes = {
	active: PropTypes.string,
};

export default NavBar;
