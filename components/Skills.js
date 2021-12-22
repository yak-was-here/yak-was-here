import Section from "./Section";

const Skills = () => {
	return (
		<Section>
			<h2>Skills</h2>
			<div className="skills-container">
				<ul className="skills">
					<h3>Web Tech</h3>
					<li>Next.js</li>
					<li>React.js</li>
					<li>jQuery</li>
					<li>Shopify Liquid</li>
					<li>TailwindCSS</li>
					<li>Bootstrap</li>
				</ul>
				<ul className="skills">
					<h3>Tools</h3>
					<li>Git</li>
					<li>GitHub</li>
					<li>NPM</li>
					<li>Scrum</li>
					<li>Figma</li>
					<li>Adobe Photoshop</li>
				</ul>
				<ul className="skills">
					<h3>Platforms</h3>
					<li>Vercel</li>
					<li>Shopify</li>
					<li>WooCommerce</li>
					<li>WordPress</li>
					<li>Heroku</li>
					<li>AWS</li>
				</ul>
				<ul className="skills">
					<h3>Marketing</h3>
					<li>SEO</li>
					<li>Facebook/Instagram Ads</li>
					<li>Google Analytics</li>
					<li>Google Console</li>
					<li>Moz Pro</li>
				</ul>
			</div>
		</Section>
	);
};

export default Skills;
