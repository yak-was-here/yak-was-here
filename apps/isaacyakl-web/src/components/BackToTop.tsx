"use client";

import { type JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TfiAngleUp } from "react-icons/tfi";

export default function BackToTop(): JSX.Element {
	const pathname = usePathname();
	const [showBTT, setShowBTT] = useState(false);

	useEffect(() => {
		const renderBTT = () => {
			const mainEl = document.querySelector("main") ?? document.querySelector("body") ?? document.querySelector("html") ?? null;
			if (mainEl && mainEl.clientHeight > window.innerHeight * 2 && window.pageYOffset > window.innerHeight * 0.85) {
				setShowBTT(true);
				return;
			}
			setShowBTT(false);
		};
		window.addEventListener("resize", renderBTT);
		window.addEventListener("scroll", renderBTT);
		renderBTT();
		return () => {
			window.removeEventListener("resize", renderBTT);
			window.removeEventListener("scroll", renderBTT);
		};
	}, [pathname]);

	return (
		<>
			{/* https://www.kindacode.com/article/how-to-create-a-scroll-to-top-button-in-react/ */}
			{showBTT && (
				<button
					id="backToTop"
					title="Back to top"
					className="fixed w-auto bottom-0 right-0 text-black cursor-pointer bg-transparent z-100 transition-all duration-500 ease-in-out hover:bg-transparent"
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				>
					<TfiAngleUp className="h-12 w-12" />
				</button>
			)}
		</>
	);
}
