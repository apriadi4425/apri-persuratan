import React, {useState}  from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from '@coreui/react'
import FormEditApp from "./FormEdit";
import axios from "axios";

const ModalEditKomponent = ({FormEdit, modalEdit, TogleModalEdit, HandleFormEdit, ErrorFormEdit, SetErrorFormEdit, GetDataUser}) => {
  const [LoadingButton, setLoadingButton] = useState(false);
  const CobaEditUser = async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    setLoadingButton(true);
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/user/${FormEdit.id}`,
      data : FormEdit,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
      }).then(response => {
        GetDataUser()
        TogleModalEdit();
      }).catch(error => {
      if (error.response) {
        if(error.response.status === 400){
          SetErrorFormEdit(error.response.data.message);
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
      <CModal show={modalEdit} onClose={TogleModalEdit} closeOnBackdrop={false} color="info">
        <CModalHeader closeButton>
          <CModalTitle>Edit Data User #{FormEdit.name}#</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormEditApp warna={'biru_sedang'} invalid={ErrorFormEdit.name}  value={FormEdit.name} onChange={HandleFormEdit} label={'Nama Pengguna'} name={'name'} placeholder={'Nama Pengguna'}/>
          <FormEditApp warna={'biru_sedang'} invalid={ErrorFormEdit.email} value={FormEdit.email} onChange={HandleFormEdit}  label={'Email Pengguna'} name={'email'} placeholder={'Email Pengguna'}/>
          <FormEditApp warna={'biru_sedang'} invalid={ErrorFormEdit.jabatan} value={FormEdit.jabatan} onChange={HandleFormEdit}  label={'Jabatan Pengguna'} name={'jabatan'} placeholder={'Jabatan Pengguna'}/>
          <FormEditApp warna={'biru_sedang'} invalid={ErrorFormEdit.telpon} value={FormEdit.telpon} onChange={HandleFormEdit}  label={'Telpon Pengguna'} name={'telpon'} placeholder={'Telpon Pengguna'}/>

        </CModalBody>
        <CModalFooter>
          <CButton disabled={LoadingButton} onClick={CobaEditUser} color="info">
            {
              LoadingButton ? '...Loading' : 'Simpan Data'
            }
          </CButton>
          <CButton color="secondary" onClick={TogleModalEdit}>Cancel</CButton>
        </CModalFooter>
      </CModal>
  );
}
const ModalEdit = React.memo(ModalEditKomponent);
export default ModalEdit;
