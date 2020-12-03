import React, {useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import axios from "axios";
import {TextField} from "@material-ui/core";

const ModalKonsideranKomponent = ({GetDataKonsideran, Konsideran, nama, jenis, id, TogleModal, Modal}) => {
  const User = JSON.parse(localStorage.getItem('user'));

  const [TambahKolom, setTambahKolom] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [FormKonsideran, setFormKosideran] = useState({sk_list_id : id, urutan : '', jenis : jenis, nomor_huruf : '', isi : ''});
  const [FormKonsideranEdit, setFormKonsideranEdit] = useState({id : '', urutan : '', jenis : jenis, nomor_huruf : '', isi : ''});


  const ClickKonsideranEdit = (list) => {
    setFormKonsideranEdit({id : list.id, urutan : list.urutan, nomor_huruf : list.nomor_huruf, isi : list.isi})
  }
  const HandleFormKonsideran = (e) => {
    setFormKosideran({...FormKonsideran, [e.target.name] : e.target.value});
  }
  const HandleFormKonsideranEdit = (e) => {
    setFormKonsideranEdit({...FormKonsideranEdit, [e.target.name] : e.target.value});
  }

  const TogleTambahKolom = () => {
    setTambahKolom(!TambahKolom);
    setFormKosideran({...FormKonsideran, urutan : '', jenis : jenis, nomor_huruf : '', isi : ''})
  }


  const SaveKolomBaru = async () => {
    setLoading(true)
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/add-konsideran`,
      data: FormKonsideran,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataKonsideran(id, jenis);
      TogleTambahKolom();
    }).catch(function (error) {
      console.log('error')
    });
    setLoading(false)
  }

  const UpdateKolom = async () => {
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-konsideran`,
      data: FormKonsideranEdit,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataKonsideran(id, jenis);
    }).catch(function (error) {
      console.log('error')
    });
    setFormKonsideranEdit({id : '', urutan : '', jenis : jenis, nomor_huruf : '', isi : ''});
  }

  const DeleteKonsideran = async (list) => {
    const DataDelete = {id : list.id};
    await axios({
      method : 'delete',
      url : `${process.env.REACT_APP_BASE_URL}/api/delete-konsideran`,
      data: DataDelete,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(response => {
      GetDataKonsideran();
      setFormKonsideranEdit({id : '', urutan : '', jenis : jenis, nomor_huruf : '', isi : ''});
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <React.Fragment>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Konsideran {nama}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th width='5%'>Urutan</th>
                <th width='10%'>Huruf</th>
                <th width='65%'>Isi</th>
                <th width='20%'>Aksi</th>
              </tr>
            </thead>
            <tbody>
            {Konsideran.map((list, index)=>
              FormKonsideranEdit.id === list.id ?
                <tr key={index}>
                  <td>
                    <TextField fullWidth onChange={HandleFormKonsideranEdit}  name='urutan' value={FormKonsideranEdit.urutan}/>
                  </td>
                  <td>
                    <TextField fullWidth onChange={HandleFormKonsideranEdit}  name='nomor_huruf' value={FormKonsideranEdit.nomor_huruf}/>
                  </td>
                  <td>
                    <TextField multiline onChange={HandleFormKonsideranEdit}  fullWidth name='isi' value={FormKonsideranEdit.isi}/>
                  </td>
                  <td align='center'>
                    <CButton color="info" variant="outline" className='mr-2' onClick={UpdateKolom} shape="square" size="sm">Simpan</CButton>
                    <CButton color="success" variant="outline" onClick={() => setFormKonsideranEdit({id : '', urutan : '', jenis : jenis, nomor_huruf : '', isi : ''})} shape="square" size="sm">Batal</CButton>
                  </td>
                </tr>
                :
                <tr key={index}>
                  <td>{list.urutan}</td>
                  <td>{list.nomor_huruf}</td>
                  <td>{list.isi}</td>
                  <td align='center'>
                    <CButton onClick={() => ClickKonsideranEdit(list)} color="warning" variant="outline" className='mr-2' shape="square" size="sm">Edit</CButton>
                    <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteKonsideran(list)}>Hapus</CButton>
                  </td>
                </tr>
            )}

            {
              TambahKolom ?
                <tr>
                  <td>
                    <TextField fullWidth name='urutan' onChange={HandleFormKonsideran} value={FormKonsideran.urutan}/>
                  </td>
                  <td>
                    <TextField fullWidth name='nomor_huruf' onChange={HandleFormKonsideran} value={FormKonsideran.nomor_huruf}/>
                  </td>
                  <td colSpan={2}>
                    <TextField multiline fullWidth name='isi' onChange={HandleFormKonsideran} value={FormKonsideran.isi}/>
                  </td>
                </tr> : null
            }
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={TogleTambahKolom}>{TambahKolom ? 'Batalkan' : 'Tambah Kolom'}</CButton>
          {
            TambahKolom ? <CButton color="success" disabled={Loading || FormKonsideran.isi === '' || FormKonsideran.nomor_huruf === '' || FormKonsideran.urutan === ''} onClick={SaveKolomBaru}>{Loading ? '...Loading' : 'Tambahkan'}</CButton> : null
          }
          <CButton color="secondary" onClick={TogleModal}>Tutup</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalKonsideran = React.memo(ModalKonsideranKomponent);
export default ModalKonsideran;
