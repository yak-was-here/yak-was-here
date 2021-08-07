import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'

const ContactIcons = () => {
    return (
    <div className="social-icons">
        <a href="https://www.instagram.com/isaacyakl" title="" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.twitter.com/isaacyakl" title="" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.github.com/isaacyakl" title="" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="***REMOVED***" title="" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faAt} />
        </a>
    </div>
    )
}

export default ContactIcons