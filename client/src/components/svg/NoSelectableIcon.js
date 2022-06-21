import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {TiDelete} from "react-icons/ti";
import {useEffect, useState} from "react";

const NoSelectableIcon = (props) => {

    const [tooltipMessage, setTooltipMessage] = useState(null);

    useEffect(() => {
        if (props.isShowing) {
            let setted = false
            let selectedCourseIds = props.selectedCourse.map(course => course.id)

            if (props.course.max_students && !(props.course.students_number < props.course.max_students)) {
                setted = true
                setTooltipMessage("It cannot be selected because it has already reached the maximum number of students")
            }

            if (props.course.incompatibility != null && props.course.incompatibility !== "") {
                let incompatibilitiesIds = props.course.incompatibility.split(" ")
                selectedCourseIds.forEach((id) => {
                    if (incompatibilitiesIds.includes(id) && !setted) {
                        setTooltipMessage("Can't be selected because it is incompatible with " + id)
                        setted = true
                    }
                })
            }

            if (props.course.prerequisites != null && props.course.prerequisites !== "") {
                let prerequisitesIds = props.course.prerequisites.split(" ")
                prerequisitesIds.forEach((id) => {
                    if (!selectedCourseIds.includes(id) && !setted) {
                        setTooltipMessage("Can't be selected because this course need " + id + " as prerequisites to be added.")
                    }
                })
            }
        }
    }, [props.selectedCourse])

    return (
        <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={<Tooltip id="button-tooltip-2">{tooltipMessage}</Tooltip>}
        >
            <a><TiDelete/></a>
        </OverlayTrigger>
    )
}

export default NoSelectableIcon