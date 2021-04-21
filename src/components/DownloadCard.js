import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { faFile } from "@fortawesome/free-regular-svg-icons";

function DownloadCard(props) {

    DownloadCard.propTypes = {
        version: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        downloadLink: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }

    return (
        <>
            <Card className="mt-5">
                <Card.Body>
                    <Card.Title>{ props.version }</Card.Title>
                    <Card.Text>
                        { props.description }
                        <br></br>
                        <i>{ props.date }</i>
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={() => window.open(props.downloadLink)}>
                        <FontAwesomeIcon icon={faFile}></FontAwesomeIcon> Download
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default DownloadCard;