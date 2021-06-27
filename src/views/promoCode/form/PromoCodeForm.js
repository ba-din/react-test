import React from 'react';
import {
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCol,
  CInputRadio,
} from '@coreui/react';
import { Formik } from 'formik';
import Toast from '../../../components/Toast';

const initialValues = {
  receiverName: '',
  phoneNo: '',
  buyFor: '',
};

const PromoCodeForm = ({ onSubmit, setShowModal }) => {
  const onHandleSubmit = (values) => {
    const form = { ...values };

    if (!form.receiverName) {
      Toast.fire({ icon: 'error', text: 'Name is required' })
      return
    }

    if (!form.phoneNo) {
      Toast.fire({ icon: 'error', text: 'Phone number is required' })
      return
    }

    if (!form.buyFor) {
      Toast.fire({ icon: 'error', text: 'Buy for is required' })
      return
    }

    if (!Number(form.phoneNo)) {
      Toast.fire({ icon: 'error', text: 'Phone number is Invalid' })
      return
    }

    onSubmit(form)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        setFieldTouched,
      }) => (
        <CForm
          onSubmit={handleSubmit}
          noValidate
          name="PromoCodeForm"
        >
          <CFormGroup row>
            <CLabel htmlFor="name">Name</CLabel>
            <CInput
              type="text"
              id="receiverName"
              name="receiverName"
              placeholder="Enter Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.receiverName}
              required
            />
          </CFormGroup>
          <CFormGroup row>
            <CLabel htmlFor="nf-title">Phone Number</CLabel>
            <CInput
              type="text"
              id="phoneNo"
              name="phoneNo"
              placeholder="Enter Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNo}
              required
            />
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel>Buy For</CLabel>
            </CCol>
            <CCol md="9">
              <CFormGroup variant="custom-radio" inline>
                <CInputRadio custom id="buyFor_self" name="buyFor" value="self" onChange={handleChange} />
                <CLabel variant="custom-checkbox" htmlFor="buyFor_self" >Self</CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-radio" inline>
                <CInputRadio custom id="buyFor_others" name="buyFor" value="others" onChange={handleChange} />
                <CLabel variant="custom-checkbox" htmlFor="buyFor_others">Others</CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="8">
            </CCol>
            <CCol md="2">
              <CButton
                type="button"
                color="danger"
                sie="lg"
                onClick={() => setShowModal(false)}
                style={{ padding: '14px 23px' }}
              >
                Cancel
              </CButton>
            </CCol>

            <CCol md="2">
              <CButton
                type="submit"
                color="success"
                sie="lg"
                style={{ padding: '14px 23px' }}
              // disabled={isSubmitting || !isValid}
              >
                Save
              </CButton>
            </CCol>
          </CFormGroup>
        </CForm>
      )}
    </Formik>
  )
}

export default PromoCodeForm;
