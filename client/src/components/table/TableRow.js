import {useEffect, useState} from "react";
import NoSelectableIcon from "../svg/NoSelectableIcon";

const TableRow = (props) => {

    let arrowDownUrl = "https://img.icons8.com/material-outlined/24/undefined/expand-arrow--v1.png"
    let arrowUpUrl = "https://img.icons8.com/material/24/undefined/collapse-arrow--v1.png"

    const [arrowUrl, setArrowUrl] = useState(arrowDownUrl)
    const [checked, setChecked] = useState(false)

    useEffect( () => {

        if(props.checkbox){
            if (props.selectable) {
                document.getElementById(props.course.id + "-checkbox-select").style.display = "inline"
            }
        }
        if(props.checkbox && props.select && props.selectable){
            setChecked(true)
            document.getElementById(props.course.id + "-checkbox-select").checked = true
            document.getElementById(props.course.id).classList.add("selected-row")
        }
    }, [props.select, props.selectable])

    const respectConstraints = () => {
        const studyPlanIds = props.selectedCourse.map(course => course.id)

        if(props.course.incompatibility != null &&
            props.course.incompatibility.split(" ").some((id) => studyPlanIds.includes(id))){

            props.setErrorModal.setShowErrorModal(true)
            props.setErrorModal.setErrorMessage(props.course.name + " can't be selected because it is incompatible with following courses: " +
                props.course.incompatibility)
            return false
        }

        if(props.course.prerequisites != null && props.course.prerequisites !== "" && !props.course.prerequisites.split(" ").every((id) => studyPlanIds.includes(id))){
            props.setErrorModal.setShowErrorModal(true)
            props.setErrorModal.setErrorMessage(props.course.name + " can't be selected because it is preparatory to " +
                props.course.prerequisites + ". Add the course " + props.course.prerequisites + " to access them.")
            return false
        }

        if(props.course.max_students && props.course.students_number >= props.course.max_students){
            props.setErrorModal.setShowErrorModal(true)
            props.setErrorModal.setErrorMessage(props.course.name + " can't be selected because it already reached" +
                " the max students number.")
            return false
        }

        return true
    }

    const checkIfCanBeDeselected = () => {
        let prerequisitesList = []
        props.selectedCourse.forEach((course) => {
            if(course.prerequisites != null && course.prerequisites !== ""){
                course.prerequisites.split(" ").forEach((id) => prerequisitesList.push(id))
            }
        })

        return prerequisitesList.length > 0 && prerequisitesList.includes(props.course.id)
    }

    const handleCheckbox = () => {
        if(!checked){
            if(respectConstraints()){
                props.setCfu((cfu) => cfu + props.course.cfu)
                props.course.students_number += 1
                props.setSelectedCourse((oldState) => [...oldState, props.course])
                props.plan.setStudyPlan((oldState) => [...oldState, props.course])
                setChecked((oldState) => !oldState)
            } else {
                document.getElementById(props.course.id + "-checkbox-select").checked = false
            }
        } else {

            if(checkIfCanBeDeselected()){
                props.setErrorModal.setShowErrorModal(true)
                props.setErrorModal.setErrorMessage(props.course.name + " can't be deselected because it is a prerequisite for some other course")
                document.getElementById(props.course.id + "-checkbox-select").checked = true
                return
            }

            props.course.students_number -= 1
            props.setCfu( (cfu) => cfu - props.course.cfu)
            props.setSelectedCourse((oldState) => oldState.filter((course) => course.id !== props.course.id))
            props.plan.setStudyPlan((oldState) => oldState.filter((course) => course.id !== props.course.id))
            document.getElementById(props.course.id + "-checkbox-select").checked = false

            setChecked((oldState) => !oldState)
        }

    }

    const handleClick = (courseId) => {
        let expansion = document.getElementById(courseId + "-expansion")
        if (expansion.classList.contains("hidden-item")) {
            expansion.classList.remove("hidden-item")
            setArrowUrl(arrowUpUrl)
        } else {
            expansion.classList.add("hidden-item")
            setArrowUrl(arrowDownUrl)
        }
    }

    const Arrow = () => {
        return <img src={arrowUrl}/>
    }

    return (
        <>
            <tr key={props.course.id} id={props.course.id} className={checked ? "selected-row" : ""}>
                <td key={props.course.id+"-td1"} id={props.course.id+"-td1"}>{props.course.id}</td>
                <td key={props.course.id+"-td2"} id={props.course.id+"-td2"}>{props.course.name}</td>
                <td key={props.course.id+"-td3"} id={props.course.id+"-td3"}>{props.course.cfu}</td>
                <td key={props.course.id+"-td4"} id={props.course.id+"-td4"}>{props.course.students_number}</td>
                <td key={props.course.id+"-td5"} id={props.course.id+"-td5"}>{props.course.max_students ? props.course.max_students : "-"}</td>
                <td key={props.course.id+"-td6"} id={props.course.id+"-td6"} onClick={ () => handleClick(props.course.id)}>
                    <Arrow/>
                </td>
                {props.checkbox ?
                    props.selectable ?
                        <td><input onChange={handleCheckbox} id={props.course.id + "-checkbox-select"} type={"checkbox"}/></td> : <td><NoSelectableIcon isShowing={!props.selectable} course={props.course} selectedCourse={props.selectedCourse}/></td> : ""}
            </tr>
            <tr id={props.course.id + "-expansion"} className={"table-expansion hidden-item"}>
                <td colSpan={props.checkbox ? 7 : 6}>
                    Incompatibility: {props.course.incompatibility}<br/>
                    <hr/>
                    Prerequisites: {props.course.prerequisites}
                </td>
            </tr>
        </>
    )
}

export default TableRow