import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const GeneralErrorModal = (props) => {

    const navigate = useNavigate()

    const handleClose = () => {
        props.setShow(false)
        navigate("/")
    }
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ops..</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Some error occurred, sorry for the inconvenience, try again later.</p><br/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClose} variant="outline-danger">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GeneralErrorModal