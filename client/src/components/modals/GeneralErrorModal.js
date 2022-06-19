import {Button, Modal} from "react-bootstrap";

const GeneralErrorModal = (props) => {
  return (
      <Modal show={props.show} onHide={() => props.setShow(false)}>
          <Modal.Header closeButton>
              <Modal.Title>Ops..</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <p>Some error occurred, sorry for the inconvenience, try again later.</p><br/>
          </Modal.Body>

          <Modal.Footer>
              <Button onClick={() => props.setShow(false) } variant="outline-danger">Close</Button>
          </Modal.Footer>
      </Modal>
  )
}

export default GeneralErrorModal