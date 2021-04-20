import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Badge } from "react-bootstrap";
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
            <Card className="mt-5">
                <Card.Body>
                    <Card.Title>{ props.version } { props.isDefense ? <Badge variant="info">Defense Handout</Badge> : '' } { props.isFirst ? <Badge variant="primary">Latest</Badge> : '' }</Card.Title>
                    <Card.Text>
                        { props.description }
                        <br></br>
                        <i>{ props.date }</i>
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={() => window.open(props.downloadLink)}>
                        <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default DownloadCard;