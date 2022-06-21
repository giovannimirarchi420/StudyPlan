


const db = require('../db/db.js')
const bcrypt = require('bcrypt');

exports.getUserById = (email) => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.get(sql, [email], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            if (out === undefined){
                return resolve('User not found');
            }
            const user = {id: out.id, email: out.email, fullTime: out.full_time, studyPlanCompiled: out.study_plan_compiled, name: out.name, surname: out.surname}
            resolve(user);
        })
    })
}

exports.setStudyPlanType = (userId, fullTime) => {
    return new Promise( (resolve, reject) => {
        const sql = "UPDATE users SET full_time = ? WHERE id = ?"
        db.get(sql, [fullTime, userId], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            if (out === undefined){
                return resolve('User not found');
            }
            resolve("Done")
        })
    })
}

exports.setPlanCompiled = (userId, planCompiled) => {
    return new Promise( (resolve, reject) => {
        const sql = "UPDATE users SET study_plan_compiled = ? WHERE id = ?"
        db.get(sql, [planCompiled, userId], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            resolve()
        })
    })
}

exports.deletePlan = (userId) => {
    return new Promise( (resolve, reject) => {
        const sql = "DELETE FROM study_plans WHERE user_id = ?"
        db.get(sql, [userId], (err, row) => {
            if(err)
                reject(err)
        })

        const sql2 = "UPDATE users SET full_time = null, study_plan_compiled = false WHERE id = ?"
        db.get(sql2, [userId], (err, row) => {
            if(err)
                reject(err)
            else
                resolve(row)
        })
    })
}

exports.updatePlan = (id, plan) => {

    return new Promise( (resolve, reject) => {
        const sql = "UPDATE study_plans SET course_list = ? WHERE user_id = ?"
        db.get(sql, [plan, id], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            resolve("Done")
        })
    })
}

exports.increaseStudentsNumber = (course) => {
    return new Promise( (resolve, reject) => {
        const sql = "UPDATE courses SET students_number = students_number + 1 WHERE id = ?"
        db.get(sql, [course], (err) => {
            if(err){
                reject(err);
                return;
            }
            resolve("Done")
        })
    })
}

exports.decreaseStudentsNumber = (course) => {
    return new Promise( (resolve, reject) => {
        const sql = "UPDATE courses SET students_number = students_number - 1 WHERE id = ?"
        db.get(sql, [course], (err) => {
            if(err){
                reject(err);
                return;
            }
            resolve("Done")
        })
    })
}

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined) {
                resolve(false);
            }
            else {
                const user = {id: row.id, email: row.email, fullTime: row.full_time, studyPlanCompiled: row.study_plan_compiled, name: row.name, surname: row.surname};

                bcrypt.compare(password, row.password).then(result => {
                    if(result) {
                        resolve(user);
                    }
                    else
                        resolve(false);
                });
            }
        });
    });
};

exports.getCourses = () => {
    return new Promise( (resolve, reject) => {
        const sql = 'SELECT * FROM courses ORDER BY name ASC';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err)
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

exports.getCourseById = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = 'SELECT * FROM courses WHERE id = ?';
        db.all(sql, [id], (err, row) => {
            if (err) {
                console.log(err)
                reject(err);
                return;
            }
            resolve(row);
        });
    });
}

exports.getCourseByIds = (ids) => {
    return new Promise( (resolve, reject) => {
       this.getCourses()
           .then( (rows) => resolve ( rows.filter( (course) => ids.includes(course.id) ) ) )
           .catch( (err) => reject(err) )
    });
}

exports.insertStudyPlan = (user, courseList) => {
    return new Promise( (resolve, reject) => {
        const sql = "INSERT INTO study_plans (user_id, course_list) VALUES (?, ?)"
        db.get(sql, [user.id, courseList], (err) => {
            if(err){
                reject(err);
            }
            resolve('Inserted');
        })
    });
}

exports.getStudyPlanByUserId = (userId) => {
    return new Promise( (resolve, reject) => {
        if(!userId){
            reject("userID NULL")
        }
        const sql = "SELECT * FROM study_plans WHERE user_id = ?"
        db.get(sql, [userId], (err, row) => {
            if(err){
                reject(err)
            }
            resolve(row)
        })
    })
}



