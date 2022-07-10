import Skill from "../components/Skill";

function SkillList() {
	return (
		<>
			<h2>Skills</h2>
			<div className="skills-container">
				<ul className="skills">
					<h3>Front end</h3>
					<Skill>NextJS</Skill>
					<Skill>ReactJS</Skill>
					<Skill>Liquid</Skill>
					<Skill>TailwindCSS</Skill>
					<Skill>jQuery</Skill>
					<Skill>Bootstrap</Skill>
				</ul>
				<ul className="skills">
					<h3>Back end</h3>
					<Skill>NextJS</Skill>
					<Skill>Node.js</Skill>
					<Skill>PHP</Skill>
					<Skill>Express.js</Skill>
					<Skill>MongoDB</Skill>
				</ul>
				<ul className="skills">
					<h3>Languages</h3>
					<Skill>JavaScript</Skill>
					<Skill>TypeScript</Skill>
					<Skill>Python</Skill>
					<Skill>PHP</Skill>
					<Skill>HTML</Skill>
					<Skill>CSS</Skill>
				</ul>
				<ul className="skills">
					<h3>APIs</h3>
					<Skill>Shopify</Skill>
					<Skill>YouTube</Skill>
					<Skill>Twitch</Skill>
					<Skill>Spotify</Skill>
				</ul>
				<ul className="skills">
					<h3>Tools</h3>
					<Skill q="Git">Git + GitHub</Skill>
					<Skill>NPM</Skill>
					<Skill>Figma</Skill>
					<Skill>Adobe Photoshop</Skill>
					<Skill>Adobe Illustrator</Skill>
				</ul>
				<ul className="skills">
					<h3>Platforms</h3>
					<Skill>Shopify</Skill>
					<Skill>AWS</Skill>
					<Skill>Vercel</Skill>
					<Skill>Heroku</Skill>
					<Skill>Wordpress</Skill>
					<Skill>WooCommerce</Skill>
				</ul>
				<ul className="skills">
					<h3>Marketing</h3>
					<Skill>SEO</Skill>
					<Skill q="Meta Ads">Meta (Facebook/Instagram) Ads</Skill>
					<Skill>Google Analytics</Skill>
					<Skill>Google Console</Skill>
					<Skill>Moz Pro</Skill>
				</ul>
			</div>
		</>
	);
}

export default SkillList;
