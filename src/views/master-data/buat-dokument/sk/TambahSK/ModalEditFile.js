import React, {useState} from 'react';
import {
  CButton, CCol, CFormGroup,
  CInputFile,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import axios from "axios";


const ModalEditFileKomponent = ({item, GetDataUser}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Form, SetForm] = useState({file : '', id: item.id});
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState([]);
  const [Modal, setModal] = useState(false);
  const TogleModal = () => {
    setModal(!Modal);
  };

  console.log(Form)

  const SaveData = async (e) => {
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.set('file', Form.file);
    bodyFormData.set('id', Form.id);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-file-sk-list`,
      data: bodyFormData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataUser();
      TogleModal();
    }).catch(function (error) {
      setError(error.response.data.error);
    });
    SetForm({file : '' , id : item.id})

    setLoading(false);
  };

  return (
    <React.Fragment>
      <CButton
        color="info"
        variant="outline"
        shape="square"
        size="sm"
        onClick={TogleModal}
      >
        Ubah File SK
      </CButton>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="info">
        <CModalHeader closeButton>
          <CModalTitle>Ubah Nama Sk</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol className='mt-3' xs="12" md="12">
          <CFormGroup row>
            <CInputFile invalid={Error.file} custom id="custom-file-input"
                        onChange={(e) => SetForm({...Form, file : e.target.files[0]})}
                        onClick={(event)=> {
                          event.target.value = null
                        }}
            />
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
          <CButton color="info" disabled={Loading} type='submit' onClick={SaveData}>
            {
              Loading ? '...Loading' : 'Ubah'
            }
          </CButton>{' '}
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
const ModalEditFile = React.memo(ModalEditFileKomponent);
export default ModalEditFile;
