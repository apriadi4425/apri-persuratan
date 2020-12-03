import React from 'react';
import {CCol, CFormGroup, CInput, CLabel, CRow, CValidFeedback} from "@coreui/react";

const FormAplikasiKomponent = ({label, name, placeholder, value, onChange, onKeyPress, valid}) => {
  return (
    <CRow>
      <CCol md={12}>
        <CFormGroup row>
          <CCol md="2 mt-1">
            <CLabel htmlFor="text-input">{label}</CLabel>
          </CCol>
          <CCol xs="12" md="10">
            <CInput valid={valid} value={value} onChange={onChange} id={name} name={name} placeholder={placeholder} onKeyPress={onKeyPress} />
            <CValidFeedback>Data Berhasil Diubah</CValidFeedback>
          </CCol>
        </CFormGroup>
      </CCol>
    </CRow>
  );
}
const FormAplikasi = React.memo(FormAplikasiKomponent);
export default FormAplikasi;
