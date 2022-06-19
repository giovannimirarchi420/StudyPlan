const express = require("express")
const session = require('express-session');
const passport = require("passport")
const app = express()
const dao = require('./utils/DataDao.js');
const validator = require('./utils/StudyPlanValidator.js');
const {setPlanCompiled} = require("./utils/DataDao");
const LocalStrategy = require('passport-local').Strategy;
const port = 3001

app.use(express.json());

/*** set up Passport ***/
passport.use(new LocalStrategy( function (email, password, done) {
        dao.getUser(email, password)
            .then((user) => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username and/or password.'});
                }
                return done(null, user);
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email, user.fullTime, user.id, user.studyPlanCompiled);
});

passport.deserializeUser(async (email, done) => {
    await dao.getUserById(email)
        .then(user => {
            return done(null, user);
        }).catch(err => {
            return done(err, false);
        });
});

app.use(session({
    secret: 'asupersecretsetenceguessme',
    resave: false,
    saveUninitialized: false
}));

/*** end set up Passport ***/

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
        return;
    }

    res.status(401).json({ error: 'not authenticated'});
}

app.get("/api/courses", (req, res) => {
    dao.getCourses()
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(400).end());
});

app.get("/api/courses/:id", (req, res) => {
    dao.getCourseById(req.params.id)
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(400).end());
});

app.post("/api/login", function(req, res, next) {
    passport.authenticate('local',(err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);
            return res.json(req.user);
        });
    })(req, res, next);
});

app.post("/api/studyplan/submit", isLoggedIn, async (req, res) => {
    validator.validate(req.body.fullTime, req.body.courses)
        .then( validationResult => {
            if(validationResult.success){
                dao.insertStudyPlan(req.user, req.body.courses)
                    .then( () => {
                        setPlanCompiled(req.user.id, true)
                            .then(() => {
                                req.body.courses.forEach((course) => {
                                    dao.increaseStudentsNumber(course)
                                        .catch((err) => res.status(400).end())
                                })
                                dao.setStudyPlanType(req.user.id, req.body.fullTime)
                                    .then(() => res.status(201).end())
                                    .catch((err) => res.status(400).end())
                            })
                            .catch((err) => res.status(400).end())
                    })
                    .catch( (err) => res.status(400).end())
                } else {
                    res.json(validationResult.message).status(400).end()
                }
            })
            .catch( err => res.json(err.message).status(400).end())
})

app.patch("/api/studyplan/submit", isLoggedIn, (req, res) => {
    dao.getStudyPlanByUserId(req.user.id)
        .then((plan) => {
            if(plan != null) {
                validator.validate(req.user.fullTime, req.body.courses)
                    .then( validationResult => {
                        if(validationResult) {
                            dao.updatePlan(req.user.id, req.body.courses)
                                .then(() => res.status(204).end())
                                .catch(() => res.status(400).end())
                            const planIdsToDecreaseStudentNumber = plan.course_list.split(",")
                                .filter((course) => !req.body.courses.includes(course))
                            planIdsToDecreaseStudentNumber.forEach((courseId) => {
                                dao.decreaseStudentsNumber(courseId)
                                    .catch((err) => {
                                        console.log(err)
                                        res.status(400).end()
                                    })
                            })
                            const planIdsToIncrementStudentNumber = req.body.courses
                                .filter((course) => !plan.course_list.split(",").includes(course))
                            planIdsToIncrementStudentNumber.forEach((courseId) => {
                                dao.increaseStudentsNumber(courseId)
                                    .catch((err) => {
                                        console.log(err)
                                        res.status(400).end()
                                    })
                            })
                        } else {
                            res.json(validationResult.message).status(400).end()
                        }
                    })
                    .catch( (err) => res.json(err.message).status(400).end())

            } else {
                res.status(404).json("Study plan not found").end()
            }
        })
})

app.delete("/api/studyplan/", isLoggedIn, async (req, res) => {
    const plan = await dao.getStudyPlanByUserId(req.user.id)
    dao.deletePlan(req.user.id)
        .then( () => {
            plan.course_list.split(",").forEach((courseId) => {
                dao.decreaseStudentsNumber(courseId).catch((err) => res.status(400).json(err).end())
            })
            res.status(204).end()
        })
        .catch( (err) => res.status(400).json(err).end())
})

app.get("/api/studyplan/", isLoggedIn, (req, res) => {
    dao.getStudyPlanByUserId(req.user.id)
        .then( async (result) => res.status(200).json(result))
        .catch( (err) => res.status(400).end())
})


app.delete("/api/login", isLoggedIn, (req, res) => {
    req.logout(() => {
        res.end()
    });

});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
