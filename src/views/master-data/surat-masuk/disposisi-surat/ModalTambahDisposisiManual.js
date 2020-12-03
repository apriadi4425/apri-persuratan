import React, {useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from "axios";
import firebase from "../../../../firebase";

const ModalTambahDisposisiManualKomponent = ({item, GetDataUser, Parameter}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Modal, SetModal] = useState(false);
  const [UserSelect, setUserSelect] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [Error, SetError] = useState(false);
  const [PenerimaSebelum, setPenerimaSebelum] = useState('');
  const [jabatanPenerima, setJabatanPenerima] = useState('');

  const [Form, SetForm] = useState({
    id_penerima_saat_ini : '', t_surat_masuk_id : item.id, disposisi_id : item.disposisi.id, id_sebelumnya : ''
  });

  const GetLastPenerimaDisposisi = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/disposisi-terakhir?disposisi_id=${item.disposisi.id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      SetForm({...Form, id_sebelumnya: response.data.id})
      setPenerimaSebelum(response.data.id_penerima);
    }).catch(error => {
      console.log(error);
    });
  }

  const TogleModal = async () => {
    await GetLastPenerimaDisposisi();
    await  PanggilUser();
    SetModal(!Modal)
  }

  const TutupModal = async () => {
    SetModal(!Modal)
  }

  const PanggilUser = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user-2`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setUserSelect(response.data)
    }).catch(error => {
      console.log(error);
    });
  };

  const GetJabatan =  (id) => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/user-jabatan/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setJabatanPenerima(response.data)
    }).catch(error => {
      console.log(error);
    });

  }


  const KirimDisposisi = async () => {
    const FormKirim = {
      id_penerima_saat_ini : Form.id_penerima_saat_ini,
      t_surat_masuk_id : Form.t_surat_masuk_id,
      disposisi_id : Form.disposisi_id,
      id_sebelumnya : Form.id_sebelumnya,
      jabatan_penerima: jabatanPenerima
    }
    await SetLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/disposisi-admin-manual`,
      data: FormKirim,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataUser(Parameter);
      TutupModal();

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${PenerimaSebelum}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const PostData = {
          disposisi : JumDis - 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${PenerimaSebelum}`] = PostData;
        return firebase.database().ref().update(updates);
      });

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${Form.id_penerima_saat_ini}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const PostData = {
          disposisi : JumDis + 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${Form.id_penerima_saat_ini}`] = PostData;
        return firebase.database().ref().update(updates);
      });

    }).catch(function (error) {
      if(error.request){
        if(error.response.status === 500){
          SetError(true);
        }
      }
    });
    SetLoading(false);
  }

  return (
    <React.Fragment>

      <CButton color='info' className='float-right' variant='outline' shape='square' size="sm" onClick={TogleModal}>Tambah Manual Disposisi</CButton>
      <CModal size='lg' show={Modal} onClose={TutupModal} closeOnBackdrop={false} color="primary">
        <CModalHeader closeButton>
          <CModalTitle>Kirim Disposisi Surat</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormControl fullWidth margin='normal' error={Error}>
            <InputLabel shrink id="user-penerima-disposisi">
              User Penerima Disposisi
            </InputLabel>
            <Select
              labelId="user-penerima-disposisi"
              id="user-penerima-disposisi-id"
              displayEmpty
              value={Form.id_penerima_saat_ini}
              onChange={(e) => {
                SetForm({...Form, id_penerima_saat_ini: e.target.value});
                GetJabatan(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>Silahkan Pilih User Penerima</em>
              </MenuItem>
              {
                UserSelect.map((list,index)=>
                  <MenuItem key={index} value={list.id}>{list.name} -- {list.jabatan}</MenuItem>
                )
              }
            </Select>
            <FormHelperText>{Error ? 'Penerima telah mendapatkan disposisi sebelumnya' : 'Penerima akan mendapatkan notifikasi melalui android jika telah mengisntall APK Apri'}</FormHelperText>
          </FormControl>
          <FormControl fullWidth >
            <TextField label="Jabatan Penerima"
                       value={jabatanPenerima}
                       onChange={(e) => setJabatanPenerima(e.target.value)}
                       placeholder="Jabatan Penerima"
                       margin="normal"
                       fullWidth
                       InputLabelProps={{
                         shrink: true,
                       }}
            />
          </FormControl>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={Loading} onClick={KirimDisposisi} type='submit'>
            {
              Loading ? '...Loading' : 'Daftarkan'
            }
          </CButton>{' '}
          <CButton color="secondary" onClick={TutupModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalTambahDisposisiManual = React.memo(ModalTambahDisposisiManualKomponent);
export default ModalTambahDisposisiManual;
