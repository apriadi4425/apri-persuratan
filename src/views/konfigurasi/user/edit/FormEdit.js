import React from 'react';
import {CCol, CFormGroup, CInput, CInvalidFeedback, CLabel, CRow} from "@coreui/react";


const FormEditKomponent = ({label, name, placeholder, value, onChange, classInput, invalid, warna}) => {
  return (
    <CRow>
      <CCol md={12}>
        <CFormGroup>
          <CLabel htmlFor="inputIsInvalid">{label}</CLabel>
          <CInput invalid={invalid}  className={`${warna} ${classInput}`} value={value} onChange={onChange} id={`${name}_edit`} name={name} placeholder={placeholder}/>
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
const FormEditApp = React.memo(FormEditKomponent);
export default FormEditApp;
