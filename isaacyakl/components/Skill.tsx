import Link from "next/link";
import React from "react";
import { siteURL } from "../data/meta";

function Skill({ children = "Skill example", absoluteURL = false, className = "" }: { children: React.ReactNode | string; className?: string; q?: string; absoluteURL?: boolean }) {
    const childToString = () => {
        // React.isValidElement - https://stackoverflow.com/a/65829088/13254325
        return Array.isArray(children) ? children[0].props.children : children && typeof children === "object" && React.isValidElement(children) ? children.props.children : children;
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
