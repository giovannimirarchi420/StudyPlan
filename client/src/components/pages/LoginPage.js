import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {getCourseList, login} from "../../utils/API";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleLogin = (evt) => {
        evt.preventDefault()
        if(!email.match(emailRegex)){
            setErrorMessage("Please insert a valid email address.")
            return;
        } else {
            setErrorMessage("")
        }

        login({username: email, password: password})
            .then(user => {
                if(user.id === undefined){
                    setErrorMessage(user.message)
                    return
                }
                props.setUser(user)
                getCourseList()
                    .then( courses => {
                        props.setCourses(courses)
                    })
                    .catch()
                navigate("/home")
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <Container>
            <Row>
                <div style={{height: "20vh"}}/>
            </Row>
            <Row>
                <Col>
                    <div className={"homepage-text"}>
                        <h1 className="create-your" style={{color: "black"}}>Create your</h1>
                        <span className="title-page" style={{color: "#b0afaf"}}>Study</span>
                        <span className="title-page" style={{color: "#b0afaf"}}>Plan.</span>
                        <a href={"/courses"}><p>Check the courses</p></a>
                    </div>
                </Col>
                <Col>
                    <Card body className={"login-card"}>
                        {errorMessage ? <div className={"error-message-login"}>{errorMessage}</div> : ""}
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                              onChange={(evt) => setEmail(evt.target.value)}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={(evt) => setPassword(evt.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleLogin}>
                                Sign in
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage