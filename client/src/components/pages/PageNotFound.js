import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const PageNotFound = (props) => {

  const navigate = useNavigate()

  return (
      <>
          <Row>
              <Col>
                  <h1>Page not found</h1>
                  <Button onClick={() => navigate("/")} variant={"outline-info"}>Home</Button>
              </Col>
          </Row>
      </>
  )
}

export default PageNotFound