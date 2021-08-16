import Section from "./Section";

const Skills = () => {
	return (
		<Section>
			<h2>Skills</h2>
			<div className="skills-container">
				<ul className="skills">
					<h3>Web Tech</h3>
					<li>React.js</li>
					<li>Next.js</li>
					<li>jQuery</li>
					<li>SASS / PostCSS</li>
					<li>Shopify Liquid</li>
				</ul>
				<ul className="skills">
					<h3>Tools</h3>
					<li>Git / GitHub</li>
					<li>NPM</li>
					<li>Figma</li>
					<li>Adobe Photoshop</li>
					<li>Adobe Illustrator</li>
				</ul>
				<ul className="skills">
					<h3>Platforms</h3>
					<li>AWS</li>
					<li>Heroku</li>
					<li>Shopify</li>
					<li>WordPress</li>
					<li>WooCommerce</li>
				</ul>
				<ul className="skills">
					<h3>Marketing</h3>
					<li>SEO</li>
					<li>Facebook Ads</li>
					<li>Google Analytics</li>
					<li>Google Console</li>
				</ul>
			</div>
		</Section>
	);
};

export default Skills;
