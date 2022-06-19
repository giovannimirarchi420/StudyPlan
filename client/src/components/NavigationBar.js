import {Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {logout} from "../utils/API";

const NavigationBar = (props) => {

    const navigate = useNavigate();
    let location = useLocation();

    const navigateHomepage = () => {
        navigate("/")
    }

    const navigateCourseList = () => {
        navigate("/courses")
    }

    const navigateFillStudyPlan = () => {
        if(props.loggedIn){
            navigate("/studyplan/view")
        } else {
            navigate("/")
        }
    }

    const handleSignOut = () => {
        logout()
            .then( ret => {
                navigate("/")
                props.setUser(undefined)
            })
            .catch( err => console.error(err))
    }

    return (
        <Navbar collapseOnSelect expand="sm" className={"color-nav"}>
            <Nav.Link><Navbar.Brand onClick={navigateHomepage}>StudyPlan</Navbar.Brand></Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto flex-grow-1 justify-content-evenly" >

                    {props.loggedIn ?
                        <>
                            <Nav.Link className={location.pathname === "/" ? "selected-menu" : ""} onClick={navigateHomepage}>Home</Nav.Link>
                            <Nav.Link className={location.pathname === "/courses" ? "selected-menu" : ""} onClick={navigateCourseList}>Course List</Nav.Link>
                            <Nav.Link className={location.pathname === "/studyplan/view" ? "selected-menu" : ""} onClick={navigateFillStudyPlan}>Study plan</Nav.Link>
                            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                        </> : ""
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;