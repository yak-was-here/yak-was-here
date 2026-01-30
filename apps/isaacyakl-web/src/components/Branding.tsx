import Link from "next/link";
import Image from "next/image";
import { nick } from "../data/meta";

const Branding = ({ inFooter = false }: { inFooter?: boolean }) => {
	const createBranding = () => {
		if (inFooter) {
			return (
				<div className="justify-self-start">
					<div className="relative inline-block h-[0.85rem] w-[0.85rem] pr-1">
						<Image className="object-contain" src="/img/yak-logo.svg" alt="yak logo" fill />
					</div>
					<span className="heading-font-family text-black text-lg font-thin">{nick}</span>
				</div>
			);
		} else {
			return (
				<div className="justify-self-start">
					<Link href="/" title="Home" className="text-black no-underline hover:no-underline! ">
						<div className="relative inline-block h-7 w-7 pr-1">
							<Image className="object-contain" src="/img/yak-logo.svg" alt="yak logo" fill />
						</div>
						<span className="heading-font-family text-black text-4xl font-thin">{nick}</span>
					</Link>
				</div>
			);
		}
	};

	return createBranding();
};

export default Branding;
