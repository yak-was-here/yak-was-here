import Image from 'next/image'
import yakLogo from '../public/img/yak-logo.png'

const NavBar = () => {
    return (
        <nav>
            <Image src={yakLogo} alt="yak Logo" className="logo" height="42" width="42"/>
            <span className="site-wordmark">Yak</span>
            <ul className="nav-menu">
                <li className="nav-menu-item">Portfolio</li>
                <li className="nav-menu-item">Experience</li>
                <li className="nav-menu-item">Hire</li>
                <li className="nav-menu-item">Contact</li>
            </ul>
        </nav>
    )
}

export default NavBar