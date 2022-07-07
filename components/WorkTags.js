import Link from "next/link";

const WorkTags = ({ tags }) => {
	return (
		<ul className="work-tags">
			{tags.map((t) => {
				return (
					<li key={t}>
						<Link href={`/work?q=${encodeURIComponent(t)}`}>
							<a title={`Browse more ${t} work`}>{t}</a>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default WorkTags;
