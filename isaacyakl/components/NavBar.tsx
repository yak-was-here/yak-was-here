import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Branding from "./Branding";

const NavBar = ({ active = "home", className = "" }) => {
    const [isNavMenuOpen, setNavMenuState] = useState(true); // Nav menu starts open

    return (
        <nav className={`max-width m-auto p-2 select-none ${className}`}>
            <div id="top" className="grid grid-cols-2 items-center">
                <Branding />
                <div
                    className="justify-self-end cursor-pointer dont-print"
                    onClick={() => setNavMenuState(!isNavMenuOpen)}
                    role="menu"
                    aria-owns="home-menuitem work-menuitem resume-menuitem contact-menuitem more-menuitem"
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="w-[1.68rem] h-[1.68rem]"
                    />
                </div>
            </div>
            <ul
                className={`heading-font-family flex flex-col items-stretch text-lg xl:text-base list-none transition-all ease-in-out duration-500 max-h-56 overflow-hidden p-0 bg-white font-thin text-right tracking-[0.15rem] dont-print${
                    isNavMenuOpen ? " max-h-0" : ""
                }`}
            >
                <li id="home-menuitem" role="menuitem">
                    <Link href="/" className="hover:!no-underline">
                        <span
                            className={`block transition-none py-2 px-2 ${
                                active === "home"
                                    ? "text-yak-cyan bg-gray-200"
                                    : "text-black bg-white hover:text-yak-green hover:bg-gray-200 "
                            }`}
                        >
                            Home
                        </span>
                    </Link>
                </li>
                <li id="work-menuitem" title="Browse work" role="menuitem">
                    <Link href="/work" className="hover:!no-underline">
                        <span
                            className={`block transition-none py-2 px-2 ${
                                active === "work"
                                    ? "text-yak-cyan bg-gray-200"
                                    : "text-black bg-white hover:text-yak-green hover:bg-gray-200 "
                            }`}
                        >
                            Work
                        </span>
                    </Link>
                </li>
                <li id="resume-menuitem" title="View resume" role="menuitem">
                    <Link href="/resume" className="hover:!no-underline">
                        <span
                            className={`block transition-none py-2 px-2 ${
                                active === "resume"
                                    ? "text-yak-cyan bg-gray-200"
                                    : "text-black bg-white hover:text-yak-green hover:bg-gray-200 "
                            }`}
                        >
                            Resume
                        </span>
                    </Link>
                </li>
                <li id="contact-menuitem" role="menuitem">
                    <Link href="/more#contact" className="hover:!no-underline">
                        <span
                            className={`block transition-none py-2 px-2 ${
                                active === "contact"
                                    ? "text-yak-cyan bg-gray-200"
                                    : "text-black bg-white hover:text-yak-green hover:bg-gray-200 "
                            }`}
                        >
                            Contact
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
