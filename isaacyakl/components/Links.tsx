import Link from "next/link";
import { useRouter } from "next/router";
import { FaBriefcase, FaSpotify } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { RxCrosshair1 } from "react-icons/rx";
import { FcHome } from "react-icons/fc";

export default function Links({ showHeading = false }: { showHeading?: boolean }) {
	const router = useRouter();
	const getHeading = () => {
		if (showHeading) return <h2>Links</h2>;
		else return;
	};
	return (
		<section className="mb-4 w-full">
			{getHeading()}
			<div className="flex flex-wrap justify-center items-center">
				{router.pathname === "/more" ? (
					<Link href="./" className="btn text-center">
						<span className="inline-block align-middle mr-1">
							<FcHome className="h-[1em] w-[1em] text-white" />
						</span>
						<span className="inline-block align-middle text-white">Website</span>
					</Link>
				) : (
					""
				)}
				<Link href="./work" className="btn cta-arrow text-center">
					<span className="inline-block align-middle mr-1">
						<FaBriefcase className="h-[1em] w-[1em] text-white" />
					</span>
					<span className="inline-block align-middle text-white">Browse work</span>
				</Link>
				<Link href="./resume" className="btn cta-arrow text-center">
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
	);
}
