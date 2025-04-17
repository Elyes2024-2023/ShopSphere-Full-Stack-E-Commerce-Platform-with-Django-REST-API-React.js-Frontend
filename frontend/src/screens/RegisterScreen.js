import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../redux/actions/userActions';

/**
 * RegisterScreen component handles user registration.
 *
 * It includes a form for user details, handles form submission,
 * and displays messages based on the registration process.
 *
 * @param {object} props - Component props including location and history.
 */
const RegisterScreen = ({ location, history }) => {
    // State hooks for managing form input and error messages
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    // Redux hooks for dispatching actions and accessing state
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // Determine redirect path from query string or default to home
    const redirect = location.search ? location.search.split('=')[1] : '/';

    // Effect hook to redirect user upon successful registration
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    /**
     * Handles form submission by dispatching the register action
     * and validating password match.
     *
     * @param {object} e - The event object.
     */
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {/* Display error or success messages */}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                {/* Form group for name input */}
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Form group for email input */}
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Form group for password input */}
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Form group for confirm password input */}
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Submit button */}
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
