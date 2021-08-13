import PropTypes from "prop-types";
import Link from "next/link";

const NavBar = ({ active }) => {
	return (
		<nav className="no-select">
			<Link href="/">
				<a>
					<div className="branding-container">
						<img src="/img/yak-logo.svg" alt="yak Logo" title="Home" className="logo" />
						<span className="site-wordmark">Yak</span>
					</div>
				</a>
			</Link>
			<ul className="nav-menu">
				<Link href="/experience">
					<a>
						<li className={`nav-menu-item ${active === "experience" ? "active" : ""}`}>Experience</li>
					</a>
				</Link>
				<Link href="/#hire">
					<a>
						<li className={`nav-menu-item ${active === "hire" ? "active" : ""}`}>Hire</li>
					</a>
				</Link>
				<Link href="/#contact">
					<a>
						<li className={`nav-menu-item ${active === "contact" ? "active" : ""}`}>Contact</li>
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
