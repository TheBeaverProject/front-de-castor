import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Badge } from "react-bootstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloadCard(props) {

    DownloadCard.propTypes = {
        version: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        downloadLink: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        isFirst: PropTypes.bool,
        isDefense: PropTypes.bool
    }

    return (
        <>
            <Card data-augmented-ui="br-clip" className={props.isDefense ? "mt-5 bg-c-success" : props.isFirst ? "mt-5 bg-c-info" : "mt-5 bg-c-light"}>
                <Card.Body>
                    <Card.Title>{props.version} {props.isDefense ? <Badge variant="info" className="bg-c-warning">Defense Handout</Badge> : ''} {props.isFirst ? <Badge variant="primary" className="bg-c-primary">Latest</Badge> : ''}</Card.Title>
                    <Card.Text>
                        {props.description}
                        <br></br>
                        <i>{props.date}</i>
                    </Card.Text>
                    <a className="bg-c-dark btn btn-primary"
                        data-augmented-ui="br-clip"
                        download={`${props.version.replace(" ", "-")}-setup`}
                        target={props.isDefense ? "_blank" : ""} rel="noreferrer"
                        href={props.downloadLink}>
                        <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download
                    </a>
                </Card.Body>
            </Card>
        </>
    )
}

export default DownloadCard;