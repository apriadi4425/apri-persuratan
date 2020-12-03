import React, {useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {TextField} from "@material-ui/core";
import axios from "axios";

const ModalMemutuskanKomponent = ({ModalMemutuskan, TogleModalMemutuskan, GetDatanyaMemutuskan, id, GetDataMemutuskan}) => {
  const User = JSON.parse(localStorage.getItem('user'));

  const [TambahKolom, setTambahKolom] = useState(false);
  const [TambahKolomList, setTambahKolomList] = useState(false);
  const [FormKonsideran, setFormKosideran] = useState({sk_list_id : id, urutan : '', nama : '', isi : ''});
  const [FormKonsideranEdit, setFormKonsideranEdit] = useState({id : '', urutan : '', nama : '', isi : ''});
  const [FormAnakan, setFormAnakan] = useState({konsideran_memutuskan_id : '', urutan : '', nomor_huruf : '', isi : ''});
  const [FormAnakanEdit, setFormAnakanEdit] = useState({id : '', urutan : '', nomor_huruf : '', isi : ''});

  const [Loading, setLoading] = useState(false);

  const ClickKonsideranEdit = (list) => {
    setFormKonsideranEdit({id : list.id, urutan : list.urutan, nama : list.nama, isi : list.isi})
  }

  const TogleTambahKolom = () => {
    setTambahKolom(!TambahKolom);
    setFormKosideran({...FormKonsideran, sk_list_id : id, urutan : '', nama : '', isi : ''})
  };

  const TogleTambahKolomList = (id) => {
    setTambahKolomList(true);
    setFormAnakan({...FormAnakan, konsideran_memutuskan_id : id, urutan : '', nomor_huruf : '', isi : ''})
  };

  const BatalListAdd = () => {
    setTambahKolomList(!TambahKolomList);
    setFormAnakan({...FormAnakan, konsideran_memutuskan_id : '', urutan : '', nomor_huruf : '', isi : ''})

  }
  const HandleFormKonsideran = (e) => {
    setFormKosideran({...FormKonsideran, [e.target.name] : e.target.value})
  }

  const HandleFormKonsideranEdit = (e) => {
    setFormKonsideranEdit({...FormKonsideranEdit, [e.target.name] : e.target.value});
  }
  const HandleFormAnakan = (e) => {
    setFormAnakan({...FormAnakan, [e.target.name] : e.target.value})
  };

  const HandleFormAnakanEdit = (e) => {
    setFormAnakanEdit({...FormAnakanEdit, [e.target.name] : e.target.value})
  };

  const ClickEditList = (list) => {
    setFormAnakanEdit({id : list.id, urutan: list.urutan, nomor_huruf : list.nomor_huruf, isi : list.isi})
  };

  const SaveKolomBaru = async () => {
    setLoading(true)
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/add-memutuskan`,
      data: FormKonsideran,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataMemutuskan();
      TogleTambahKolom();
    }).catch(function (error) {
      console.log(error)
    });
    setLoading(false)
  };

  const SaveAnakan = async () => {
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/add-anakan`,
      data: FormAnakan,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataMemutuskan();
      BatalListAdd();
    }).catch(function (error) {
      console.log(error)
    });
  };

  const EditList = async () => {
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-anakan`,
      data: FormAnakanEdit,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataMemutuskan();
      setFormAnakanEdit({id : '', urutan : '', nomor_huruf : '', isi : ''});
    }).catch(function (error) {
      console.log(error)
    });
  };

  const UpdateKolom = async () => {
    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/edit-memutuskan`,
      data: FormKonsideranEdit,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataMemutuskan();
    }).catch(function (error) {
      console.log('error')
    });
    setFormKonsideranEdit({id : '', urutan : '', nama : '', isi : ''});
  }

  const DeleteKonsideran = async (list) => {
    const DataDelete = {id : list.id};
    await axios({
      method : 'delete',
      url : `${process.env.REACT_APP_BASE_URL}/api/delete-memutuskan`,
      data: DataDelete,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(response => {
      GetDataMemutuskan();
      setFormKonsideranEdit({id : '', urutan : '', nama : '', isi : ''});
    }).catch(error => {
      console.log(error);
    });
  }

  const DeleteAnakan = async (list) => {
    const DataDelete = {id : list.id};
    await axios({
      method : 'delete',
      url : `${process.env.REACT_APP_BASE_URL}/api/delete-anakan`,
      data: DataDelete,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(response => {
      GetDataMemutuskan();
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <React.Fragment>
      <CModal size='xl' show={ModalMemutuskan} onClose={TogleModalMemutuskan} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Konsideran Memutuskan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className='table table-bordered'>
            <thead>
            <tr>
              <th width='5%'>Urutan</th>
              <th width='5%'>Nama</th>
              <th width='68%'>Isi</th>
              <th width='22%'>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {
              GetDatanyaMemutuskan.map((list, index)=>
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
                      <CButton color="info" variant="outline" className='mr-2' onClick={UpdateKolom}  shape="square" size="sm">Simpan</CButton>
                      <CButton color="success" variant="outline" onClick={() => setFormKonsideranEdit({id : '', urutan : '', nama : '', isi : ''})}  className='ml-2'  shape="square" size="sm">Batal</CButton>
                    </td>
                  </tr>
                  :
                <tr key={index}>
                  <td>{list.urutan}</td>
                  <td>{list.nama}</td>
                  <td>
                    {list.isi}
                    {
                      list.anakan.length > 0 || FormAnakan.konsideran_memutuskan_id === list.id ?
                        <table className='table table-bordered'>
                          <thead><tr><th width='5%'>Urutan</th><th width='5%'>Huruf</th><th width='65%'>Isi</th><th width='25%'>Aksi</th></tr></thead>
                          <tbody>
                          {list.anakan.map((list2, index2) =>
                              FormAnakanEdit.id === list2.id ?
                                <tr key={index2}>
                                  <td><TextField fullWidth name='urutan' value={FormAnakanEdit.urutan} onChange={HandleFormAnakanEdit} /></td>
                                  <td><TextField fullWidth name='nomor_huruf' value={FormAnakanEdit.nomor_huruf} onChange={HandleFormAnakanEdit} /></td>
                                  <td><TextField fullWidth name='isi' value={FormAnakanEdit.isi} onChange={HandleFormAnakanEdit} /></td>
                                  <td>
                                    <CButton  color="info" variant="outline" onClick={EditList} className='mr-2' shape="square" size="sm">Save</CButton>
                                  </td>
                                </tr>:
                                <tr key={index2}>
                                  <td>{list2.urutan}</td>
                                  <td>{list2.nomor_huruf}</td>
                                  <td>{list2.isi}</td>
                                  <td>
                                    <CButton  color="success" variant="outline" onClick={() => ClickEditList(list2)} className='mr-2' shape="square" size="sm">Edit</CButton>
                                    <CButton  color="danger" variant="outline" onClick={() => DeleteAnakan(list2)} className='mr-2' shape="square" size="sm">Hapus</CButton>
                                  </td>
                                </tr>

                          )}
                          {
                            TambahKolomList ?
                              FormAnakan.konsideran_memutuskan_id === list.id ?
                                <tr>
                                  <td><TextField fullWidth name='urutan' value={FormAnakan.urutan} onChange={HandleFormAnakan} /></td>
                                  <td><TextField fullWidth name='nomor_huruf' value={FormAnakan.nomor_huruf} onChange={HandleFormAnakan}/></td>
                                  <td><TextField fullWidth name='isi' value={FormAnakan.isi} onChange={HandleFormAnakan}/></td>
                                  <td>
                                    <CButton  color="info" variant="outline" onClick={SaveAnakan} className='mr-2' shape="square" size="sm">Tambah</CButton>
                                  </td>
                                </tr> : null : null
                          }
                          </tbody>
                        </table>
                        : null
                    }
                  </td>
                  <td>
                    <CButton onClick={() => ClickKonsideranEdit(list)} color="warning" variant="outline" className='mr-2' shape="square" size="sm">Edit</CButton>
                    <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteKonsideran(list)}>Hapus</CButton>
                    {
                      TambahKolomList ?
                        FormAnakan.konsideran_memutuskan_id === list.id ?
                          <CButton color="primary" variant="outline" shape="square" onClick={BatalListAdd} size="sm">Batal</CButton>
                          :
                          <CButton color="primary" variant="outline" className='ml-2'  shape="square" onClick={() => TogleTambahKolomList(list.id)} size="sm">Add List</CButton> : <CButton color="primary" variant="outline" shape="square" className='ml-2' onClick={() => TogleTambahKolomList(list.id)} size="sm">Add List</CButton>
                    }
                  </td>
                </tr>
              )
            }
            {
              TambahKolom ?
                <tr>
                  <td>
                    <TextField fullWidth name='urutan' onChange={HandleFormKonsideran} value={FormKonsideran.urutan} />
                  </td>
                  <td>
                    <TextField fullWidth name='nama'  onChange={HandleFormKonsideran} value={FormKonsideran.nama} />
                  </td>
                  <td colSpan={2}>
                    <TextField multiline fullWidth name='isi'  onChange={HandleFormKonsideran} value={FormKonsideran.isi}/>
                  </td>
                </tr> : null
            }
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
            <CButton color="primary" onClick={TogleTambahKolom}>{TambahKolom ? 'Batalkan' : 'Tambah Kolom'}</CButton>
            {
              TambahKolom ? <CButton color="success" disabled={Loading || FormKonsideran.isi === '' || FormKonsideran.nama === '' || FormKonsideran.urutan === ''} onClick={SaveKolomBaru}>{Loading ? '...Loading' : 'Tambahkan'}</CButton> : null
            }
            <CButton color="secondary" onClick={TogleModalMemutuskan}>Tutup</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalMemutuskan = React.memo(ModalMemutuskanKomponent);
export default ModalMemutuskan;
