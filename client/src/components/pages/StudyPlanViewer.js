import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";
import CourseList from "../table/CourseList";
import UserCard from "../UserCard";
import {useNavigate} from "react-router-dom";
import DeletePlanModal from "../modals/DeletePlanModal";


const StudyPlanViewer = (props) => {

    const [cfu, setCfu] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()

    return (
        <>
            <DeletePlanModal user={props.user} setUser={props.setUser} show={showModal} setShow={setShowModal}/>
            <Row>
                <div style={{height: "10vh"}}/>
            </Row>
            <Row>
                <Col>
                    <UserCard user={props.user}/>
                </Col>
                <Col xs={8}>
                    <h2>Study plan</h2>
                    {
                        props.user.studyPlanCompiled ?
                            <CourseList setCfu={setCfu}
                                        user={props.user}
                                        viewPlan
                                        loggedIn
                            />
                            :
                            <Button onClick={() => navigate("/studyplan/edit")}
                                    style={{marginTop: "25vh"}}
                                    variant={"outline-info"}>
                                Create study plan
                            </Button>
                    }
                    <Row>
                        <div style={{paddingTop: "6vh", width: "100%"}}>
                            {
                                props.user.studyPlanCompiled ?
                                    <>
                                        <Button style={{width: "100%"}} onClick={() => setShowModal(true)}
                                                variant="outline-danger">Delete</Button>
                                        <div style={{height: "10px"}}/>
                                        <Button style={{width: "100%"}} onClick={() => navigate("/studyplan/edit")}
                                                variant="outline-primary">Edit</Button>
                                    </>
                                    :
                                    ""
                            }
                        </div>
                        <div style={{height: "5vh"}}/>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default StudyPlanViewer