import React, {useState} from 'react';
import {CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import * as moment from 'moment';
import AutoCompleteHelper from '../../../surat-masuk/tambah-surat/AutoCompleteHelper';
import * as KodeSuratHelper from '../../../surat-masuk/tambah-surat/KodeSuratHelper';

const ModalEditSuratKeluarKomponen = ({Modal, TogleModal, Data, GetDataSurat}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [LoadingEdit, setLoadingEdit] = useState(false);
    const [Form, SetForm] = useState({
        tanggal_surat : moment().format('YYYY-MM-DD'),
        urutan : Data.urutan,
        asal : Data.asal,
        tujuan : Data.tujuan,
        kode_surat : Data.kode_surat,
        nomor_surat : Data.nomor_surat,
        keterangan : Data.keterangan,
        perihal : Data.perihal
      });

      const [Error, SetError] = useState({
        urutan : [],
        nomor_surat : []
      });
      const [NamaPA, SetNamaPA] = useState([
        {asal : '...Loading'}
        ]);
      const [Tujuan, SetTujuan] = useState([
        {tujuan : '...Loading'}
      ]);

      const [LoadingButton, SetLoadingButton] = useState(false);
      const {GetAllNamaPA, GetNomorSurat2, KodeSurat} = AutoCompleteHelper();
      const [NomorSurat, SetNomorSurat] = useState([{nomor_surat: '...Loading'}]);
      const [kategori_surat, set_kategori_surat] = useState({nama_kategori : Data.kategori.nama_kategori})
      const [KategoriSurat, SetKategoriSurat] = useState([]);


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
        setLoadingEdit(true);
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
          kategori_surat : kategori_surat.nama_kategori,
          id_surat : Data.id,
          instansi_id : User.instansi_id
        };
    
        await axios({
          method : 'put',
          url : `${process.env.REACT_APP_BASE_URL}/api/surat-keluar`,
          data: HandleForm,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
          if(res.data.status === 'error_urutan'){
            SetError({...Error, urutan : true})
          }else{
            GetDataSurat();
            TogleModal();
          }
        }).catch(function (error) {
            SetError(error.response.data.error)
        });
        setLoadingEdit(false);
      }

    return(
        <React.Fragment>
        <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
            <CModalHeader closeButton>
            <CModalTitle>Edit Data Surat Keluar</CModalTitle>
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
                <TextField label={Error.urutan ? Error.urutan.length > 0 ? "Nomor Urut Surat Keluar #Error#" : "Nomor Urut Surat Keluar" : "Nomor Urut Surat Keluar"}
                           onFocus={() => SetError({...Error, urutan: []})}
                           helperText={Error.urutan ? Error.urutan.length > 0 ? Error.urutan : null : null}
                           value={LoadingButton ? 'Loading...' : Form.urutan}
                           onChange={(e) => {SetForm({...Form, urutan : e.target.value})}}
                           margin="normal"
                           error={Error.urutan ? Error.urutan.length > 0 : false}
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
                             label={Error.nomor_surat ? Error.nomor_surat.length > 0 ? 'Nomor Surat #Error#' : 'Nomor Surat' : 'Nomor Surat'}
                             placeholder="Isi/Pilih Asal Surat yang tersedia"
                             margin="normal"
                             helperText={Error.nomor_surat ? Error.nomor_surat.length > 0 ? Error.nomor_surat : null : null}
                             error={Error.nomor_surat ? Error.nomor_surat.length > 0 : false}
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
            <CButton disabled={LoadingEdit} type='submit' onClick={CobaEditSurat} color={'success'}>{!LoadingEdit ? 'Edit Data' : 'Loading...'}</CButton>{' '}
            <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
            </CModalFooter>
        </CModal>
        </React.Fragment>
    )
}

const ModalEditSuratKeluar = React.memo(ModalEditSuratKeluarKomponen);
export default ModalEditSuratKeluar;