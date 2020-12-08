import React, {useState} from 'react';
import {CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow} from "@coreui/react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {TextField} from "@material-ui/core";
import * as moment from "moment";
import InputRange from 'react-input-range';
import Autocomplete from "@material-ui/lab/Autocomplete";
import 'react-input-range/lib/css/index.css';
import * as KodeSuratHelper from '../../surat-masuk/tambah-surat/KodeSuratHelper';
import axios from "axios";

const ModalBokingNomorSuratKomponent = ({Modal, TogleModal, GetData, history}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Form, SetForm] = useState({
        tanggal_surat : moment().format('YYYY-MM-DD'),
        asal : '',
    })

    const [Range, setRange] = useState({
        min : 1,
        max : 50
    })


    const [kategori_surat, set_kategori_surat] = useState(null)
    const [KategoriSurat, SetKategoriSurat] = useState([]);

    const TambahRequestSurat = async () => {
       
        const HandleForm = {
          tanggal_surat : moment(Form.tanggal_surat).format('YYYY-MM-DD'),
          tanggal_surat_indo : moment(Form.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY'),
          asal : Form.asal,
          awal : Range.min,
          akhir : Range.max,
          kategori_surat : kategori_surat.nama_kategori
        };
    
        await axios({
          method : 'post',
          url : `${process.env.REACT_APP_BASE_URL}/api/request-boking`,
          data: HandleForm,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
              GetData();
              TogleModal();
        }).catch(function (error) {
          console.log('tes')
        });
      }

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
    return(
        <CModal size='lg' show={Modal} onClose={TogleModal} closeOnBackdrop={false} color="primary">
        <CModalHeader closeButton>
            <CModalTitle>Request Nomor Surat</CModalTitle>
        </CModalHeader>
            <CModalBody>
            <CRow>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <CCol md={12}>
                        <DatePicker name='tanggal_surat' id='tanggal_surat' label='Tanggal Surat' fullWidth autoOk
                                    onChange={(e) => {
                                        SetForm({...Form, tanggal_surat : e})
                                    }}
                                    value={Form.tanggal_surat} format="dddd, DD MMMM YYYY"
                                    margin="normal"
                                    error={Error.error_tanggal}
                                    helperText={Error.error_tanggal ? 'Tanggal Request tidak boleh lebih dari Hari ini' : null}
                        />
                    </CCol>
                    </MuiPickersUtilsProvider>
            </CRow>
                <CRow>
                    <CCol md={6}>
                    <TextField label="Asal Surat"
                                placeholder="Asal Surat"
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                shrink: true,
                                }}
                                value={Form.asal}
                                onChange={(e) => SetForm({...Form, asal : e.target.value})}
                    />
                    </CCol>
                    <CCol md={6}>
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
                                        helperText={'Silahkan pilih kategori lainnya untuk ketidak pastian'}
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
                    <div style={{marginTop : 20, marginBottom : 30}}>
                    <p style={{marginBottom : 30}}>Banyaknya</p>
                    <div style={{marginLeft : 5, marginRight : 5}}>
                    <InputRange
                        draggableTrack
                            maxValue={200}
                            minValue={0}
                            value={Range}
                            onChange={value => setRange(value)} 
                            onChangeComplete={value => console.log(value)}
                                />
                    </div>
                    </div>
                    </CCol>
                </CRow>
            </CModalBody>
        <CModalFooter>
        <CButton disabled={Form.asal === '' || !kategori_surat} onClick={TambahRequestSurat} type='submit' color={'primary'}>Simpan</CButton>{' '}
        <CButton color="secondary" onClick={TogleModal}>Cancel</CButton>
        </CModalFooter>
    </CModal>
    )
}

const ModalBokingNomorSurat = React.memo(ModalBokingNomorSuratKomponent);
export default ModalBokingNomorSurat;