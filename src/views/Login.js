import {Button, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
//import {useHistory} from "react-router-dom";

const Login = () => {

    //const history = useHistory();

    return (
        <>
            <div className="center-items">
                <Container>
                    <Row className="justify-content-center">
                        <h1>Login</h1>
                    </Row>
                    <Col xs lg={5} className="mx-auto mt-5">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUsername">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control placeholder="Username" type="text" required/>
                                        <Form.Control.Feedback type="invalid">
                                            This username already exists.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} controlId="formPasswordVerify">
                                    <Form.Label htmlFor="inputPasswordVerify">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="inputPasswordVerify"
                                    />
                                </FormGroup>
                            </Form.Row>
                            <Form.Row className="justify-content-end">
                                <p>
                                    Forgot password ?
                                </p>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form.Row>
                        </Form>
                    </Col>
                </Container>
            </div>
        </>
    );
}


export default Login;