import React, {useState, useContext} from 'react';
import {
  CButton, CModal,
  CModalBody, CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {FormControl, InputLabel, MenuItem, FormHelperText, Select, TextField} from '@material-ui/core';
import axios from "axios";
import firebase from "../../../../firebase";
import {GlobalStateContext} from "../../../../globalstate";

const ModalTambahDisposisiKomponent = ({item, GetDataUser, Parameter}) => {

  const User = JSON.parse(localStorage.getItem('user'));
  const [Modal, SetModal] = useState(false);
  const [Form, SetForm] = useState({
    id_penerima_saat_ini : '', t_surat_masuk_id : '', urgensi: ''
  });
  const [jabatanPenerima, setJabatanPenerima] = useState('');
  const [UserSelect, setUserSelect] = useState([]);
  const [Loading, SetLoading] = useState(false);

  const {KirimNotif} = useContext(GlobalStateContext);

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
  }


  const KirimDisposisi = async () => {
    const BaruForm = {
      id_penerima_saat_ini : Form.id_penerima_saat_ini,
      t_surat_masuk_id : Form.t_surat_masuk_id,
      urgensi: Form.urgensi,
      jabatan_penerima : jabatanPenerima
    };
    await SetLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/disposisi-admin`,
      data: BaruForm,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataUser(Parameter);
      TutupModal();
      KirimNotif(res.data.token, Form);

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${Form.id_penerima_saat_ini}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const PostData = {
          disposisi : JumDis + 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${Form.id_penerima_saat_ini}`] = PostData;
        return firebase.database().ref().update(updates);
      });

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const JumTif = (snapshot.val() && snapshot.val().notif) || 0;
        const PostData = {
          disposisi : JumDis + 1,
          notif : JumTif
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
        return firebase.database().ref().update(updates);
      });


    }).catch(function (error) {
      console.log(error);
    });
    await SetLoading(false);
  }

  const TogleModal = async () => {
    await  PanggilUser();
    await SetForm({...Form, t_surat_masuk_id: item.id});
    SetModal(!Modal)
  };

  const TutupModal = async () => {
    SetModal(!Modal)
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

  return (
    <React.Fragment>
      <CButton color="info" className='mb-2' variant="outline" shape="square" size="sm" onClick={TogleModal}>Mulai Disposisi</CButton>
      <CModal size='lg' show={Modal} onClose={TutupModal} color="primary">
        <CModalHeader closeButton>
          <CModalTitle>Memulai Disposisi Surat</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormControl fullWidth margin='normal'>
            <InputLabel shrink id="user-penerima-disposisi">
              User Penerima Disposisi
            </InputLabel>
            <Select
              labelId="user-penerima-disposisi"
              id="user-penerima-disposisi-id"
              displayEmpty
              value={Form.id_penerima_saat_ini}
              onChange={(e) => {
                SetForm({...Form, id_penerima_saat_ini : e.target.value});
                GetJabatan(e.target.value);
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
            <FormHelperText>Penerima akan mendapatkan notifikasi melalui android jika telah mengisntall APK Apri</FormHelperText>
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

          <FormControl fullWidth margin='normal'>
            <InputLabel shrink id="user-penerima-disposisi">
              Tingkat Urgensi Disposisi
            </InputLabel>
            <Select
              labelId="user-penerima-disposisi"
              id="user-penerima-disposisi-id"
              displayEmpty
              value={Form.urgensi}
              onChange={(e) => SetForm({...Form, urgensi : e.target.value})}
            >
              <MenuItem value="">
                <em>Tingkat Kepentingan Disposisi</em>
              </MenuItem>
              <MenuItem value="Biasa">Biasa</MenuItem>
              <MenuItem value="Penting">Penting</MenuItem>
              <MenuItem value="Sangat Penting">Sangat Penting</MenuItem>
            </Select>
          </FormControl>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={Loading} type='submit' onClick={KirimDisposisi}>
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
const ModalTambahDisposisi = React.memo(ModalTambahDisposisiKomponent);
export default ModalTambahDisposisi;
