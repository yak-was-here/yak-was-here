import ImageSlider from "./ImageSlider";

const ExperienceSection = ({ sections }) => {
	return sections.map((s, i) => {
		return (
			<div key={i}>
				{s.title !== "" ? <h3>{s.title}</h3> : ``}
				{s.images !== undefined && s.images.length > 0 ? <ImageSlider images={s.images} /> : ``}
				{s.body !== "" ? <p dangerouslySetInnerHTML={{ __html: s.body }}></p> : ``}
			</div>
		);
	});
};

export default ExperienceSection;
