import React, {useContext} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {GlobalStateContext} from "../globalstate";
import {
  CCol,
  CContainer,
  CRow
} from "@coreui/react";

const TheAfterLayout = () => {
  const {Load} = useContext(GlobalStateContext);
  return (
        Load ?
          <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="6">
                  <div className="clearfix">
                    <h1 className="float-left display-3 mr-4">...Loading</h1>
                    <p className="float-left">Aplikasi APRI, Persuratan Internal Multiflatform (Dekstop dan Android)</p>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </div>


    :
          <div className="c-app c-default-layout">
            <TheSidebar/>
            <div className="c-wrapper">
              <TheHeader/>
              <div className="c-body">
                <TheContent/>
              </div>
              <TheFooter/>
            </div>
          </div>
  )
}

export default TheAfterLayout
