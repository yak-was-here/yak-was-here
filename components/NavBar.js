import PropTypes from 'prop-types'
import Link from 'next/link'

const NavBar = ({active}) => {
    return (
        <nav className="no-select">
            <div className="branding-container">
                <a href="/">
                    <img src="/img/yak-logo.svg" alt="yak Logo" title="Home" className="logo"/>
                    <span className="site-wordmark">Yak</span>
                </a>
            </div>
            <ul className="nav-menu">
                <Link href="/"><li className={`nav-menu-item ${active === "portfolio" ? "active" : ""}`}>Portfolio</li></Link>
                <Link href="/experience"><li className={`nav-menu-item ${active === "experience" ? "active" : ""}`}>Experience</li></Link>
                <Link href="/#hire"><li className={`nav-menu-item ${active === "hire" ? "active" : ""}`}>Hire</li></Link>
                <Link href="/#contact"><li className={`nav-menu-item ${active === "contact" ? "active" : ""}`}>Contact</li></Link>
            </ul>
        </nav>
    )
}

NavBar.defaultProps = {
    active: 'portfolio',
}

NavBar.propTypes = {
    active: PropTypes.string,
}


export default NavBar