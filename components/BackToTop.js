import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BackToTop() {
	const router = useRouter();
	const [showBTT, setShowBTT] = useState(false);

	useEffect(() => {
		const renderBTT = () => {
			if (document.querySelector("main").clientHeight > window.innerHeight * 2 && window.pageYOffset > window.innerHeight * 0.85) {
				setShowBTT(true);
				return;
			}
			setShowBTT(false);
		};
		router.events.on("routeChangeComplete", renderBTT);
		window.addEventListener("resize", renderBTT);
		window.addEventListener("scroll", renderBTT);
		renderBTT();
		return () => {
			router.events.off("routeChangeComplete", renderBTT);
			window.removeEventListener("resize", renderBTT);
			window.removeEventListener("scroll", renderBTT);
		};
	}, []);

	return (
		<>
			{/* https://www.kindacode.com/article/how-to-create-a-scroll-to-top-button-in-react/ */}
			{showBTT && (
				<button
					id="backToTop"
					title="Back to top"
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
				>
					<FontAwesomeIcon icon={faAngleUp} />
				</button>
			)}
		</>
	);
}
