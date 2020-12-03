import React, {useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,} from "@coreui/react";
import {TextField} from "@material-ui/core";
import axios from "axios";


const ModalEditKomponent = ({item, GetDataUser}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [FormEdit, setFormEdit] = useState({nama_sk : item.nama_sk, id: item.id});
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState([]);
  const [Modal, setModal] = useState(false);
  const TogleModal = () => {
    setModal(!Modal);
  };


  const SaveData = async () => {
    setLoading(true);
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-sk-list`,
      data: FormEdit,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataUser();
      TogleModal();
    }).catch(function (error) {
      setError(error.response.data.error)
    });

    setLoading(false);
  };

  return (
    <React.Fragment>
      <CButton
        color="success"
        variant="outline"
        shape="square"
        size="sm"
        className={'mb-2'}
        onClick={TogleModal}
      >
        Ubah Nama SK
      </CButton>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Ubah Nama Sk</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <TextField label="Nama SK"
                     placeholder="Nama Sk"
                     error={Error.nama_sk}
                     fullWidth
                     value={FormEdit.nama_sk}
                     helperText={Error.nama_sk ? 'Terjadi Kesalahan' : null}
                     onChange={(e) => setFormEdit({...FormEdit, nama_sk : e.target.value})}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="success" disabled={Loading} type='submit' onClick={SaveData}>
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
const ModalEdit = React.memo(ModalEditKomponent);
export default ModalEdit;
