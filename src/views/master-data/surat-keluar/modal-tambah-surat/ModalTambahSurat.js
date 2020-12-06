import React, {useState, useEffect, useCallback} from 'react';
import {CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import MomentUtils from "@date-io/moment";
import * as moment from "moment";
import {TextField} from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutoCompleteHelper from '../../surat-masuk/tambah-surat/AutoCompleteHelper';
import * as KodeSuratHelper from '../../surat-masuk/tambah-surat/KodeSuratHelper';
import {withRouter} from 'react-router-dom';

const ModalTambahSuratKomponent = ({GetDataUser, history}) => {

  const User = JSON.parse(localStorage.getItem('user'));
  const [Modal, setModal] = useState(false);
  const [LoadingButton, SetLoadingButton] = useState(false);
  const [LoadingTambah, setLoadingTambah] = useState(false);
  const [Form, SetForm] = useState({
    tanggal_surat : moment().format('YYYY-MM-DD'),
    urutan : '',
    asal : '',
    tujuan : '',
    kode_surat : '',
    nomor_surat : '',
    keterangan : '',
    perihal : ''
  });
  const [NomorSurat, SetNomorSurat] = useState([{nomor_surat: '...Loading'}]);
  const [kategori_surat, set_kategori_surat] = useState(null)
  const [KategoriSurat, SetKategoriSurat] = useState([]);


  const {GetAllNamaPA, KodeSurat, GetNomorSurat2} = AutoCompleteHelper();

  const [Error, SetError] = useState({
    error_nomor_urut : false
  });

  const [NamaPA, SetNamaPA] = useState([
    {asal : '...Loading'}
    ]);
  const [Tujuan, SetTujuan] = useState([
    {tujuan : '...Loading'}
  ]);

  const PanggilDataUrutan = useCallback(async () => {
    SetLoadingButton(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-keluar-get-urutan?tanggal_surat=${moment(Form.tanggal_surat).format('YYYY-MM-DD')}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      console.log(response)
      SetForm({...Form, urutan : response.data})
    }).catch(error => {
      SetError({...Error, error_nomor_urut: 'Terjadi Kesalahan'});
    });
    SetLoadingButton(false);
  },[Form.tanggal_surat])

  const TogleModal = async () => {
      if(Modal === false){
        await PanggilDataUrutan();
        setModal(!Modal);
      }else{
        setModal(!Modal);
      }
  };


  const GetAllNamaPA2 = (group) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-instansi-keluar?group=${group}`,{
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }}
    )
      .then(res => {
        if(group === 'asal'){
          SetNamaPA(res.data)
        }else{
          SetTujuan(res.data)
        }
      });
  }

  const ValidasiKarakter = (e, parameter) => {
    const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
    if(parameter === 'perihal'){
      SetForm({...Form, perihal: filteredInput})
    }
    else{
      SetForm({...Form, keterangan: filteredInput})
    }

  };

  const TambahSuratKeluar = async () => {
    setLoadingTambah(true);
    const User = JSON.parse(localStorage.getItem('user'));
    const HandleForm = {
      tanggal_surat : moment(Form.tanggal_surat).format('YYYY-MM-DD'),
      tanggal_surat_indo : moment(Form.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY'),
      asal : Form.asal,
      tujuan : Form.tujuan,
      urutan : Form.urutan,
      kode_surat : Form.kode_surat,
      nomor_surat : Form.nomor_surat,
      perihal : Form.perihal,
      keterangan : Form.keterangan,
      kategori_surat : kategori_surat.nama_kategori
    };

    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/surat-keluar`,
      data: HandleForm,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      if(res.data.status === 'error_nomor_agenda'){
        SetError({...Error, error_nomor_agenda : true})
      }else{
        history.push(`/master-data/surat-keluar/${res.data.slug}/surat-keluar`)
        PanggilDataUrutan();
        GetDataUser()
        TogleModal();
      }
    }).catch(function (error) {
      console.log('tes')
    });

    setLoadingTambah(false);
  }


  useEffect(() => {
    PanggilDataUrutan()
  },[PanggilDataUrutan])


  const HandleKodeSurat = (event, newValue) => {

    if (typeof newValue === 'string') {
      set_kategori_surat({
        kategori_surat: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      set_kategori_surat({
        nama_kategori: newValue.inputValue,
      });
    } else {
      set_kategori_surat(newValue);
    }
  };

  return (
    <React.Fragment>
      <CButton onClick={TogleModal} size="sm" className="btn-brand mr-2 mb-1">{
        LoadingButton ? 'Loading...' : <FontAwesomeIcon icon={faPlusSquare} size='lg'/>
      }</CButton>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Tambah Data Surat Keluar</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CCol md={6}>
                  <DatePicker name='tanggal_surat' id='tanggal_surat' label='Tanggal Surat' fullWidth autoOk
                              onChange={e => {
                                SetForm({...Form, tanggal_surat: e});
                              }}
                              value={Form.tanggal_surat} format="dddd, DD MMMM YYYY"
                              margin="normal"
                  />
              </CCol>
              <CCol md={6}>
                <TextField label={Error.nomor_urut ? "Nomor Urut Surat Keluar #Error#" : "Nomor Urut Surat Keluar"}
                           onFocus={() => SetError({...Error, error_urutan: false})}
                           helperText={Error.error_urutan ? "Nomor Urut Sudah Ada" : null}
                           value={LoadingButton ? 'Loading...' : Form.urutan}
                           onChange={(e) => {SetForm({...Form, urutan : e.target.value})}}
                           margin="normal"
                           error={Error.error_urutan}
                           fullWidth
                           InputLabelProps={{
                             shrink: true,
                           }}
                />
              </CCol>
            </MuiPickersUtilsProvider>
          </CRow>
          <CRow>
            <CCol md={6}>
              <Autocomplete
                id="asal"
                name="asal"
                freeSolo
                value={Form.asal}
                onFocus={() => GetAllNamaPA2('asal')}
                onChange={(e, n) => SetForm({...Form, asal : n})}
                onKeyUp={(e) =>  SetForm({...Form, asal : e.target.value})}
                options={NamaPA.map((option) => option.asal)}
                renderInput={(params) => (
                  <TextField {...params}
                             label="Asal Surat"
                             placeholder="Isi/Pilih Asal Surat yang tersedia"
                             margin="normal"
                             InputLabelProps={{
                               shrink: true,
                             }}
                  />
                )}
              />
            </CCol>
            <CCol md={6}>
              <Autocomplete
                id="tujuan"
                name="tujuan"
                freeSolo
                value={Form.tujuan}
                onFocus={() => GetAllNamaPA2('tujuan')}
                onChange={(e, n) => SetForm({...Form, tujuan : n})}
                onKeyUp={(e) =>  SetForm({...Form, tujuan : e.target.value})}
                options={Tujuan.map((option) => option.tujuan)}
                renderInput={(params) => (
                  <TextField {...params}
                             label="Tujuan Surat"
                             placeholder="Isi/Pilih Tujuan Surat yang tersedia"
                             margin="normal"
                             InputLabelProps={{
                               shrink: true,
                             }}
                  />
                )}
              />
            </CCol>
          </CRow>
          <CRow>
          <CCol md={6}>
              <Autocomplete
                id="kode_surat"
                name="kode_surat"
                freeSolo
                value={Form.kode_surat}
                onFocus={() => GetAllNamaPA('kode_surat')}
                onChange={(e, n) => SetForm({...Form, kode_surat : n})}
                onKeyUp={(e) =>  SetForm({...Form, kode_surat : e.target.value})}
                options={KodeSurat.map((option) => option.kode_surat)}
                renderInput={(params) => (
                  <TextField {...params}
                             label="Kode Surat"
                             placeholder="Pilih Asal Kode Surat yang tersedia"
                             margin="normal"
                             InputLabelProps={{
                               shrink: true,
                             }}
                  />
                )}
              />
            </CCol>
            <CCol md={6}>
              <Autocomplete
                id="nomor_surat"
                name="nomor_surat"
                freeSolo
                value={Form.nomor_surat}
                onFocus={() => GetNomorSurat2(Form, SetNomorSurat)}
                onChange={(e, n) => SetForm({...Form, nomor_surat : n})}
                onKeyUp={(e) =>  SetForm({...Form, nomor_surat : e.target.value})}
                options={NomorSurat.map((option) => option.nomor_surat)}
                getOptionDisabled={(option) => option === 'Tidak Tersedia Pilihan'}
                onBlur={() => {SetNomorSurat([{nomor_surat : '...Loading'}])}}
                renderInput={(params) => (
                  <TextField {...params}
                             label="Nomor Surat Surat"
                             placeholder="Isi/Pilih Asal Surat yang tersedia"
                             margin="normal"
                             InputLabelProps={{
                               shrink: true,
                             }}
                  />
                )}
              />
            </CCol>
          </CRow>
          <CRow>
          <CCol>
              <Autocomplete
                onFocus={() => KodeSuratHelper.GetKategoriSurat(SetKategoriSurat)}
                value={kategori_surat}
                onChange={(event, newValue) =>
                  HandleKodeSurat(event, newValue)
                }
                filterOptions={(options, params) =>
                  KodeSuratHelper.filterOptions(options, params)
                }
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={KategoriSurat}
                getOptionLabel={(option) =>
                  KodeSuratHelper.getOptionLabel(option, SetKategoriSurat)
                }
                renderOption={(option) => option.nama_kategori}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params}
                             label="Kategori Surat"
                             placeholder="Pilih Kategori Surat yang tersedia/Tambah"
                             margin="normal"
                             InputLabelProps={{
                               shrink: true,
                             }}
                  />
                )}
              />
            </CCol>
            <CCol md={6}>
              <TextField label="Keterangan Surat Keluar"
                         value={Form.keterangan}
                         onChange={(e) => ValidasiKarakter(e, 'keterangan')}
                         placeholder="Keterangan Surat Keluar"
                         margin="normal"
                         fullWidth
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12}>
              <TextField label="Perihal Surat Keluar"
                         placeholder="Perihal Surat Keluar"
                         margin="normal"
                         fullWidth
                         InputLabelProps={{
                           shrink: true,
                         }}
                         multiline
                         rowsMax={10}
                         value={Form.perihal}
                         onChange={(e) => ValidasiKarakter(e, 'perihal')}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton type='submit' disabled={LoadingTambah || 
                                          kategori_surat === '' || 
                                          kategori_surat === null ||
                                          Form.asal === '' ||
                                          Form.nomor_surat === '' ||
                                          Form.perihal === '' ||
                                          Form.tujuan === '' ||
                                          Form.kode_surat === ''
                                          } onClick={TambahSuratKeluar} color={'success'}>
            {
              LoadingTambah ? 'Loading...' : 'Tambah Data'
            }
            </CButton>{' '}
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalTambahSurat = React.memo(ModalTambahSuratKomponent);
export default withRouter(ModalTambahSurat);
