import Link from "next/link";

const WorkTags = ({ tags }: { tags: Array<string> }) => {
	return (
		<ul className="flex flex-wrap list-none m-0 p-0">
			{tags.map((t) => {
				return (
					<li className="m-0 p-0" key={t}>
						<Link href={`/work?q=${encodeURIComponent(t)}`} className="block btn w-auto text-white visited:text-white bg-yak-cyan text-center" title={`Browse more ${t} work`}>
							{t}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default WorkTags;
