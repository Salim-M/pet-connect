import React, { createRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Avatar from "../../components/Avatar";
import { handleUpdateUser, updateUserImage } from "../../actions/userActions";

const updateProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username should be a minimum of 4 characters")
    .required("Required"),
  phone: Yup.string()
    .min(8, "Phone should be a minimum of 8 characters")
    .nullable(),
});

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const fileInput = createRef();

  const handleImageUpdate = (e) => {
    if (e.target.value === "") return;
    dispatch(updateUserImage(e.target.files[0]));
  };
  return (
    <>
      <Helmet>
        <title>My Profile | PetConnect</title>
      </Helmet>
      <div className="h-full flex flex-col justify-center items-center">
        <div className="space-y-7 px-4 w-full md:w-2/3 lg:w-2/5">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 items-center">
            <Avatar
              lg
              name={user.username}
              image={user.image}
              className="cursor-pointer"
              onClick={() => fileInput.current.click()}
            />
            <input
              type="file"
              ref={fileInput}
              onChange={handleImageUpdate}
              className="hidden"
            />
            <div>
              <h2 className="font-base text-3xl text-gray-800">
                Hi, {user.username}.
              </h2>
              <p className="font-light text-xl">
                Go ahead and edit the fields you want.
              </p>
            </div>
          </div>

          <Formik
            initialValues={{ username: user.username, phone: user.phone ?? "" }}
            validationSchema={updateProfileSchema}
            onSubmit={(values, actions) => {
              dispatch(handleUpdateUser(values, actions));
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="space-y-2">
                  <div>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      as={Input}
                    />
                    {errors.username && touched.username ? (
                      <ErrorMessage msg={errors.username} />
                    ) : null}
                  </div>
                  <div>
                    <Input value={user.email} disabled />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      as={Input}
                    />
                    {errors.phone && touched.phone ? (
                      <ErrorMessage msg={errors.phone} />
                    ) : null}
                  </div>
                </div>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
                  className="w-full mt-6"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Profile;
