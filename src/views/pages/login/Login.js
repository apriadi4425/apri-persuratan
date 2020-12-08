import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow} from '@coreui/react'
import FormLogin from "./FormLogin";

const Login = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
        {localStorage.getItem('login') ? <Redirect to={'/'}/> : null}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormLogin/>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Aplikasi tata persuratan dengan menggunakan disposisi melalui Aplikasi berbasis Android yang dapat didownload di playstore</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Daftar Sekarang!</CButton>
                    </Link>
                  </div>
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
