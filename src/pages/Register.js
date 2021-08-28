import React from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { register } from "../actions/authActions";
import * as Yup from "yup";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ErrorMessage from "../components/common/ErrorMessage";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username should be a minimum of 4 characters")
    .required("Required"),
  email: Yup.string().email("Your email is invalid").required("Required"),
  password: Yup.string()
    .min(8, "Password should be a minimum of 8 characters")
    .required("Required"),
});

const Register = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Register | PetConnect</title>
      </Helmet>
      <div className="px-5 py-3">
        <h1 className="font-pacifico text-blue-700 text-2xl">PetConnect</h1>
      </div>
      <main className="flex justify-center items-center h-screen -mt-16">
        <div className="space-y-7 px-4 w-full md:w-2/3 lg:w-2/5">
          <div>
            <h2 className="font-base text-3xl text-gray-800">Welcome back.</h2>
            <p className="font-light text-xl">
              Register an account at PetConnect!
            </p>
          </div>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              dispatch(register(values, actions));
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="space-y-2">
                  <div>
                    <Field
                      type="username"
                      name="username"
                      placeholder="Username"
                      as={Input}
                    />
                    {errors.username && touched.username ? (
                      <ErrorMessage msg={errors.username} />
                    ) : null}
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      as={Input}
                    />
                    {errors.email && touched.email ? (
                      <ErrorMessage msg={errors.email} />
                    ) : null}
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="block"
                      as={Input}
                    />
                    {errors.password && touched.password ? (
                      <ErrorMessage msg={errors.password} />
                    ) : null}
                  </div>
                </div>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
                  className="w-full mt-6"
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-800 text-md">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="underline text-blue-400 hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
