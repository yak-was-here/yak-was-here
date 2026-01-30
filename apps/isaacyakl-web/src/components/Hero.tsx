import ContactIcons from "./ContactIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fName, lName, title, location, acceptingWork } from "../data/meta";
import EmailLink from "./EmailLink";

function Hero() {
	const renderWorkStatus = () => {
		if (acceptingWork) {
			return (
				<EmailLink>
					<div className="text-white flex flex-nowrap py-2 px-3 my-2 rounded items-center bg-yak-green">
						<FontAwesomeIcon icon={faCheck} className="h-3 w-3 mr-1" />
						<span className="block">Accepting work</span>
					</div>
				</EmailLink>
			);
		}
	};

	return (
        <header className="min-h-screen">
            <div className="max-width m-auto min-h-screen p-2 flex flex-col justify-center items-start overflow-hidden">
                <h1 className="transition-all duration-100 ease text-[20vw] leading-[16vw] xl:text-[11vw] xl:leading-[8.8vw] py-2 -ml-[0.039em]">
                    {fName}
                    <br />
                    {lName}
                </h1>
                <hr className="m-0 w-[20vw] my-1" />
                <div className="py-2 text-lg">
                    <div className="flex flex-nowrap mb-[0.33em]">
                        <FontAwesomeIcon
                            icon={faBriefcase}
                            className="h-[1.3em] w-[1.3em] mr-[0.33em]"
                        />
                        <span className="inline-block h-[1.3em]">{title}</span>
                    </div>
                    <div className="flex flex-nowrap">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="h-[1.3em] w-[1.3em] mr-[0.33em]"
                        />
                        <span className="inline-block h-[1.3em]">
                            {location}
                        </span>
                    </div>
                </div>
                <ContactIcons id="social" />
            </div>
        </header>
    );
}

export default Hero;
