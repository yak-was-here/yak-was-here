import Link from "next/link";
import React from "react";
import { siteURL } from "../data/meta";

function Skill({ children, absoluteURL = false, className = "" }: { children: React.ReactNode; className?: string; q?: string; absoluteURL?: boolean }) {
    const childToString = () => {
        return children?.toString() ?? "Skill example";
    };
    const setQueryString = (q?: string) => {
        return q ? encodeURIComponent(q) : encodeURIComponent(childToString());
    };

    const checkAbsoluteURL = () => {
        return absoluteURL ? siteURL.substring(0, siteURL.length - 1) : "";
    };

    return (
        <li className={`${className}`}>
            <Link href={`${checkAbsoluteURL()}/work?q=${setQueryString()}`} title={`Browse ${childToString()} work`}>
                {children}
            </Link>
        </li>
    );
}

export default Skill;
