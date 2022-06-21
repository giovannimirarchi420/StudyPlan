import {Row, Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getCourseList, getPlan} from "../../utils/API";
import "../../css/style.css"
import TableRow from "./TableRow";
import GeneralErrorModal from "../modals/GeneralErrorModal";

const CourseList = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [courseList, setCourseList] = useState([])
    const [studyPlan, setStudyPlan] = useState([])
    const [showErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        const doStuff = async () => {
            //Retrieve courses
            let courses = await getCourseList()
            setCourseList(courses)

            //Retrieve plan
            if (props.loggedIn && props.user.studyPlanCompiled) {
                let plan = await getPlan()
                let planList = courses.filter((course) => plan.course_list.split(',').includes(course.id))
                if (!(plan.course_list === undefined || plan.course_list.length <= 0)) {
                    setStudyPlan(planList)
                    if (props.setSelectedCourse) {
                        props.setSelectedCourse(planList)
                    }
                    //Retrieve cfu number
                    let cfu = 0
                    planList.forEach((course) => cfu += course.cfu)
                    props.setCfu(cfu)
                }

                if (props.viewPlan) {
                    setCourseList(planList)
                }
            }
            setLoading(false)
        }
        try {
            doStuff().then(() => setShowErrorModal(false)).catch(() => setShowErrorModal(true))
        } catch (err) {

        }
    }, [props.user])

    const selectCondition = (course) => {
        return studyPlan.includes(course);
    }

    const isSelectable = (thisCourse) => {
        if (!props.loggedIn) {
            return false
        }
        let incompatibilityList = []

        if (props.selectedCourse != null) {
            if (props.selectedCourse.map(course => course.id).includes(thisCourse.id)) {
                return true
            }
        }

        if (thisCourse.max_students && !(thisCourse.students_number < thisCourse.max_students)) {
            return false
        }

        if (props.selectedCourse != null) {
            //Create incompatibility list
            props.selectedCourse.forEach((course) => {
                if (course.incompatibility !== null && course.incompatibility !== "") {
                    course.incompatibility.split(" ").forEach((courseId) => incompatibilityList.push(courseId))
                }
            })
            //Check if this course is incompatible with some other
            if (incompatibilityList.includes(thisCourse.id)) {
                return false
            }

            //Check if prerequisites are satisfied for this course
            if (thisCourse.prerequisites != null && thisCourse.prerequisites != "") {
                let prereqList = thisCourse.prerequisites.split(" ")
                let selectedCourseIds = props.selectedCourse.map(course => course.id)

                if (!prereqList.every(id => selectedCourseIds.includes(id))) {
                    return false
                }
            }
        }
        //All constraints are satisfied, this element is selectable
        return true
    }

    return (
        <>
            <GeneralErrorModal show={showErrorModal} setShow={setShowErrorModal}/>
            <Row>
                <div style={{height: "5vh"}}/>
            </Row>
            <Row className={"course-table"}>
                {isLoading ? <Spinner className={"loading-spinner"} animation={"border"}/> :
                    <Table striped bordered hover>
                        <thead>
                        <tr key={"first-row"}>
                            <th>Codice</th>
                            <th>Nome</th>
                            <th>Crediti</th>
                            <th>N. Studenti</th>
                            <th>Max studenti</th>
                            <th>Actions</th>
                            {props.edit ? <th>Select</th> : ""}
                        </tr>
                        </thead>
                        <tbody>
                        {courseList.map(course =>
                            <TableRow setCfu={props.setCfu}
                                      setSelectedCourse={props.setSelectedCourse}
                                      selectedCourse={props.selectedCourse}
                                      plan={{studyPlan: studyPlan, setStudyPlan: setStudyPlan}}
                                      checkbox={props.edit}
                                      key={course.id}
                                      course={course}
                                      setErrorModal={props.setErrorModal}
                                      select={selectCondition(course)}
                                      logged={props.loggedIn}
                                      selectable={isSelectable(course)}/>
                        )}
                        </tbody>
                    </Table>}
            </Row>
        </>
    )

}

export default CourseList;