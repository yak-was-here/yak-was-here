import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/yak-logo.svg";
import { nick } from "../data/meta";

const Branding = () => {
	return (
		<div className="justify-self-start">
			<Link href="/" title="Home" className="text-black no-underline">
				<div className="relative inline-block h-7 w-7">
					<Image className="object-contain" src={logo} alt="yak logo" fill />
				</div>
				<span className="heading-font-family text-black text-4xl font-thin pl-1">{nick}</span>
			</Link>
		</div>
	);
};

export default Branding;
