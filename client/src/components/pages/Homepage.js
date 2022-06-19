import {useNavigate} from "react-router-dom";
import {Button, Col, Row, Stack} from "react-bootstrap";
import UserCard from "../UserCard";

const Homepage = (props) => {

    const navigate = useNavigate()

    const handleTextButton = () => {
        if(props.user && props.user.studyPlanCompiled){
            return "Edit plan"
        }
        return "Create plan"
    }

    return (
        <>
            <Row>
                <div style={{height: "10vh"}}/>
            </Row>
            <Row>
                <Col>
                    <UserCard user={props.user}/>
                </Col>
                <Col xs={8}>
                    <h1>Homepage</h1>
                    <div style={{paddingTop: "10vh", paddingBottom: "10vh"}}>
                        This website is a project created for the Web Application I course of the Politecnico di Torino (Italy).
                        You can browse the list of courses and create your own study plan if you have not already done so. <br/>
                    </div>
                    <Stack gap={3}>
                        <Button onClick={() => navigate("/studyplan/edit")} variant="outline-success">{handleTextButton()}</Button>
                        <Button onClick={() => navigate("/courses")} variant="outline-primary">Course list</Button>
                    </Stack>
                </Col>
            </Row>
        </>
    )
}

export default Homepage