import {SiGithub} from "react-icons/si";
import {Col, Row} from "react-bootstrap";
import {GrInstagram} from "react-icons/gr";

const Footer = (props) => {
    return (
        <div className={"footer"}>
            <Row>
                <Col/>
                <Col>
                    Made by Giovanni Mirarchi
                </Col>
                <Col>
                    <a style={{paddingLeft: "20px", textDecoration: "none", color: "#000000"}}
                       href={"https://github.com/giovannimirarchi420/"}
                       target="_blank"><SiGithub/></a>

                    <a style={{ paddingLeft: "20px", textDecoration: "none", color: "#000000"}}
                       href={"https://www.instagram.com/_hemek/"}
                       target="_blank"><GrInstagram/></a>

                </Col>
            </Row>
        </div>

    )
}

export default Footer