import React, {useState} from 'react';
import {
  CButton,
  CCol, CFormGroup,
  CInputFile, CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import ModalHelpers from "./ModalHelpers";
import {TextField} from "@material-ui/core";

const ModalTambahKomponent = ({history}) => {

  const [Modal, setModal] = useState(false);
  const TogleModal = () => {
    setModal(!Modal);
  };
  const {Form, SetForm, Loading, SaveData, Error} = ModalHelpers(setModal,history);

  return (
    <React.Fragment>
      <CButton onClick={TogleModal} size="sm" className="btn-brand mr-2 mb-1"> <FontAwesomeIcon icon={faPlusSquare} size='lg'/></CButton>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="primary">
        <CModalHeader closeButton>
          <CModalTitle>Tambah List SK Baru</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <TextField label="Nama SK Baru"
                     placeholder="Nama Sk Baru"
                     error={Error.nama_sk}
                     fullWidth
                     value={Form.nama_sk}
                     helperText={
                       Error.nama_sk ? Error.nama_sk.map((list, index)=>
                       list
                     ) : null}
                     onChange={(e) => SetForm({...Form, nama_sk : e.target.value})}
          />

            <CCol className='mt-3' xs="12" md="12">
              <CFormGroup row>
              <CInputFile invalid={Error.file} custom id="custom-file-input" onChange={(e) => SetForm({...Form, file : e.target.files[0]})}/>
              <CLabel htmlFor="custom-file-input" variant="custom-file">
                {Form.file ? Form.file.name : 'Upload Template'}
              </CLabel>
              {Error.file ? Error.file.map((list, index)=>
                <CInvalidFeedback key={index}>{list}</CInvalidFeedback>
              ) : null}
              </CFormGroup>
            </CCol>

        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={Loading} type='submit' onClick={SaveData}>
            {
              Loading ? '...Loading' : 'Daftarkan'
            }
          </CButton>{' '}
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
const ModalTambah = React.memo(ModalTambahKomponent);
export default ModalTambah;
