import React from 'react';

import { Helmet } from 'react-helmet';
import {Formik, Form, Field} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAddress } from '../../actions/userActions';
import * as Yup from 'yup';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';

// these fields can be null coming from the backend
const AddressSchema = Yup.object().shape({
    address1: Yup.string().min(8, 'Address should be a minimum of 8 characters').required('Required'),
    address2: Yup.string().min(8, 'Address should be a minimum of 8 characters'),
    district: Yup.string().min(4, 'District should be a minimum of 4 characters').required('Required'),
    city: Yup.string().min(4, 'City should be a minimum of 4 characters').required('Required')
})


const Address = () => {
    const address = useSelector(state => state.auth.user.address);
    const dispatch = useDispatch();

    const initialValues = {
        address1: address.address1 ?? '',
        address2: address.address2 ?? '',
        district: address.district ?? '',
        city: address.city ?? '',
    }


    return (
        <>
            <Helmet>
                <title>My Address | PetConnect</title>
            </Helmet>
            <div className="h-full flex flex-col justify-center items-center">
                <div className="space-y-7 px-4 w-full md:w-2/3 lg:w-2/5">
                    <div>
                        <h2 className="font-base text-3xl text-gray-800">My Address</h2>
                        <p className="font-light text-xl">Go ahead and update your address</p>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={AddressSchema}
                        onSubmit={(values, actions) => {
                            dispatch(updateUserAddress(values, actions));
                        }}
                        
                        >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className="space-y-2">
                                    <div>
                                        <Field type="address1" name="address1" placeholder="Primary Address" as={Input} />
                                        {errors.address1 && touched.address1 ? <ErrorMessage msg={errors.address1} /> : null}
                                    </div>
                                    <div>
                                        <Field type="address2" name="address2" placeholder="Secondary Address" as={Input} />
                                        {errors.address2 && touched.address2 ? <ErrorMessage msg={errors.address2} /> : null}
                                    </div>
                                    <div>
                                        <Field type="district" name="district" placeholder="District" as={Input} />
                                        {errors.district && touched.district ? <ErrorMessage msg={errors.district} /> : null}
                                    </div>
                                    <div>
                                        <Field type="city" name="city" placeholder="City" as={Input} />
                                        {errors.city && touched.city ? <ErrorMessage msg={errors.city} /> : null}
                                    </div>
                                </div>
                                <Button loading={isSubmitting} type="submit" color="primary" className="w-full mt-6">Update</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Address;