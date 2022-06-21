import {Card} from "react-bootstrap";
import Avatar from "./svg/Avatar";

const UserCard = (props) => {

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

    return (
        <Card style={{marginLeft: '3rem', width: '15rem', height: '30rem'}}>
            <Card.Body>
                <Avatar/>
                <div style={{height: "50px"}}/>
                <Card.Title>{props.user.name + " " + props.user.surname}</Card.Title>

                Study Plan: <strong><span className={studyPlanClass()}> {studyPlanText()}</span></strong>
                {
                    props.user.studyPlanCompiled ?
                        props.user.fullTime ? <p className={"yellow-text"}>Full Time</p> :
                            <p className={"yellow-text"}>Part Time</p>
                        :
                        ""
                }

            </Card.Body>
        </Card>
    )
}

export default UserCard