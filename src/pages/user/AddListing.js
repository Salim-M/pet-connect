import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import ErrorMessage from "../../components/common/ErrorMessage";
import PetConnectApi from "../../apis/PetConnectApi";
import { addListing } from "../../actions/listingsActions";
import { useDispatch } from "react-redux";

const ListingSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name should be a minimum of 4 characters")
    .required("Required"),
  price: Yup.number().positive().integer(),

  animal_id: Yup.string().required("Please select animal type"),
  images: Yup.mixed().required("Please select some images"),
  has_address: Yup.boolean(),

  address1: Yup.string()
    .min(8, "Address should be a minimum of 8 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),
  address2: Yup.string().min(8, "Address should be a minimum of 8 characters"),
  district: Yup.string()
    .min(4, "District should be a minimum of 4 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),
  city: Yup.string()
    .min(4, "City should be a minimum of 4 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),

  description: Yup.string()
    .min(30, "Description should be a minimum of 30 characters")
    .required("Required"),
});

const AddListing = () => {
  const [animals, setAnimals] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    PetConnectApi.get("/animals").then((res) => setAnimals(res.data.animals));
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Listing - My Listings | PetConnect</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center min-h-screen py-10">
        <div className="space-y-7 px-4 w-full md:w-2/3 lg:w-2/5 mt-auto">
          <div className="flex flex-col space-y-1">
            <h2 className="font-base text-3xl text-gray-800">Add a Listing</h2>
            <p className="font-light text-xl">
              Create a new listing by filling the form below.
            </p>
          </div>
          <Formik
            initialValues={{
              name: "",
              price: "",
              description: "",
              animal_id: "",
              images: null,
              has_address: false,
              address1: "",
              address2: "",
              district: "",
              city: "",
            }}
            validationSchema={ListingSchema}
            onSubmit={(values, actions) => {
              dispatch(addListing(values, actions));
            }}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="space-y-2">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      as={Input}
                    />
                    {errors.name && touched.name ? (
                      <ErrorMessage msg={errors.name} />
                    ) : null}
                  </div>
                  <div>
                    {animals.length > 0 ? (
                      <Field
                        as="select"
                        name="animal_id"
                        className="bg-white focus:outline-none focus:ring rounded py-2 text-gray-900 px-3 w-full shadow border"
                      >
                        {animals.map((animal) => (
                          <option value={animal.id} key={animal.id}>
                            {animal.name}
                          </option>
                        ))}
                      </Field>
                    ) : null}
                    {errors.animal_id && touched.animal_id ? (
                      <ErrorMessage msg={errors.animal_id} />
                    ) : null}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="price"
                      placeholder="Price"
                      as={Input}
                    />
                    {errors.price && touched.price ? (
                      <ErrorMessage msg={errors.price} />
                    ) : null}
                  </div>
                  <div>
                    <Field
                      name="description"
                      placeholder="Description"
                      as={Textarea}
                    />
                    {errors.description && touched.description ? (
                      <ErrorMessage msg={errors.description} />
                    ) : null}
                  </div>
                  <div className="flex flex-row items-center space-x-3">
                    <input
                      type="checkbox"
                      name="has_address"
                      className="mt-0.5"
                      onChange={() =>
                        setFieldValue("has_address", !values.has_address)
                      }
                      checked={!values.has_address}
                    />
                    <p className="text-gray-600">Use my Address</p>
                  </div>
                  {values.has_address ? (
                    <>
                      <div>
                        <Field
                          type="address1"
                          name="address1"
                          placeholder="Primary Address"
                          as={Input}
                        />
                        {errors.address1 && touched.address1 ? (
                          <ErrorMessage msg={errors.address1} />
                        ) : null}
                      </div>
                      <div>
                        <Field
                          type="address2"
                          name="address2"
                          placeholder="Secondary Address"
                          as={Input}
                        />
                        {errors.address2 && touched.address2 ? (
                          <ErrorMessage msg={errors.address2} />
                        ) : null}
                      </div>
                      <div>
                        <Field
                          type="district"
                          name="district"
                          placeholder="District"
                          as={Input}
                        />
                        {errors.district && touched.district ? (
                          <ErrorMessage msg={errors.district} />
                        ) : null}
                      </div>
                      <div>
                        <Field
                          type="city"
                          name="city"
                          placeholder="City"
                          as={Input}
                        />
                        {errors.city && touched.city ? (
                          <ErrorMessage msg={errors.city} />
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
                <Field name="images">
                  {({ meta }) => (
                    <div className="mt-3">
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          setFieldValue("images", e.target.files)
                        }
                      />
                      {meta.touched && meta.error && (
                        <ErrorMessage msg={meta.error} />
                      )}
                    </div>
                  )}
                </Field>
                {/* <div>
                  <Field name="images" type="file" multiple on />
                  {errors.images && touched.images ? (
                    <ErrorMessage msg={errors.images} />
                  ) : null}
                </div> */}
                <Button
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
                  className="w-full mt-6"
                >
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddListing;
