import {Button, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import Datetime from 'react-datetime';
import {useState} from "react";
import firebase from "firebase";
import {isDate, isMoment} from "moment";
import {userConverter, User} from "../data/User";
import {useHistory} from "react-router-dom";

const Register = () => {

    const history = useHistory();

    function calculateAge(birthday) { // birthday is a date
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    const db = firebase.firestore();

    const userRef = db.collection("users");

    const [isCGUTicked, setCGUTicked] = useState(false);
    const [isCGUInvalid, setCGUInvalid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setPasswordInvalid] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordVerifyInvalid, setPasswordVerifyInvalid] = useState(false);

    const [birthDate, setBirthDate] = useState(null);
    const [birthDateInvalid, setBirthDateInvalid] = useState(null);
    const [birthDateErrorMessage, setBirthDateErrorMessage] = useState(null);

    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [userName, setUsername] = useState("");
    const [userNameTaken, setUsernameTaken] = useState(false);
    const [userNameErrorMessage, setUserNameErrorMessage] = useState("");

    function checkBirthDate() {
        if (birthDate === null || !isDate(birthDate)) {
            setBirthDateErrorMessage("Please enter a valid date. (dd/mm/yyyy)");
            setBirthDateInvalid(true);
            return false;
        } else if (calculateAge(birthDate) < 13) {
            setBirthDateErrorMessage("You must be aged at least 13 in order to register.")
            setBirthDateInvalid(true);
            return false;
        }
        console.log("Age OK!")
        setBirthDateInvalid(false)
        return true;
    }

    function checkPasswordValid() {
        let passwordValid = true;
        if (password.length < 8 || password.length > 20) {
            console.log("Password too short")
            setPasswordInvalid(true);
            passwordValid = false;
        } else {
            setPasswordInvalid(false);
        }
        if (password !== verifyPassword) {
            console.log("verify password not ok")
            setPasswordVerifyInvalid(true);
            passwordValid = false;
        } else {
            console.log("Password OK!")
            setPasswordVerifyInvalid(false);
        }
        return passwordValid;
    }

    function checkCGUValid() {
        setCGUInvalid(!isCGUTicked)
        console.log("CGU Valid!")
        return isCGUTicked;
    }


    async function checkUsernameAndEmailValid() {
        let emailUsernameValid = true;
        let userDoc = await userRef.where("email", "==", email).get();
        if (email === "") {
            console.log("Email empty")
            setEmailErrorMessage("This field is required");
            setEmailInvalid(true);
            emailUsernameValid = false;
        } else if (!email.match(email_regex)) {
            console.log("Email not valid form!")
            setEmailErrorMessage("This email is not in a valid format.")
            setEmailInvalid(true);
            emailUsernameValid = false;
        } else if (!userDoc.empty) {
            console.log("Email not unique!")
            setEmailErrorMessage("There is already an account with this email.")
            setEmailInvalid(true);
            emailUsernameValid = false;
        } else {
            setEmailInvalid(false);
        }
        if (userName === "") {
            setUserNameErrorMessage("Please enter a username.");
            setUsernameTaken(true);
            emailUsernameValid = false;
        } else {
            userDoc = await userRef.where("username", "==", userName).get();
            if (!userDoc.empty) {
                setUserNameErrorMessage("This username already exists.")
                console.log("Username taken")
                setUsernameTaken(true);
                emailUsernameValid = false;
            } else {
                setUsernameTaken(false);
            }
        }
        console.log("All good email username")
        return emailUsernameValid;
    }

    const handleSubmit = async (event) => {
        let valid = checkCGUValid();
        valid &= await checkUsernameAndEmailValid();
        valid &= checkPasswordValid();
        valid &= checkBirthDate();
        console.log(valid);
        if (!valid) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(r => {
                userRef.doc(r.user.uid).withConverter(userConverter).set(
                    new User(userName, email, birthDate))
                    .then((_) => history.push("/"));
            })
        }
    };

    return (
        <div className="center-items">
            <Container>
                <Row className="justify-content-center">
                    <h1>Create an account!</h1>
                </Row>
                <Col xs lg={5} className="mx-auto mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}
                                              placeholder="Enter email" isInvalid={emailInvalid}/>
                                <Form.Control.Feedback type="invalid">
                                    {emailErrorMessage}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Username" type="text" required value={userName}
                                                  isInvalid={userNameTaken}
                                                  onChange={(e) => setUsername(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        {userNameErrorMessage}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control required
                                              custom={true}
                                              as={Datetime}
                                              timeFormat={false}
                                              onChange={(r) => {
                                                  console.log(r)
                                                  if (isMoment(r)) {
                                                      setBirthDate(r.toDate());
                                                      console.log(r.toDate());
                                                  } else {
                                                      setBirthDate(r);
                                                  }
                                              }}
                                              isInvalid={birthDateInvalid}/>
                                <Form.Control.Feedback type="invalid">
                                    {birthDateErrorMessage}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as={Col}>
                                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    aria-describedby="passwordHelpBlock"
                                    required
                                    isInvalid={isPasswordInvalid}
                                    onChange={(r) => {
                                        setPassword(r.target.value)
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Your password must be 8-20 characters long, contain letters and numbers, and
                                    must not contain spaces, special characters, or emoji.
                                </Form.Control.Feedback>
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as={Col}>
                                <Form.Label htmlFor="inputPasswordVerify">Retype Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPasswordVerify"
                                    required
                                    isInvalid={passwordVerifyInvalid}
                                    onChange={(r) => {
                                        setVerifyPassword(r.target.value)
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    The password you entered doesn't match the first password.
                                </Form.Control.Feedback>
                            </FormGroup>
                        </Form.Row>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check required
                                        isInvalid={isCGUInvalid}
                                        onChange={(r) => {
                                            setCGUTicked(r.target.checked)
                                        }}
                                        feedback="You need to accept the terms and conditions."
                                        type="checkbox" label="I agree to the terms and conditions"/>
                        </Form.Group>

                        <Form.Row className="justify-content-end">
                            <Button variant="primary" onClick={handleSubmit}>
                                Register
                            </Button>
                        </Form.Row>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}

export default Register;