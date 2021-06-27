import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AuthContext } from '../context/authContext'
import {
  Redirect,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import apiClient from '../util/apiClient.js';

const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const authContext = useContext(AuthContext);
  const [isExpired, setIsExpired] = useState(false);
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  useEffect(() => {
    console.log(authContext.authState)
    if (authContext.isExpired()) {
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: "Session expired. Do you want to Continue Log in.",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Log out",
      })
        .then((result) => {
          if (result.isConfirmed) {
            const auth = { ...authContext.authState.auth }
            apiClient.post('/getAccessToken', { userId: auth.id, enableRefresh: true })
              .then((res) => res.data)
              .then((data) => {
                console.log(data.data.accessToken)
                authContext.setAuthState({
                  auth: {
                    id: auth.id,
                    name: auth.name,
                    accessToken: data.data.accessToken,
                    expiredAt: data.data.expiredAt
                  },
                })
              })
          } else {
            setIsExpired(true)
            authContext.logout()
          }
        })
      setIsExpired(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!authContext.isAuthenticated()) {
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <div className={classes}>
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
