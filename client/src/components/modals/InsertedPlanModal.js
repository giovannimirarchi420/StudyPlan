import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const InsertedPlanModal = (props) => {

    const navigate = useNavigate()

    const handleCloseClick = () => {
        props.setShow(false)
        navigate("/")
    }

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Your plan was been saved.</p><br/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleCloseClick} variant="outline-danger">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InsertedPlanModal