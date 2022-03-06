const Section = ({ children, style, className }) => {
	return (
		<section style={style} className={className}>
			{children}
		</section>
	);
};

export default Section;
