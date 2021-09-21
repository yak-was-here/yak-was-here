import Link from "next/link";

const ExperienceTags = ({ tags }) => {
	return (
		<ul className="experience-tags">
			{tags.map((t) => {
				return (
					<Link href={`/experiences?q=${t}`} key={t} passHref>
						<a>
							<li>{t}</li>
						</a>
					</Link>
				);
			})}
		</ul>
	);
};

export default ExperienceTags;
