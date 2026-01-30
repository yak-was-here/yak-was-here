import { intro } from "../data/meta";

function About({ showHeading = true }) {
    const renderHeading = () => {
        return showHeading ? <h2>About</h2> : <></>;
    };
    return (
        <div id="about">
            {renderHeading()}
            <p>Hi! My name is Isaac, but most people call me &quot;yak&quot;.</p>
            <p dangerouslySetInnerHTML={{ __html: intro }}></p>
        </div>
    );
}

export default About;
