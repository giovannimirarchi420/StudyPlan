import {Button, Card} from "react-bootstrap";
import Avatar from "./svg/Avatar";
import {useLocation, useNavigate} from "react-router-dom";

const UserCard = (props) => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

    const studyPlanClass = () => {
        if (props.user.studyPlanCompiled == null) {
            return "plan-to-fill"
        }
        return props.user.studyPlanCompiled ? "plan-filled" : "plan-to-fill"

    }

    const studyPlanText = () => {
        if (props.user.studyPlanCompiled == null) {
            return "To fill"
        }
        return props.user.studyPlanCompiled ? "Filled" : "To fill"

    }

    const studyPlanButton = () => {
        if (props.user.studyPlanCompiled == null) {
            return <Button variant="warning">Complete study plan</Button>
        }
        return props.user.studyPlanCompiled ? <>
                <Button onClick={buttonAction} variant="warning">Edit study plan</Button>
                <Button onClick={openDeleteModal} variant="danger">Delete study plan</Button>
            </>
            : <Button onClick={buttonAction} variant="success">Create study plan</Button>
    }

    const buttonAction = () => {
        if (props.user.studyPlanCompiled == null) {
            return navigateTo("/studyplan/edit")
        }
        return props.user.studyPlanCompiled ? navigateTo("/studyplan/edit") : navigateTo("/studyplan/create")
    }

    const openDeleteModal = () => {

    }

    let location = useLocation();

    return (
        <Card style={{marginLeft: '3rem',width: '15rem', height: '30rem'}}>
            <Card.Body>
                <Avatar/>
                <div style={{height: "50px"}}/>
                <Card.Title>{props.user.name + " " + props.user.surname}</Card.Title>

                    Study Plan: <strong><span className={studyPlanClass()}> {studyPlanText()}</span></strong>
                    {
                        props.user.studyPlanCompiled ?
                        props.user.fullTime ? <p className={"yellow-text"}>Full Time</p> : <p className={"yellow-text"}>Part Time</p>
                        :
                        ""
                    }

            </Card.Body>
        </Card>
    )
}

export default UserCard