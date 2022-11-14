import Link from "next/link";

const WorkTags = ({ tags }: { tags: Array<string> }) => {
	return (
        <ul className="work-tags">
			{tags.map((t) => {
				return (
                    <li key={t}>
						<Link href={`/work?q=${encodeURIComponent(t)}`} title={`Browse more ${t} work`}>
							{t}
						</Link>
					</li>
                );
			})}
		</ul>
    );
};

export default WorkTags;
