import BaseMeta from "../components/BaseMeta"
import NavBar from '../components/NavBar'
import Header from "../components/Header"

const experience = ({projectName = "New Breed Paintball & Airsoft"}) => {
    return (
        <>
            <BaseMeta title={`${projectName} - isaacyakl.com`} desc={`${projectName} experience details.`}></BaseMeta>
            <NavBar active="experience"></NavBar>
            <Header heading={projectName}></Header>
        </>
    )
}

export default experience