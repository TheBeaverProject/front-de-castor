import PropTypes from "prop-types";
import {Col, Container, Image, Row} from "react-bootstrap";

const NewsArticle = (props) => {

    NewsArticle.propTypes = {
        data: PropTypes.object.isRequired,
    };

    const data = props.data;

    return (
        <>
            <Container className="container-sm">
                <Row className="justify-content-center">
                    <Col className="col-9">
                        <Row className="justify-content-center mt-5">
                            <h1>{data.title}</h1>
                        </Row>
                        <Row className="mt-3">
                            <h4 className="text-muted">
                                {data.author}
                            </h4>
                        </Row>
                        <Row className="mt-5">
                            <Image className="card-img" src={data.previewImage}/>
                        </Row>
                        <Row className="mt-5">
                            <p dangerouslySetInnerHTML={{__html: data.content}}/>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );

}
export default NewsArticle;