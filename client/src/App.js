import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./components/pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import Homepage from "./components/pages/Homepage";
import StudyPlanCompiler from "./components/pages/StudyPlanCompiler";
import StudyPlanViewer from "./components/pages/StudyPlanViewer";
import PageNotFound from "./components/pages/PageNotFound";
import CoursesPage from "./components/pages/CoursesPage";
import Footer from "./components/Footer";

function App() {

    const [user, setUser] = useState(undefined);
    const [courses, setCourses] = useState(undefined)

    return (
        <>
            <div className="App">
                <Container fluid>
                    <Row>
                        <NavigationBar setUser={setUser} loggedIn={user ? true : false}/>
                    </Row>
                    <Row>
                        <Routes>
                            <Route exact path='/' element={user ? <Homepage user={user}/> :
                                <LoginPage setCourses={setCourses} setUser={setUser}/>}/>
                            <Route exact path='/home' element={user ? <Homepage user={user}/> :
                                <LoginPage setCourses={setCourses} setUser={setUser}/>}/>
                            <Route exact path='/courses' element={<CoursesPage/>}/>
                            <Route exact path='/studyplan/edit' element={user ?
                                <StudyPlanCompiler setUser={setUser} user={user} courseList={courses}/> :
                                <LoginPage setCourses={setCourses} setUser={setUser}/>}/>
                            <Route exact path='/studyplan/view' element={user ?
                                <StudyPlanViewer setUser={setUser} user={user} courseList={courses}/> :
                                <LoginPage setCourses={setCourses} setUser={setUser}/>}/>
                            <Route path='/*' element={<PageNotFound/>}/>
                        </Routes>
                    </Row>
                    <Footer/>
                </Container>
            </div>
        </>
    );
}

export default App;
