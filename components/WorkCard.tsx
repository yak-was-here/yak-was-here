import Image from "next/image";
import Link from "next/link";
import { title } from "../data/meta";

const WorkCard = ({ id, title, date, role, image, summary }: { id: string; title: string; date: string; role: string; image: string; summary: string }) => {
	const roleHeading = () => {
		return <h3>{role}</h3>;
	};
	const dateHeading = () => {
		return <h3>{date}</h3>;
	};
	return (
		<Link href={`/work/${id}`} title={`View ${title}`} className="block !text-black hover:!no-underline col-span-2 xl:col-span-1 row-span-1 transition-all duration-500 ease-in-out saturate-[80%] hover:saturate-[125%]">
			<div className="flex flex-col h-[500px] rounded overflow-hidden border border-neutral-200">
				<div className="relative w-full h-[250px] grow shrink-0 overflow-hidden">
					<Image src={`/img/work/${image}`} className="object-cover" alt={`${title} screenshot`} fill />
				</div>
				<div className="w-full bg-yak-cyan h-1 grow-0 shrink-0"></div>
				<div className="w-full bg-cyan-700 h-1 grow-0 shrink-0"></div>
				<div className="w-full grow-0 shrink p-2">
					<h2 className="text-black no-underline">{title}</h2>
					{role ? roleHeading() : ``}
					{date ? dateHeading() : ``}
					<p className="summary-body" dangerouslySetInnerHTML={{ __html: summary }}></p>
				</div>
			</div>
		</Link>
	);
};

WorkCard.defaultProps = {
	id: title,
	title: "",
	date: "",
	role: "",
	image: "",
	summary: "",
};

export default WorkCard;
