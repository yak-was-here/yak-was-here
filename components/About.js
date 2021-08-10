import Section from "./Section"
import RoleExperience from "./RoleExperience"

const About = () => {
    return (
        <Section>
          <h2>About</h2>
          <div id="role-experience">
            <RoleExperience time={3} role="Frontend Dev"/>
            <RoleExperience time={5} role="E-commerce Mgmt"/>
            <RoleExperience time={2} role="Digital Marketing"/>
          </div>
          <p>
            I focus on delivering value through usability, maintainability, and integrity. I am seeking a frontend position that offers experience with modern web architecture and global impact.
          </p>
        </Section>
    )
}

export default About