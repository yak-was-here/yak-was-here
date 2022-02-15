import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ id, title, date, image, summary }) => {
	return (
		<div className="work-card">
			<Link href={`/work/${id}`} passHref>
				<a>
					<Image src={`/img/work/${image}`} layout="responsive" width="300" height="175" alt={title} />
					<h3>{title}</h3>
				</a>
			</Link>
			<h6 className="work-date">{date}</h6>
			<p className="summary-body" dangerouslySetInnerHTML={{ __html: summary }}></p>
		</div>
	);
};

export default WorkCard;
