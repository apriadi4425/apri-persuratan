import React from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from "axios";

const ModalEditVariabelKomponent = ({Modal, LoadingS, setLoadingS, setModal, Form, GgetData, setForm}) => {

  const User = JSON.parse(localStorage.getItem('user'));

  const EditVariabel = async () => {
    await setLoadingS(true);
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-variabel`,
      data: Form,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GgetData();
      TogleModal();
    }).catch(function (error) {
      console.log('error')
    });
    await setLoadingS(false)
  };

  const handleForm = (e) => {
    setForm({...Form, [e.target.name] : e.target.value})
  }

  const TogleModal = () => {
    setModal(false);
  }
  return (
    <React.Fragment>

      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Ubah Data Variabel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <TextField label="Nomor Variabel"
                     placeholder="Nomor Variabel"
                     name='nomor_variabel'
                     fullWidth
                     InputLabelProps={{
                       shrink: true,
                     }}
                     margin='normal'
                     value={Form.nomor_variabel}
                     onChange={handleForm}
          />
          <TextField label="Nama Variabel"
                     placeholder="Nama Variabel"
                     name='nama_variabel'
                     fullWidth
                     InputLabelProps={{
                       shrink: true,
                     }}
                     margin='normal'
                     value={Form.nama_variabel}
                     onChange={handleForm}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel id="demo-simple-select-label">Tipe Data</InputLabel>
            <Select
              labelId="Tipe Data"
              name='tipe'
              size={'small'}
              displayEmpty
              value={Form.tipe}
              fullWidth
              onChange={handleForm}
            >
              <MenuItem value=''>Tipe Data</MenuItem>
              <MenuItem value='text'>Text</MenuItem>
              <MenuItem value='date'>Tanggal</MenuItem>
            </Select>
          </FormControl>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" disabled={LoadingS} onClick={EditVariabel} type='submit'>
            {
              LoadingS ? '...Loading' : 'Ubah'
            }
          </CButton>{' '}
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalEditVariabel = React.memo(ModalEditVariabelKomponent);
export default ModalEditVariabel;
