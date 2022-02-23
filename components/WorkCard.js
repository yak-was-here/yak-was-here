import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ id, title, date, image, summary }) => {
	return (
		<div className="work-card">
			<Link href={`/work/${id}`} passHref>
				<a>
					<Image className="word-card-image" src={`/img/work/${image}`} layout="responsive" width="100%" height="60vh" objectFit="cover" objectPosition="center top" alt={title} />
				</a>
			</Link>
			<div className="work-card-border"></div>
			<div className="work-card-summary">
				<Link href={`/work/${id}`} passHref>
					<a>
						<h3>{title}</h3>
					</a>
				</Link>
				<h6 className="work-date">{date}</h6>
				<p className="summary-body" dangerouslySetInnerHTML={{ __html: summary }}></p>
			</div>
		</div>
	);
};

export default WorkCard;
