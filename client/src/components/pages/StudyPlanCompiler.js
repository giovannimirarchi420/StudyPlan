import {Button, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {insertPlan, updatePlan} from "../../utils/API";
import CourseList from "../table/CourseList";
import UserCard from "../UserCard";
import {useNavigate} from "react-router-dom";
import PlanTypeChooseModal from "../modals/PlanTypeChooseModal";
import ErrorPlanConstraintsModal from "../modals/ErrorPlanConstraintsModal";
import InsertedPlanModal from "../modals/InsertedPlanModal";


const StudyPlanCompiler = (props) => {

    const [selectedCourse, setSelectedCourse] = useState([]);
    const [cfu, setCfu] = useState(0);
    const [fullTimePlan, setFullTimePlan] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [insertedPlanModal, setInsertedPlanModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (props.user.studyPlanCompiled) {
            setShowModal(false)
        }
        if (props.user.fullTime) {
            setFullTimePlan(true)
        }
    })

    const callInsertPlanAPI = (fullTimePlan) => {
        insertPlan({courses: selectedCourse.map(course => course.id), fullTime: fullTimePlan})
            .then((res) => {
                if (res.status === 201) {
                    props.setUser((user) => {
                        return {
                            studyPlanCompiled: 1,
                            id: user.id,
                            email: user.email,
                            fullTime: fullTimePlan,
                            name: user.name,
                            surname: user.surname
                        }
                    })
                    setInsertedPlanModal(true)
                } else {
                    res.json().then((json) => {
                        setErrorMessage("An error occurred inserting your plan: \n" + json)
                        setShowErrorModal(true)
                    }).catch(err => {
                        setErrorMessage("An error occurred inserting your plan, please try again.")
                        setShowErrorModal(true)
                    });

                }

            })
            .catch((err) => {
                setErrorMessage(err)
                setShowErrorModal(true)
            })
    }

    const callUpdatePlanAPI = (fullTimePlan) => {
        updatePlan({courses: selectedCourse.map(course => course.id), fullTime: fullTimePlan})
            .then((res) => {
                if (res.status === 204) {
                    setInsertedPlanModal(true)
                    props.setUser((user) => {
                        return {
                            studyPlanCompiled: 1,
                            id: user.id,
                            email: user.email,
                            fullTime: fullTimePlan,
                            name: user.name,
                            surname: user.surname
                        }
                    })
                } else {
                    res.json().then((json) => {
                        console.log(json)
                        setErrorMessage("An error occurred inserting your plan: \n" + json)
                        setShowErrorModal(true)
                    }).catch(err => {
                        setErrorMessage("An error occurred inserting your plan, please try again.")
                        setShowErrorModal(true)
                    });
                }

            })
            .catch((err) => {
                setErrorMessage(err)
                setShowErrorModal(true)
            })
    }

    const insertPlanHandle = () => {
        if (respectCfuConstraint()) {
            if (!props.user.studyPlanCompiled) {
                callInsertPlanAPI(fullTimePlan)
            } else {
                callUpdatePlanAPI(fullTimePlan)
            }
        } else {
            setErrorMessage(fullTimePlan ? "For full time enrollment the numbers of credits must be between 60 and 80" :
                "For part time enrollment the numbers of credits must be between 20 and 40")
            setShowErrorModal(true)
        }
    }

    const respectCfuConstraint = () => {
        return (fullTimePlan && (cfu >= 60 && cfu <= 80)) || (!fullTimePlan && (cfu >= 20 && cfu <= 40));

    }

    return (
        <>
            <InsertedPlanModal show={insertedPlanModal} setShow={setInsertedPlanModal}/>
            <ErrorPlanConstraintsModal error={errorMessage}
                                       show={{showErrorModal: showErrorModal, setShowErrorModal: setShowErrorModal}}/>
            <PlanTypeChooseModal setFullTimePlan={setFullTimePlan} show={showModal} setShow={setShowModal}/>
            <Row>
                <div style={{height: "10vh"}}/>
            </Row>
            <Row>
                <Col>
                    <UserCard user={props.user}/>
                </Col>
                <Col xs={8}>
                    <h2>Study plan Editor</h2>
                    <div>
                        CFU number: <span>{fullTimePlan ? "60 ≤" : "20 ≤"}  </span>
                        <span className={respectCfuConstraint() ? "plan-filled" : "plan-to-fill"}>{cfu}</span>
                        <span>{fullTimePlan ? " ≤ 80 " : " ≤ 40"}  </span>
                    </div>
                    <CourseList setCfu={setCfu}
                                user={props.user}
                                setSelectedCourse={setSelectedCourse}
                                selectedCourse={selectedCourse}
                                setErrorModal={{setShowErrorModal: setShowErrorModal, setErrorMessage: setErrorMessage}}
                                edit
                                loggedIn
                    />

                    <div style={{height: "5vh"}}/>
                    <Button style={{width: "100%"}} onClick={insertPlanHandle} variant="outline-primary">Save
                        changes</Button>
                    <div style={{height: "10px"}}/>
                    <Button style={{width: "100%"}} onClick={() => navigate("/studyplan/view")}
                            variant="outline-danger">Cancel</Button>
                    <div style={{height: "5vh"}}/>
                </Col>
            </Row>

        </>
    )
}

export default StudyPlanCompiler