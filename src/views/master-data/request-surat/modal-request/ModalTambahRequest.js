import React, { useState } from 'react';
import {CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import * as moment from "moment";
import AutoCompleteHelper from '../../surat-masuk/tambah-surat/AutoCompleteHelper';
import * as KodeSuratHelper from '../../surat-masuk/tambah-surat/KodeSuratHelper';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';

const ModalTambahRequestKomponent = ({Modal, TogleModal, GetData, history}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Form, SetForm] = useState({
        tanggal_surat : moment().format('YYYY-MM-DD'),
        tujuan : '',
        kode_surat : '',
        perihal : ''
    })


    const [kategori_surat, set_kategori_surat] = useState(null)
    const [KategoriSurat, SetKategoriSurat] = useState([]);

    const {GetAllNamaPA, KodeSurat} = AutoCompleteHelper();

    const [Error, SetError] = useState({
        error_nomor_urut : false
      });
    

    const [Tujuan, SetTujuan] = useState([
        {tujuan : '...Loading'}
    ]);

    const GetAllNamaPA2 = (group) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-instansi-keluar?group=${group}`,{
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }}
        )
          .then(res => {
            if(group === 'asal'){
                SetTujuan(res.data)
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


      const TambahRequestSurat = async () => {
       
        const HandleForm = {
          tanggal_surat : moment(Form.tanggal_surat).format('YYYY-MM-DD'),
          tanggal_surat_indo : moment(Form.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY'),
          tujuan : Form.tujuan,
          kode_surat : Form.kode_surat,
          perihal : Form.perihal,
          kategori_surat : kategori_surat.nama_kategori
        };
    
        await axios({
          method : 'post',
          url : `${process.env.REACT_APP_BASE_URL}/api/request-surat`,
          data: HandleForm,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
            
              Swal.fire({
                title: res.data.nomor,
                text: "Ingin Masuk Detil Surat??",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya Masuk!',
                cancelButtonText: 'Tidak!'
              }).then((result) => {
                if (result.isConfirmed) {
                    history.push(`/master-data/surat-keluar/${res.data.slug}/request-surat`)
                }
              })
              
              GetData();
              TogleModal();
        }).catch(function (error) {
          console.log('tes')
        });
      }

    return(
        <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="success">
            <CModalHeader closeButton>
                <CModalTitle>Request Nomor Surat</CModalTitle>
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
                    </MuiPickersUtilsProvider>
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
                                        placeholder="Pilih Kategori Surat yang tersedia/Tambah"
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
            <CButton disabled={Form.kode_surat === '' || Form.tujuan === '' || Form.perihal === '' || !kategori_surat} onClick={TambahRequestSurat} type='submit' color={'success'}>Simpan</CButton>{' '}
            <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const ModalTambahRequest = React.memo(ModalTambahRequestKomponent);
export default withRouter(ModalTambahRequest);

