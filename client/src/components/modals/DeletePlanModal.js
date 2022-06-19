import {Button, Modal} from "react-bootstrap";
import {deletePlan} from "../../utils/API";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import GeneralErrorModal from "./GeneralErrorModal";

const DeletePlanModal = (props) => {

    const navigate = useNavigate()
    const [showErrorModal, setShowErrorModal] = useState(false)
    const handleDeleteClick = () => {
        deletePlan()
            .then((res) => {
                console.log(res)

                if(res.status === 204){
                    props.setShow(false)

                    props.setUser((user) => {
                        return {
                            studyPlanCompiled: 0,
                            id: user.id,
                            email: user.email,
                            fullTime: null,
                            name: user.name,
                            surname: user.surname
                        }
                    })
                    navigate("/")
                } else {
                    setShowErrorModal(true)
                }

            }).catch((err) => setShowErrorModal(true))

    }

     return (
         <>
            <GeneralErrorModal show={showErrorModal} setShow={setShowErrorModal}/>
            <Modal show={props.show} onHide={() => props.setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete study plan</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure to delete you study plan? This change can be undo.</p><br/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleDeleteClick} variant="outline-danger">Delete</Button>
                    <Button onClick={() => props.setShow(false) } variant="outline-success">Cancel</Button>
                </Modal.Footer>
            </Modal>
         </>
    )
}

export default DeletePlanModal