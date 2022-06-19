import {Button, Modal} from "react-bootstrap";


const ErrorPlanConstraintsModal = (props) => {

    return (
        <Modal show={props.show.showErrorModal} onHide={() => props.show.setShowErrorModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.error}</p><br/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => props.show.setShowErrorModal(false) } variant="outline-danger">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorPlanConstraintsModal