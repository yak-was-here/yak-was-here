import Section from "./Section"
import YearsInRole from "./YearsInRole"

const About = () => {
    return (
        <Section>
          <h2>About</h2>
          <div id="years-in-role">
            <YearsInRole years="3" role="Frontend Dev"/>
            <YearsInRole years="5" role="E-commerce Mgmt"/>
            <YearsInRole years="2" role="Digital Marketing"/>
            <YearsInRole/>
          </div>
          <p>
            I focus on delivering value through usability, maintainability, and integrity. My aim is to gain experience at a company with modern web architecture and global impact.
          </p>
        </Section>
    )
}

export default About