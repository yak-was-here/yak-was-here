import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Branding from "../components/Branding";

const NavBar = ({ active }) => {
	const [isNavMenuOpen, setNavMenuState] = useState(true); // Nav menu starts open

	return (
		<nav className="no-select">
			<div className="nav-dash">
				<Branding />
				<div className="hamburger" onClick={() => setNavMenuState(!isNavMenuOpen)}>
					<FontAwesomeIcon icon={faBars} />
				</div>
			</div>
			<ul className={`nav-menu${isNavMenuOpen ? " hidden" : ""}`}>
				<Link href="/experience" passHref>
					<a>
						<li className={`nav-menu-item${active === "experience" ? " active" : ""}`}>Experience</li>
					</a>
				</Link>
				<Link href="/#hire" passHref>
					<a>
						<li className={`nav-menu-item${active === "hire" ? " active" : ""}`}>Hire</li>
					</a>
				</Link>
				<Link href="/#contact" passHref>
					<a>
						<li className={`nav-menu-item${active === "contact" ? " active" : ""}`}>Contact</li>
					</a>
				</Link>
			</ul>
		</nav>
	);
};

NavBar.defaultProps = {
	active: "portfolio",
};

NavBar.propTypes = {
	active: PropTypes.string,
};

export default NavBar;
