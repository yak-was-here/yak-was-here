import Link from "next/link";

const WorkTags = ({ tags }) => {
	return (
		<ul className="work-tags">
			{tags.map((t) => {
				return (
					<Link href={`/work?q=${t}`} key={t}>
						<a title={`Browse more ${t} work`}>
							<li>{t}</li>
						</a>
					</Link>
				);
			})}
		</ul>
	);
};

export default WorkTags;
