import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { login } from '../actions/authActions';
import {Helmet} from 'react-helmet';
import * as Yup from "yup";

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Logo from '../components/common/Logo';
import ErrorMessage from '../components/common/ErrorMessage';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Your email is invalid').required('Required'),
    password: Yup.string().min(8, 'Password should be a minimum of 8 characters').required('Required')
});

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(user !== null){
            history.push('/');
        }
    }, [user, history]);

    return (
        <>
            <Helmet>
                <title>Login | PetConnect</title>
            </Helmet>
            <div className="px-5 py-3">
                <Logo />
            </div>
            <main className="flex justify-center items-center h-screen -mt-16">
                
                <div className="space-y-7 px-4 w-full md:w-2/3 lg:w-2/5">
                    <div>
                        <h2 className="font-base text-3xl text-gray-800">Welcome back.</h2>
                        <p className="font-light text-xl">Enter your email and password to login</p>
                    </div>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, actions) => {
                            dispatch(login(values, actions));
                        }}
                        
                        >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className="space-y-2">
                                    <div>
                                        <Field type="email" name="email" placeholder="Email" as={Input} />
                                        {errors.email && touched.email ? <ErrorMessage msg={errors.email} /> : null}
                                    </div>
                                    <div>
                                        <Field type="password" name="password" placeholder="Password" className="block" as={Input} />
                                        {errors.password && touched.password ? <ErrorMessage msg={errors.password} /> : null}
                                    </div>
                                </div>
                                <Button loading={isSubmitting} type="submit" color="primary" className="w-full mt-6">Login</Button>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-800 text-md">Don't have an account? <Link to="/auth/register" className="underline text-blue-400 hover:text-blue-600">Signup</Link></p>
                </div>
            </main>
        </>
    );
};

export default Login;