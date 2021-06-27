import React, { useState, useContext, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import dotenv from 'dotenv';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/authContext';
import apiClient from '../../../util/apiClient';
import { useHistory } from 'react-router-dom';

const Login = () => {
  dotenv.config();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (authContext.isExpired()) {
      Toast.fire('error', 'Session expired please login again')

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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


  const onSubmitHandler = async () => {
    await apiClient.post('/login', {
      username,
      password
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.status === 200) {
          const userData = data.data;
          apiClient.post('/getAccessToken', { userId: userData.id })
            .then((res) => res.data)
            .then((data) => {
              Object.assign(userData, {
                ...data.data,
              })
              authContext.setAuthState({
                auth: userData,
              })
            })
          setTimeout(() => {
            history.push('/dashboard')
          }, 700);
          Toast.fire({
            icon: 'success',
            title: "Login SUccessful"
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
        }
      })
  }

  if (authContext.isAuthenticated()) {
    history.push('/dashboard')
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={(event) => setUsername(event.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={onSubmitHandler}>Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
