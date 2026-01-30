import Link from "next/link";
import React from "react";

type Crumb = {
    text: string;
    link: string;
};

function Breadcrumbs({
    trail = [
        {
            text: "Home",
            link: "/",
        },
    ],
    className = "",
}: {
    trail?: Crumb[];
    className?: string;
}) {
    return (
        <div className={`max-width m-auto flex flex-wrap content-around items-center justify-end text-lg md:text-xs p-2 ${className}`}>
            {trail.map((link, index, ar) => {
                return (
                    <React.Fragment key={link.text}>
                        {ar.length - 1 !== index ? (
                            <>
                                <Link href={link.link}>{link.text}</Link>
                                &nbsp;&#47;&nbsp;
                            </>
                        ) : (
                            <>{link.text}</>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;
