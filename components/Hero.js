import ContactIcons from "./ContactIcons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'


function Hero() {
    return (
        <header className="hero">
            <div className="header-container">
                <h1 className="hero-title no-select">
                    Isaac<br/>
                    Litzenberger
                </h1>
                <hr/>
                <div className="seeking no-select">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />San Francisco Bay Area<br/>
                    <FontAwesomeIcon icon={faLaptopCode} />Frontend Developer
                </div>
                <ContactIcons/>
            </div>
        </header>
    )
}

export default Hero
