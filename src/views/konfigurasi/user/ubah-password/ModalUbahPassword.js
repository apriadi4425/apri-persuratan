import React, {useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import FormEditApp from "../edit/FormEdit";
import axios from "axios";

const ModalUbahPasswordKomponent = ({modalPassword, TogleModalPassword, FormEdit}) => {
  const [FormPass, setFormPass] = useState({password :'', c_password : ''});
  const [ErrorPass, setErrorPass] = useState([]);
  const [LoadingButton, setLoadingButton] = useState(false);

  const UbahPassword = async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    setLoadingButton(true);
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/user-password/${FormEdit.id}`,
      data : FormPass,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      TogleModalPassword();
    }).catch(error => {
      if (error.response) {
        if(error.response.status === 400){
          setErrorPass(error.response.data.message);
        }else{
          console.log(error.response.status)
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
    setLoadingButton(false);
  }
  return (
    <React.Fragment>
      <CModal show={modalPassword} onClose={TogleModalPassword} closeOnBackdrop={false} color="warning">
        <CModalHeader closeButton>
          <CModalTitle>Ubah Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormEditApp warna='kuning_sedang' invalid={ErrorPass.password} value={FormPass.password} onChange={(e) => setFormPass({...FormPass, password : e.target.value})} classInput='mirip-password' label={'Password Baru'} name={'password'} placeholder={'Masukan Passworrd Baru'}/>
          <FormEditApp warna='kuning_sedang' invalid={ErrorPass.c_password} value={FormPass.c_password} onChange={(e) => setFormPass({...FormPass, c_password : e.target.value})} classInput='mirip-password' label={'Konfirmasi Password Baru'} name={'c_password'} placeholder={'Masukan Konfirmasi Passworrd Baru'}/>
        </CModalBody>
        <CModalFooter>
          <CButton disabled={LoadingButton} onClick={UbahPassword} color="warning">
            {
              LoadingButton ? '...Loading' : 'Ubah Data'
            }
          </CButton>
          <CButton color="secondary" onClick={TogleModalPassword}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalUbahPassword = React.memo(ModalUbahPasswordKomponent);
export default ModalUbahPassword;
