import React from 'react';
import {CCol, CFormGroup, CInput, CInvalidFeedback, CLabel, CRow} from "@coreui/react";
import './styleTambah.css';

const FormTambahKomponent = ({label, name, placeholder, value, onChange, invalid, classInput}) => {
  return (
    <CRow>
      <CCol md={12}>
        <CFormGroup>
          <CLabel htmlFor="inputIsInvalid">{label}</CLabel>
          <CInput invalid={invalid} className={`hijau_sedang ${classInput}`} value={value} onChange={onChange} id={name} name={name} placeholder={placeholder}/>
          {
            invalid ? invalid.map((list, i) =>
              <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
            ) : null
          }

        </CFormGroup>
      </CCol>
    </CRow>
  );
}
const FormTambah = React.memo(FormTambahKomponent);
export default FormTambah;
