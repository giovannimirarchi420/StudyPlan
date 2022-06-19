import {Col, Row} from "react-bootstrap";
import CourseList from "../table/CourseList";


const CoursesPage = (props) => {
    return (
        <Col>
            <Row style={{paddingTop: "5vh"}}>
                <h1>List of courses</h1>
            </Row>
            <Row style={{marginLeft: "30px", marginRight: "30px", marginTop: "30px"}}>
                <CourseList/>
            </Row>
        </Col>
    )
}

export default CoursesPage