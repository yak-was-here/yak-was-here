import Link from "next/link";

function ExperienceTimeline() {
	return <>
        <h2>Experience</h2>
        <div className="experience-timeline">
            <h3>2020-Present</h3>
            <p>
                Web Developer &amp; Digital Marketer
                <span>
                    <Link href="/work/newbreedpb" title="View this work experience">
                        New Breed Paintball &amp; Airsoft
                    </Link>
                </span>
            </p>
            <h3>2018-Present</h3>
            <p>
                Web Developer <span>Freelance</span>
            </p>
            <h3>2014-2016</h3>
            <p>
                Web Developer &amp; Digital Marketer
                <span>
                    <Link href="/work/yourpbfriend" title="View this work experience">
                        YourPbFriend
                    </Link>
                </span>
            </p>
            <h3>2013</h3>
            <p>
                Web Designer <span>Freelance</span>
            </p>
        </div>
    </>;
}

export default ExperienceTimeline;
