const dao = require('./DataDao.js');
/*courseList is an array dat contains a list of courses id.
* */
exports.validate = (isFullTime, courseList) => {
    return new Promise( async (resolve, reject) => {
        const {success, cfuNumber, incompatibilityList, prerequisitesList} = await fetchData(courseList)
        if(!success){
            reject({success: false, message: "There is a generic problem, please try again."})
        }
        if(!prerequisitesCheck(courseList, prerequisitesList)){
            reject({success: false, message: "Some prerequisite constraints have not been respected, solve them and try again."})
        }
        if(!incompatibilityCheck(courseList, incompatibilityList)){
            reject({success: false, message: "Some courses appear to be incompatible with each other, check and try again."})
        }
        if(!cfuNumberCheck(isFullTime, cfuNumber)){
            reject({success: false, message: "The number of credits does not respect the constraints."})
        }

        resolve({success: true})
    });

}

const studentsNumberCheck = (courseList) => {

}
const fetchData = async (courseList) => {
    let creditsNumber = 0
    let incompatibilityList = []
    let prerequisitesList = []
    let courses = await dao.getCourseByIds(courseList)
    courses.forEach( (course) => {
        if( course.max_students && (course.students_number + 1 > course.max_students) ){
            return {success: false}
        }

        if(course.prerequisites != null && course.prerequisites !== "")
            course.prerequisites.split(" ").forEach( courseId => prerequisitesList.push(courseId))
        if(course.incompatibility != null && course.incompatibility !== "")
            course.incompatibility.split(" ").forEach( (courseId) => incompatibilityList.push(courseId))
        creditsNumber += course.cfu

    });

    return {success: true, cfuNumber: creditsNumber, incompatibilityList: incompatibilityList, prerequisitesList: prerequisitesList}
}

const prerequisitesCheck = (courseList, prerequisitesList) => {
    let ret = true;
    prerequisitesList.forEach( courseId => {
        if(!courseList.includes(courseId)){
            ret = false;
        }
    })
    return ret;
}

const incompatibilityCheck = (courseList, incompatibilityList) => {
    let ret = true;
    incompatibilityList.forEach( courseId => {
        if(courseList.includes(courseId)){
            ret = false;
        }
    })
    return ret;
}

const cfuNumberCheck = (isFullTime, cfuNumbers) => {
    return (isFullTime && (cfuNumbers >= 60 && cfuNumbers <= 80)) || (!isFullTime && (cfuNumbers >= 20 && cfuNumbers <= 40));
}