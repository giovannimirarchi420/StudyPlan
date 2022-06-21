const dao = require('./utils/DataDao.js');

exports.doRollbackPlan = async (userId) => {
    await dao.deletePlan(userId)
}

exports.doRollbackPlanCompiled = async (userId, planCompiled) => {
    await this.doRollbackPlan(userId)
    await dao.setPlanCompiled(userId, !planCompiled)
}

exports.doRollbackDecreaseStudentNumber = async (courses, course) => {
    for(let courseObj of courses){
        if (course === courseObj) break
        dao.increaseStudentsNumber(courseObj.id)
    }
}

exports.doRollbackOnlyIncreaseStudentNumber = async (courses, course) => {
    for(let courseObj of courses){
        if (course === courseObj) break
        dao.decreaseStudentsNumber(courseObj.id)
    }
}

exports.doRollbackIncreaseStudentNumber = async (userId, planCompiled, courses, course) => {
    await this.doRollbackPlanCompiled(userId, planCompiled)
    for(let courseObj of courses){
        if (course === courseObj) break
        dao.decreaseStudentsNumber(courseObj.id)
    }
}