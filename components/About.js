import Section from "./Section";
import PositionExperience from "./PositionExperience";

const About = () => {
	return (
		<Section>
			<h2>About</h2>
			<div id="position-experience">
				<PositionExperience time={3} position="Frontend Dev" />
				<PositionExperience time={5} position="E-commerce Mgmt" />
				<PositionExperience time={2} position="Digital Marketing" />
			</div>
			<p>I focus on delivering value through usability, maintainability, and integrity. I am seeking work that offers experience with modern web architecture and practices as well as global impact.</p>
		</Section>
	);
};

export default About;
