import { intro } from "../data/meta";

function About() {
	return (
		<div className="intro">
			<h2>About</h2>
			<p dangerouslySetInnerHTML={{ __html: intro }}></p>
		</div>
	);
}

export default About;
