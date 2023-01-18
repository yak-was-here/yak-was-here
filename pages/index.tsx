import BaseMeta from "../components/BaseMeta";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "../components/About";
import Link from "next/link";
import { FaSpotify, FaBriefcase } from "react-icons/fa";
import { RxCrosshair1 } from "react-icons/rx";
import { IoDocumentText } from "react-icons/io5";
export default function Home() {
	return (
		<>
			<BaseMeta />
			<NavBar active="home" />
			<Hero />
			<main>
				<section>
					<About showHeading={true} />
				</section>
				<section className="mb-4">
					<h2>Links</h2>
					<div className="flex flex-wrap justify-center items-center">
						<Link href="./work" className="btn cta-arrow text-center">
							<span className="inline-block align-middle mr-1">
								<FaBriefcase className="h-[1em] w-[1em] text-white" />
							</span>
							<span className="inline-block align-middle text-white">Browse work</span>
						</Link>
						<Link href="./work" className="btn cta-arrow text-center">
							<span className="inline-block align-middle mr-1 text-white">
								<IoDocumentText className="h-[1em] w-[1em]" />
							</span>
							<span className="inline-block align-middle text-white">View résumé</span>
						</Link>
						<div className="w-screen">
							<hr className="w-40" />
						</div>
						<Link href="https://open.spotify.com/user/izacktheyak/playlists" className="btn text-center">
							<span className="inline-block align-middle mr-1">
								<FaSpotify className="h-[1em] w-[1em] text-white" />
							</span>
							<span className="inline-block align-middle text-white">Spotify Playlists</span>
						</Link>
						<Link href="https://nsfpgaming.com" className="btn text-center">
							<span className="inline-block align-middle mr-1">
								<RxCrosshair1 className="h-[1em] w-[1em] text-white" />
							</span>
							<span className="inline-block align-middle text-white">NSFP Gaming</span>
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
