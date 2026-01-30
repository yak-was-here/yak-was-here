import Link from "next/link";
import EmailLink from "./EmailLink";

function CtaBtn({ text = "Contact me", href = "", onClick }: { text?: string; href?: string; onClick?: () => void }) {
    const generateBtn = () => {
        if (onClick) {
            return (
                <button
                    className="btn cta-arrow w-full py-2 text-center select-none"
                    onClick={onClick}
                >
                    {text}
                </button>
            );
        }
        if (href === "") {
            return (
                <EmailLink>
                    <button className="btn cta-arrow w-full py-2 text-center select-none">{text}</button>
                </EmailLink>
            );
        }
        return (
            <Link href={href}>
                <button className="btn cta-arrow w-full py-2 text-center select-none">{text}</button>
            </Link>
        );
    };

    return generateBtn();
}

export default CtaBtn;
