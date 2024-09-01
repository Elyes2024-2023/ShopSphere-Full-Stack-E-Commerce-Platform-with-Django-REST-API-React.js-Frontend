import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from "../Message";
import Loader from "../Loader";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/userActions';
import FormContainer from '../FormContainer';

/**
 * RegisterScreen component handles user registration.
 *
 * It includes a form for user details, handles form submission,
 * and displays messages based on the registration process.
 *
 * @param {object} props - Component props including location and history.
 */
function RegisterScreen({ location, history }) {
    // State hooks for managing form input and error messages
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Redux hooks for dispatching actions and accessing state
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

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
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Form group for email input */}
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Form group for password input */}
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Form group for confirm password input */}
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Submit button */}
                <Button className='mt-3' type='submit' variant='success'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already a user?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
