import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ id, title, date, image, summary }) => {
	return (
		<Link href={`/work/${id}`} passHref>
			<div className="work-card">
				<Image className="word-card-image" src={`/img/work/${image}`} layout="responsive" width="100%" height="60vh" objectFit="cover" objectPosition="center top" alt={title} />
				<div className="work-card-border"></div>
				<div className="work-card-summary">
					<h3>{title}</h3>
					<h4 className="work-date">{date}</h4>
					<p className="summary-body" dangerouslySetInnerHTML={{ __html: summary }}></p>
				</div>
			</div>
		</Link>
	);
};

export default WorkCard;
