import Link from "next/link";
import EmailLink from "./EmailLink";
import PropTypes from "prop-types";

function CtaBtn({ text, href }: { text: string; href: string }) {
	const generateBtn = () => {
		if (href === "") {
			return (
				<EmailLink>
					<button className="btn cta-arrow w-full py-2 text-center select-none">{text}</button>
				</EmailLink>
			);
		}
		return (
			<Link href={href} passHref>
				<button className="btn cta-arrow w-full py-2 text-center select-none">{text}</button>
			</Link>
		);
	};

	return generateBtn();
}

CtaBtn.defaultProps = {
	text: "Contact me",
	href: "",
};
CtaBtn.propTypes = {
	text: PropTypes.string,
	href: PropTypes.string,
};

export default CtaBtn;
