import React, { useState } from 'react';
import {
  CButton,
  CInvalidFeedback,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCol,
  CInputFile,
  CSelect
} from '@coreui/react';
import { Formik, Field } from 'formik';
import Swal from 'sweetalert2';

const initialValues = {
  title: '',
  desc: '',
  image: '',
  price: '',
  paymentMethods: [],
  masterDiscount: 'percent',
  masterDiscountAmount: '',
  visaDiscount: 'percent',
  visaDiscountAmount: ''
};

const EVocuherForm = ({defaultValues, onSubmitForm}) => {
  const [usedMasterCard, setUsedMasterCard] = useState(false);
  const [usedVisaCard, setUsedVisaCard] = useState(false);

  let formInitial = defaultValues ? defaultValues : initialValues

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const onSubmit = (values, { setSubmitting }) => {
    const form = { ...values };
    const paymentMethods = [];

    if (!form.title) {
      Toast.fire({
        icon: 'error',
        text: "Title is required"
      })
      return
    }

    if (!form.price) {
      Toast.fire({
        icon: 'error',
        text: "Price is required"
      })
      return
    }

    if (!usedMasterCard && !usedVisaCard) {
      Toast.fire({
        icon: 'error',
        text: "Payment method require"
      })
      return
    }



    if (usedMasterCard) {
      paymentMethods.push(
        {
          name: 'master_card',
          discountAmount: form.masterDiscountAmount,
          discount: form.masterDiscount
        }
      )
    }

    if (usedVisaCard) {
      paymentMethods.push(
        {
          name: 'visa_card',
          discountAmount: form.visaDiscountAmount,
          discount: form.visaDiscount
        }
      )
    }

    console.log({
      title: form.title,
      desc: form.desc,
      price: form.price,
      image: form.image,
      paymentMethods
    })
  }

  return (
    <Formik
      initialValues={formInitial}
      onSubmit={onSubmit}
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
          name="createEVoucherForm"
        >
          <CFormGroup>
            <CLabel htmlFor="nf-title">Title</CLabel>
            <CInput
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              valid={touched.title && !errors.title}
              invalid={touched.title && !!errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              required
            />
            <CInvalidFeedback>{errors.title}</CInvalidFeedback>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="nf-desc">Description</CLabel>
            <CInput
              type="text"
              id="desc"
              name="desc"
              placeholder="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.desc}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="nf-image">Select Image</CLabel>
            <CCol xs="12" md="9">
              <CInputFile
                id="=image" name="image"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="nf-price">Enter Price</CLabel>
            <CInput
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              required
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="nf-status">Status</CLabel>
            {/* TODO: Add toggle */}
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="nf-status">Enter PaymentMethod</CLabel>
            </CCol>
            <CCol md="3">
              <label>
                <Field
                  type="checkbox"
                  id="paymentMethods"
                  name="paymentMethods"
                  value='master_card'
                  onChange={(() => setUsedMasterCard(!usedMasterCard))}
                  checked={usedMasterCard}
                />
                Master Card
              </label>
            </CCol>
            <CCol md="3">
              <label>
                <Field
                  type="checkbox"
                  id="paymentMethods"
                  name="paymentMethods"
                  value='visa_card'
                  checked={usedVisaCard}
                  onChange={(() => setUsedVisaCard(!usedVisaCard))}
                />
                Visa Card
              </label>
            </CCol>
          </CFormGroup>
          {
            usedMasterCard && (
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="selectSm">Master Card Payment Discount</CLabel>
                </CCol>

                <CCol md="3">
                  <CInput
                    type="number"
                    id="masterDiscountAmount"
                    name="masterDiscountAmount"
                    placeholder="discount Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.masterDiscountAmount}
                  />
                </CCol>

                <CCol xs="3" md="3">
                  <CSelect custom size="sm" name="masterDiscount" id="masterDiscount" value={values.masterDiscount}>
                    <option value="percent">%</option>
                    <option value="value">Vlaue</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            )
          }
          {
            usedVisaCard && (
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="selectSm">VISA Card Payment Discount</CLabel>
                </CCol>

                <CCol md="3">
                  <CInput
                    type="number"
                    id="visaDiscountAmount"
                    name="visaDiscountAmount"
                    placeholder="discount Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.visaDiscountAmount}
                  />
                </CCol>

                <CCol xs="3" md="3">
                  <CSelect custom size="sm"
                    name="visaDiscount"
                    id="visaDiscount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.visaDiscount}
                  >
                    <option value="percent" selected>%</option>
                    <option value="value">Vlaue</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            )
          }
          <CFormGroup row>
            <CButton
              type="submit"
              color="primary"
              sie="lg"
              block
            // disabled={isSubmitting || !isValid}
            >
              Save
            </CButton>
          </CFormGroup>
        </CForm>
      )}
    </Formik>
  )
}

export default EVocuherForm;
