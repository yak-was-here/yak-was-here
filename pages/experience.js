import BaseMeta from "../components/BaseMeta"
import Header from "../components/Header"

const experience = ({projectName = "New Breed Paintball & Airsoft"}) => {
    return (
        <>
            <BaseMeta title={`${projectName} - isaacyakl.com`} desc={`${projectName} experience details.`}></BaseMeta>
            <Header heading={projectName}></Header>
        </>
    )
}

export default experience