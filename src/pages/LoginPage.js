import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import useStore from "../stores/store";

function LoginPage() {
    const {setUserEmail} = useStore();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        if (errors.email || errors.password) {
            console.log(errors);
        } else {
            console.log("Login successful.");
            setUserEmail(data.email);
            reset();
            navigate('/');
        }
    };

    return (
        <div className="container-sm my-5" style={{ maxWidth: '480px' }}>
            <h2 className="my-4">Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" autoComplete="off" {
                        ...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                        })} />
                    {errors.email && <p className="text-danger mt-1">Email is not valid.</p>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="off" {
                        ...register('password', {
                            required: true
                        })} />
                    {errors.password && <p className="text-danger mt-1">Password is required.</p>}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;