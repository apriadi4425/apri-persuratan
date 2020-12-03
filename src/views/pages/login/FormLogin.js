import React from 'react';
import {CButton, CCol, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow} from "@coreui/react";
import { withRouter } from 'react-router-dom';
import CIcon from "@coreui/icons-react";
import ApiLogin from "./ApiLogin";

const FormLoginKomponent = ({history}) => {
  const {CobaLogin, Form, HandleForm, Error, Loading} = ApiLogin(history);
  return (
    <CForm>
      <h1>Login</h1>
      {Error.error ? <p className="text-danger font-weight-bold">{Error.error}</p> : <p className="text-muted">Sign In to your account</p>}
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-user" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="email" invalid={Error.error} value={Form.email} onChange={(e) => HandleForm(e, 'email')} placeholder="Email" autoComplete="email" />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-lock-locked" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="password" invalid={Error.error} value={Form.password} onChange={(e) => HandleForm(e, 'password')} placeholder="Password" autoComplete="current-password" />
      </CInputGroup>
      <CRow>
        <CCol xs="6">
          <CButton onClick={CobaLogin} disabled={Loading} color="primary" className="px-4">{Loading ? '...Loading' : 'Login'}</CButton>
        </CCol>
        <CCol xs="6" className="text-right">
          <CButton color="link" className="px-0">Forgot password?</CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};
const FormLogin = React.memo(FormLoginKomponent);
export default withRouter(FormLogin);
