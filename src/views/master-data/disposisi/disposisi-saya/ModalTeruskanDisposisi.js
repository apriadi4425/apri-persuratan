import React, {useState, useContext} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from "axios";
import firebase from "../../../../firebase";
import {GlobalStateContext} from "../../../../globalstate";

const ModalTeruskanDisposisiKomponent = ({Modal, ToggleModal, Form, HandleForm, setForm, GetData}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [UserSelect, setUserSelect] = useState([]);
  const [Lanjut, setLanjut] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [jabatanPenerima, setJabatanPenerima] = useState('');

  const {KirimNotif} = useContext(GlobalStateContext);

  const PilihTindakan = async (e) => {
    if(e.target.value === 1){
      await PanggilUser();
      await setForm({...Form, teruskan : 1 });
      setLanjut(true);
    }else{
      setLanjut(false);
      setForm({...Form, teruskan: e.target.value})
    }
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
      disposisi_id : Form.disposisi_id ,
      pesan : Form.pesan,
      id_penerima : Form.id_penerima,
      teruskan : Form.teruskan,
      jabatan_penerima: jabatanPenerima
    }
    await SetLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/disposisi-selanjutnya`,
      data: FormKirim,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
        KirimNotif(res.data.token, Form);
        firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}`).once('value').then(function(snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
          const PostData = {
            disposisi : JumDis - 1
          };
          const updates = {};
          updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
          return firebase.database().ref().update(updates);
        });
      if(Form.teruskan === 1) {
        firebase.database().ref(`/notifikasi/${User.instansi_id}/${Form.id_penerima}`).once('value').then(function (snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
          const PostData = {
            disposisi: JumDis + 1
          };
          const updates = {};
          updates[`/notifikasi/${User.instansi_id}/${Form.id_penerima}`] = PostData;
          return firebase.database().ref().update(updates);
        });

        firebase.database().ref(`/notifikasi/${User.instansi_id}/${res.data.id_admin}`).once('value').then(function (snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
          const JumTif = (snapshot.val() && snapshot.val().notif) || 0;
          if(JumTif === 0){
            const PostData = {
              disposisi: JumDis,
              notif : JumTif + 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${res.data.id_admin}`] = PostData;
            return firebase.database().ref().update(updates);
          }else{
            const PostData = {
              disposisi: JumDis,
              notif : JumTif - 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${res.data.id_admin}`] = PostData;
            return firebase.database().ref().update(updates);
          }

        });


      }else{
        firebase.database().ref(`/notifikasi/${User.instansi_id}/${res.data}`).once('value').then(function(snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
          const JumTif = (snapshot.val() && snapshot.val().notif) || 0;
          if(JumTif === 0){
            const PostData = {
              disposisi : JumDis - 1,
              notif : JumTif + 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${res.data}`] = PostData;
            return firebase.database().ref().update(updates);
          }else{
            const PostData = {
              disposisi : JumDis - 1,
              notif : JumTif - 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${res.data}`] = PostData;
            return firebase.database().ref().update(updates);
          }

        });
      }

    }).catch(function (error) {
      console.log(error);
    });
    await SetLoading(false);
    await GetData();
    ToggleModal();
  }

  return (
    <CModal size='lg' show={Modal} onClose={ToggleModal} closeOnBackdrop={false} color="primary">
      <CModalHeader closeButton>
        <CModalTitle>Catatan Disposisi</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <TextField label="Catatan Disposisi"
                   placeholder="Tuliskan Catatan disposisi disini"
                   name='pesan'
                   margin="normal"
                   fullWidth
                   InputLabelProps={{
                     shrink: true,
                   }}
                   value={Form.pesan}
                   onChange={HandleForm}
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Tindakan Selanjutnya
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={Form.teruskan}
            name='teruskan'
            placeholder="Tuliskan Catatan disposisi disini"
            displayEmpty
            onChange={PilihTindakan}
          >
            <MenuItem value=''>
              <em>Pilih Tindakan Selanjutnya</em>
            </MenuItem>
            <MenuItem value={1}>Teruskan Disposisi Surat</MenuItem>
            <MenuItem value={2}>Akhiri Disposisi (Disposisi Selesai)</MenuItem>
          </Select>
        </FormControl>
        {
          Lanjut ?
            <React.Fragment>
              <FormControl fullWidth margin='normal'>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Pilih Penerima
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={Form.id_penerima}
                  name='id_penerima'
                  placeholder="Tuliskan Catatan disposisi disini"
                  displayEmpty
                  onChange={(e) => {
                    setForm({...Form, id_penerima : e.target.value});
                    GetJabatan(e.target.value)
                  }}
                >
                  <MenuItem value=''>
                    <em>Pilih Tindakan Selanjutnya</em>
                  </MenuItem>
                  {
                    UserSelect.map((list,index)=>
                      list.id !== User.id ? <MenuItem key={index} value={list.id}>{list.name} -- {list.jabatan}</MenuItem> : null
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
            </React.Fragment> : null
        }
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" type='submit' disabled={Form.pesan === '' || Form.teruskan === '' || Loading} onClick={KirimDisposisi} >{Loading ? '...Loading' : 'Kirimkan'}</CButton>{' '}
        <CButton color="secondary" onClick={ToggleModal}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
}
const ModalTeruskanDisposisi = React.memo(ModalTeruskanDisposisiKomponent);
export default ModalTeruskanDisposisi;
