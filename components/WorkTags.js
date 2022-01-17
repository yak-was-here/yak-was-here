import Link from "next/link";

const WorkTags = ({ tags }) => {
	return (
		<ul className="work-tags">
			{tags.map((t) => {
				return (
					<Link href={`/work?q=${t}`} key={t} passHref>
						<a>
							<li>{t}</li>
						</a>
					</Link>
				);
			})}
		</ul>
	);
};

export default WorkTags;
