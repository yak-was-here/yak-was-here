import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ id, title, date, role, image, summary }) => {
	return (
		<Link href={`/work/${id}`}>
			<a title={`View ${title}`}>
				<div className="work-card">
					<Image className="word-card-image" src={`/img/work/${image}`} layout="responsive" width="100%" height="60vh" objectFit="cover" objectPosition="center top" alt={title} />
					<div className="work-card-border"></div>
					<div className="work-card-summary">
						<h2>{title}</h2>
						<h3>{`${role}${role ? " — " : ""}${date}`}</h3>
						<p className="summary-body" dangerouslySetInnerHTML={{ __html: summary }}></p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default WorkCard;
