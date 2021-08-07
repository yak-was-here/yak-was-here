import PropTypes from 'prop-types'

const NavBar = ({active}) => {
    return (
        <nav>
            <div className="branding-container">
                <a href="/">
                    <img src="/img/yak-logo.svg" alt="yak Logo" title="Home" className="logo"/>
                    <span className="site-wordmark">Yak</span>
                </a>
            </div>
            <ul className="nav-menu">
                <a href="/"><li className={`nav-menu-item ${active === "portfolio" ? "active" : ""}`}>Portfolio</li></a>
                <a href="/experience"><li className={`nav-menu-item ${active === "experience" ? "active" : ""}`}>Experience</li></a>
                <a href="/"><li className={`nav-menu-item ${active === "hire" ? "active" : ""}`}>Hire</li></a>
                <a href="/#contact"><li className={`nav-menu-item ${active === "contact" ? "active" : ""}`}>Contact</li></a>
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