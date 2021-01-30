import {Button, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import Datetime from 'react-datetime';

const Register = () => {

    function verifyForm() {
        return true;
    }

    return (
        <div className="center-items">
            <Container>
                <Row className="justify-content-center">
                    <h1>Create an account!</h1>
                </Row>
                <Col xs lg={5} className="mx-auto mt-5">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                                <Form.Control.Feedback type="invalid">
                                    There is already an account with this email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
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
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Date of Birth</Form.Label>
                                <Datetime timeFormat={false}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as={Col} controlId="formPassword">
                                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword"
                                    aria-describedby="passwordHelpBlock"
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long, contain letters and numbers, and
                                    must not contain spaces, special characters, or emoji.
                                </Form.Text>
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as={Col} controlId="formPasswordVerify">
                                <Form.Label htmlFor="inputPasswordVerify">Retype Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPasswordVerify"
                                />
                            </FormGroup>
                        </Form.Row>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="I agree to the terms of conditions"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}

export default Register;