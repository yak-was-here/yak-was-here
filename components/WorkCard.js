import Image from "next/image";
import Link from "next/link";
import WorkTags from "./WorkTags";

const WorkCard = ({ id, title, image, tags, body }) => {
	return (
		<div className="work-card">
			<Link href={`/work/${id}`} passHref>
				<a>
					<Image src={`/img/work/${image}`} layout="responsive" width="300" height="175" alt={title} />
					<h3>{title}</h3>
				</a>
			</Link>
			<WorkTags tags={tags} />
			<p className="summary-body" dangerouslySetInnerHTML={{ __html: body }}></p>
		</div>
	);
};

export default WorkCard;
