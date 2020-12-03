import React  from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import FormTambah from "./FormTambah";
import ApiTambahUser from "./ApiTambahUser";


const ModalTambahKomponent = ({GetDataUser}) => {
  const {Form, Error, HandleForm, apiData, modal, TogleModal, ButtonForm} = ApiTambahUser(GetDataUser);

  return (
    <React.Fragment>
      <CButton onClick={TogleModal} size="sm" className="btn-brand mr-2 mb-1"> <FontAwesomeIcon icon={faUserPlus}/></CButton>
      <CModal show={modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Tambah Data User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormTambah invalid={Error.name} value={Form.name} onChange={HandleForm} label={'Nama Pengguna'} name={'name'} placeholder={'Nama Pengguna'}/>
          <FormTambah invalid={Error.email} value={Form.email} onChange={HandleForm}  label={'Email Pengguna'} name={'email'} placeholder={'Email Pengguna'}/>
          <FormTambah invalid={Error.jabatan} value={Form.jabatan} onChange={HandleForm}  label={'Jabatan Pengguna'} name={'jabatan'} placeholder={'Jabatan Pengguna'}/>
          <FormTambah invalid={Error.telpon} value={Form.telpon} onChange={HandleForm}  label={'Telpon Pengguna'} name={'telpon'} placeholder={'Telpon Pengguna'}/>
          <FormTambah classInput='mirip-password' value={Form.password} onChange={HandleForm}  invalid={Error.password} label={'Password Pengguna'} name={'password'} placeholder={'Password Pengguna'}/>
          <FormTambah classInput='mirip-password' value={Form.c_password} onChange={HandleForm}  invalid={Error.c_password} label={'Konfirmasi Password'} name={'c_password'} placeholder={'Konfirmasi Password'}/>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" disabled={ButtonForm} onClick={apiData}>
            {
              ButtonForm ? '... Loading' : 'Tambah Data'
            }
          </CButton>
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalTambah = React.memo(ModalTambahKomponent);
export default ModalTambah;
