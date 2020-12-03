import React, {useCallback, useEffect, useState} from 'react';
import {CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import * as KodeSuratHelper from "../../tambah-surat/KodeSuratHelper";
import * as moment from "moment";
import AutoCompleteHelper from "../../tambah-surat/AutoCompleteHelper";
import * as NomorAgendaHelpers from "../../tambah-surat/NomorAgendaHelper";
import axios from "axios";


const ModalEditSuratMasukKomponent = ({Modal, TogleModal, Data, GetDataSurat}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Form, SetForm] = useState({
    tanggal_surat : moment(Data.tanggal_surat).format('YYYY-MM-DD'),
    tanggal_terima : moment(Data.tanggal_terima).format('YYYY-MM-DD'),
    asal_surat : Data.asal_surat,
    nomor_agenda : Data.nomor_agenda,
    kode_surat : Data.kode_surat,
    tingkat_keamanan : Data.tingkat_keamanan.id,
    nomor_surat : Data.nomor_surat,
    perihal : Data.perihal,
    keterangan : Data.keterangan
  });
  const [Error, SetError] = useState({
    error_tanggal : false,
    error_nomor_agenda : false
  });

  const [kategori_surat, set_kategori_surat] = useState({nama_kategori : Data.kategori.nama_kategori})
  const [KategoriSurat, SetKategoriSurat] = useState([]);
  const [SaranNomorAgenda, SetSaranNomorAgenda] = useState(null);
  const [NomorSurat, SetNomorSurat] = useState([{nomor_surat: '...Loading'}]);

  const ValidasiTgl = (TglMasuk, TglSurat, Parameter) => {
    if(moment(TglSurat).format('YYYY-MM-DD') > moment(TglMasuk).format('YYYY-MM-DD')){
      SetError({...Error, error_tanggal: true})
    }else{
      SetError({...Error, error_tanggal: false})
    }
  };

  const ValidasiNomor = (e) => {
    const filteredInput = e.target.value.replace(/([a-zA-Z ])/g, '');
    SetForm({...Form, nomor_agenda: filteredInput})
  };

  const ValidasiKarakter = (e, parameter) => {
    const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
    if(parameter === 'perihal'){
      SetForm({...Form, perihal: filteredInput})
    }
    else{
      SetForm({...Form, keterangan: filteredInput})
    }

  };

  const {NamaPA, GetAllNamaPA, KodeSurat, GetNomorSurat} = AutoCompleteHelper();
  const GetSaranNomorAgenda = useCallback(() => {
    NomorAgendaHelpers.SaranNomorAgenda(moment(Form.tanggal_terima).format('YYYY'), SetSaranNomorAgenda);
  }, [Form.tanggal_terima])

  const CekNomorAgenda = () => {
    NomorAgendaHelpers.CekNomorAgenda(Form, moment(Form.tanggal_terima).format('YYYY'), Error, SetError)
  }


  useEffect(() => {
    GetSaranNomorAgenda();
  },[GetSaranNomorAgenda]);

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

  const CobaEditSurat = async () => {


    const HandleForm = {
      tanggal_surat : moment(Form.tanggal_surat).format('YYYY-MM-DD'),
      tanggal_surat_indo : moment(Form.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY'),
      tanggal_terima : moment(Form.tanggal_terima).format('YYYY-MM-DD'),
      tanggal_terima_indo : moment(Form.tanggal_terima).locale('id').format('dddd, DD MMMM YYYY'),
      asal_surat : Form.asal_surat,
      nomor_agenda : Form.nomor_agenda,
      kode_surat : Form.kode_surat,
      tingkat_keamanan : Form.tingkat_keamanan,
      nomor_surat : Form.nomor_surat,
      perihal : Form.perihal,
      keterangan : Form.keterangan,
      kategori_surat : kategori_surat.nama_kategori,
      id_surat : Data.id,
      instansi_id : User.id
    };

    await axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/surat-masuk`,
      data: HandleForm,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      if(res.data.status === 'error_nomor_agenda'){
        SetError({...Error, error_nomor_agenda : true})
      }else{
        GetDataSurat();
        GetSaranNomorAgenda();
        TogleModal();
      }
    }).catch(function (error) {
      console.log('tes')
    });
  }

  return (
    <React.Fragment>
      <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
        <CModalHeader closeButton>
          <CModalTitle>Edit Data Surat Masuk</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CCol md={6}>
                <DatePicker name='tanggal_surat' id='tanggal_surat' label='Tanggal Surat' fullWidth autoOk
                            onChange={e => {
                              SetForm({...Form, tanggal_surat: e});
                              ValidasiTgl(Form.tanggal_terima, e, 'tanggal_surat')
                            }}
                            value={Form.tanggal_surat} format="dddd, DD MMMM YYYY"
                            error={Error.error_tanggal}
                            helperText={Error.error_tanggal ? 'Tanggal Surat tidak boleh lebih dari Tanggal Masuk' : null}
                />
              </CCol>
              <CCol md={6}>
                <DatePicker name='tanggal_terima' id='tanggal_terima' label='Tanggal Terima Surat' fullWidth autoOk
                            onChange={e => {
                              SetForm({...Form, tanggal_terima: e});
                              ValidasiTgl(e, Form.tanggal_surat, 'tanggal_masuk')
                            }}
                            value={Form.tanggal_terima} format="dddd, DD MMMM YYYY"
                            error={Error.error_tanggal}
                            helperText={Error.error_tanggal ? 'Tanggal Masuk tidak boleh kurang dari Tanggal Surat' : null}
                />
              </CCol>
            </MuiPickersUtilsProvider>
          </CRow>
          <CRow>
            <CCol md={6}>
              <Autocomplete
                id="asal_surat"
                name="asal_surat"
                freeSolo
                value={Form.asal_surat}
                onFocus={() => GetAllNamaPA('asal_surat')}
                onChange={(e, n) => SetForm({...Form, asal_surat : n})}
                onKeyUp={(e) =>  SetForm({...Form, asal_surat : e.target.value})}
                options={NamaPA.map((option) => option.asal_surat)}
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
              <TextField label={Error.error_nomor_agenda ? "Nomor Agenda Surat Masuk #Error#" : "Nomor Agenda Surat Masuk"}
                         onFocus={() => SetError({...Error, error_nomor_agenda: false})}
                         helperText={Error.error_nomor_agenda ? "Nomor Agenda Sudah Ada" : null}
                         placeholder={SaranNomorAgenda}
                         value={Form.nomor_agenda}
                         onChange={(e) => ValidasiNomor(e)}
                         onBlur={CekNomorAgenda}
                         margin="normal"
                         error={Error.error_nomor_agenda}
                         fullWidth
                         InputLabelProps={{
                           shrink: true,
                         }}
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
                             placeholder="Pilih Kategori Surat yang tersedia"
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
                id="nomor_surat"
                name="nomor_surat"
                freeSolo
                value={Form.nomor_surat}
                onFocus={() => GetNomorSurat(Form, SetNomorSurat)}
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
            <CCol md={6}>
              <FormControl fullWidth margin='normal'>
                <InputLabel id="demo-simple-select-label">Tingkat Keamanan Surat</InputLabel>
                <Select
                  value={Form.tingkat_keamanan}
                  onChange={(e) => SetForm({...Form, tingkat_keamanan: e.target.value})}
                >
                  <MenuItem value={1}>Sangat Rahasia</MenuItem>
                  <MenuItem value={2}>Rahasia</MenuItem>
                  <MenuItem value={3}>Biasa</MenuItem>
                </Select>
              </FormControl>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <TextField label="Perihal Surat Masuk"
                         placeholder="Perihal Surat Masuk"
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
            <CCol md={6}>
              <TextField label="Keterangan Surat Masuk"
                         value={Form.keterangan}
                         onChange={(e) => ValidasiKarakter(e, 'keterangan')}
                         placeholder="Keterangan Surat Masuk"
                         margin="normal"
                         fullWidth
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton type='submit' onClick={CobaEditSurat} color={'success'}>Edit Data</CButton>{' '}
          <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
}
const ModalEditSuratMasuk = React.memo(ModalEditSuratMasukKomponent);
export default ModalEditSuratMasuk;
