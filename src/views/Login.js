import { Button, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {

    const [userName, setUsername] = useState("");
    const [usernameInvalid, setUsernameInvalid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setPasswordInvalid] = useState(false);

    const db = firebase.firestore();

    const history = useHistory();

    async function submit() {
        const user = await db.collection("/users/").where("username", "==", userName).get();
        
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

    async function forgotPassword() {
        const user = await db.collection("/users/").where("username", "==", userName).get();

        if (user.empty) {
            setUsernameInvalid(true);
        } else {
            firebase.auth().sendPasswordResetEmail(user.docs[0].data().email).then(r => {
                document.getElementById('resetLink').innerHTML = 'An email has been sent to the address you registered with to reset your password.'
            })
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
                                            <InputGroup.Text style={{borderRadius: '0px'}} className='bg-c-info'>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control placeholder="Username" type="text" required
                                            className='bg-c-dark'
                                            onChange={(r) => setUsername(r.target.value)}
                                            isInvalid={usernameInvalid} />
                                        <Form.Control.Feedback type="invalid">
                                            This username does not exists.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col}>
                                        <Form.Control
                                            type="password" required
                                            className='bg-c-dark'
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
                            <Form.Row className='justify-content-center mb-3'>
                                <a id="resetLink" href="#login" onClick={() => forgotPassword()}>
                                    Forgot password ?
                                </a>
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