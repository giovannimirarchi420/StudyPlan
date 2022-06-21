import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const PlanTypeChooseModal = (props) => {

    const navigate = useNavigate()

    return (
        <Modal show={props.show} onHide={() => {
            props.setShow(false);
            navigate("/home")
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Choose study plan type</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Choose study plan between Part time or Full time.</p><br/>
                <p>Full time enrollment require a study plan between 60 and 80 CFU</p><br/>
                <p>Part time enrollment require a study plan between 20 and 40 CFU</p><br/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => {
                    props.setShow(false);
                    navigate("/home")
                }} variant="outline-danger">Close</Button>
                <Button onClick={() => {
                    props.setFullTimePlan(true);
                    props.setShow(false)
                }} variant="outline-success">Full Time</Button>
                <Button onClick={() => {
                    props.setFullTimePlan(false);
                    props.setShow(false)
                }} variant="outline-secondary">Part Time</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlanTypeChooseModal