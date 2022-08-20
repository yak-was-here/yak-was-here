import { intro } from "../data/meta";

function About() {
	return (
		<div className="intro">
			<h2>About</h2>
			<p>Hi! My name is Isaac, but most people call me &quot;yak&quot;.</p>
			<p dangerouslySetInnerHTML={{ __html: intro }}></p>
		</div>
	);
}

export default About;
