import {Button, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const Login = () => {

    const [userName, setUsername] = useState("");
    const [usernameInvalid, setUsernameInvalid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setPasswordInvalid] = useState(false);

    const db = firebase.firestore();

    const history = useHistory();

    async function submit() {
        const user = await db.collection("/users/").where("username", "==", userName).get();
        console.log(user);
        if (user.empty) {
            setUsernameInvalid(true);
        } else {
            setUsernameInvalid(false);
            firebase.auth().signInWithEmailAndPassword(user.docs[0].data().email, password).then((r) => {
                history.push("/");
            }).catch((reason => {
                setPasswordInvalid(true);
            }));
        }
    }

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
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control placeholder="Username" type="text" required
                                                      onChange={(r) => setUsername(r.target.value)}
                                                      isInvalid={usernameInvalid}/>
                                        <Form.Control.Feedback type="invalid">
                                            This username does not exists.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col}>
                                    <Form.Label htmlFor="inputPasswordVerify">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        isInvalid={isPasswordInvalid}
                                        onChange={(r) => {
                                            setPassword(r.target.value)
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Invalid password for this username.
                                    </Form.Control.Feedback>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row className="justify-content-end">
                                <Button variant="link">
                                    Forgot password ?
                                </Button>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Button variant="primary" onClick={() => submit()}>
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