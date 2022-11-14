import Link from "next/link";
import EmailLink from "./EmailLink";
import PropTypes from "prop-types";

function CtaBtn({ text, href }: { text: string; href: string }) {
	const generateBtn = () => {
		if (href === "") {
			return (
				<EmailLink>
					<button className="btn cta cta-arrow">{text}</button>
				</EmailLink>
			);
		}
		return (
            (<Link href={href} passHref>

                <button className="btn cta cta-arrow">{text}</button>

            </Link>)
        );
	};

	return <div className="cta-btn-container no-select">{generateBtn()}</div>;
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
