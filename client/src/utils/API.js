

exports.getCourseList = () => {
    return new Promise( (resolve, reject) => {
        fetch("../api/courses")
            .then( async (result) => {
                let ret = await result.json()
                resolve(ret)
            })
            .catch( (error) => reject(error))
    })
}

exports.getPlan = () => {
    return new Promise( (resolve, reject) => {
        fetch("../api/studyplan")
            .then( async (result) => {
                let ret = await result.json()
                resolve(ret)
            })
            .catch( (error) => reject(error))
    })
}

exports.login = (credentials) => {
    return new Promise( (resolve, reject) => {
        fetch("../api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then( async (result) => {
                let ret = await result.json()
                resolve(ret)
            })
            .catch( (error) => reject(error))
    })
}

exports.logout = () => {
    return new Promise( (resolve, reject) => {
        fetch("../api/login", {
            method: "DELETE",
        }).then( (result) => {
                resolve(result)
            })
            .catch( (error) => reject(error))
    })
}
exports.deletePlan = () => {
    return new Promise( (resolve, reject) => {
        fetch("../api/studyplan", {
            method: "DELETE",
        }).then( (result) => {
            resolve(result)
        })
            .catch( (error) => reject(error) )
    })
}

exports.updatePlan = (plan) => {
    return new Promise( (resolve, reject) => {
        fetch("../api/studyplan/submit", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plan)
        })
            .then(r => resolve(r))
            .catch(err => reject(err))
    })
}
exports.insertPlan = (plan) => {
    return new Promise( (resolve, reject) => {
        fetch("../api/studyplan/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plan)
        })
            .then( (result) => {
                resolve(result)
            })
            .catch( (error) => reject(error))
    })
}