import Image from "next/image";
import Link from "next/link";
import ExperienceTags from "./ExperienceTags";

const ExperienceCard = ({ id, title, image, tags, body }) => {
	return (
		<div className="experience-card">
			<Link href={`/experience/${id}`} passHref>
				<a>
					<Image src={`/img/experiences/${image}`} layout="responsive" width="300" height="175" />
					<h3>{title}</h3>
				</a>
			</Link>
			<ExperienceTags tags={tags} />
			<p className="summary-body" dangerouslySetInnerHTML={{ __html: body }}></p>
		</div>
	);
};

export default ExperienceCard;
