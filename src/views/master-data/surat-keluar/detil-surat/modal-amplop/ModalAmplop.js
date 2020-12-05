import React, { useState } from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CCol} from "@coreui/react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from 'axios';

const ModalAmplopKomponent = ({ModalAmplopx, TogleModalAmplopx, Data}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Form, SetForm] = useState({
        tujuan : Data.tujuan,
        kota_tujuan : '',
        alamat : '',
        amplop : ''
    })
    const [Loading, setLoading] = useState(false);
    const [ErrorGet, setErrorGet] = useState(false);

    const get_cari_pengantar = async () => {
        setLoading(true);
        setErrorGet(false)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cari-data-surat-pengantar?nama=${Data.tujuan}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${User.token}`
          }
        }).then(response => {
          SetForm({...Form, tujuan : response.data.data.tujuan, kota_tujuan : response.data.data.kota_tujuan, alamat : response.data.data.alamat})
        }).catch(error => {
            setErrorGet(true)
        });
        setLoading(false);
      }

      const ValidasiKarakter = (e, parameter) => {
        const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
        if(parameter === 'perihal'){
          SetForm({...Form, [parameter]: filteredInput})
        }
        else{
          SetForm({...Form, [parameter]: filteredInput})
        }
    
      };


    return(
        <CModal size='lg' show={ModalAmplopx} onClose={TogleModalAmplopx} closeOnBackdrop={false} color="warning">
            <CModalHeader closeButton>
                <CModalTitle>Buat Amplop Surat</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                  <CCol>
                    {
                      ErrorGet ? 
                      <span style={{color : 'red', fontWeight : 'bold'}}>
                        Data tidak ditemukan
                      </span> : null
                    }
                    <CButton disabled={Loading} className={'float-right'} color="info" onClick={get_cari_pengantar}>{!Loading ? 'Ambil Data Sebelumnya' : 'Loading...'}</CButton>
                  </CCol>
                </CRow>
                <CRow>
            <CCol>
            <FormControl fullWidth margin='normal'>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Jenis Amplop
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={Form.amplop}
                  name='amplop'
                  placeholder="Jenis Amplop"
                  displayEmpty
                  onChange={(e) => {
                    SetForm({...Form, amplop : e.target.value});
                  }}
                >
                  <MenuItem value=''>
                    <em>Pilih Tipe Amplop</em>
                  </MenuItem>
                     <MenuItem value='dl'>Amplop Kecil (DL)</MenuItem>
                     <MenuItem value='a4'>Amplop Sedang (A4)</MenuItem>
                     <MenuItem value='c4'>Amplop Besar (C4)</MenuItem>
                </Select>
              </FormControl>
            </CCol>
          </CRow>
          <CRow>
                    <CCol md={6}>
                        <TextField label="Tujuan Surat"
                                    value={Form.tujuan}
                                    onChange={(e) => ValidasiKarakter(e, 'tujuan')}
                                    placeholder="Tujuan Surat"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                        />
                    </CCol>
                    <CCol md={6}>
                        <TextField label="Kota Tujuan"
                                    value={Form.kota_tujuan}
                                    onChange={(e) => ValidasiKarakter(e, 'kota_tujuan')}
                                    placeholder="Kota Tujuan"
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
                        <TextField label="Alamat Surat"
                                    value={Form.alamat}
                                    onChange={(e) => ValidasiKarakter(e, 'alamat')}
                                    placeholder="Alamat Surat"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    multiline rowsMax={10}
                        />
                    </CCol>
                   
          </CRow>
            </CModalBody>
            <CModalFooter>
            <a href={Form.kota_tujuan === '' || Form.tujuan === '' ? '#/master-data/surat-keluar/' + Data.slug : `${process.env.REACT_APP_BASE_URL}/cetak-amplop?slug=${Data.slug}&tujuan=${Form.tujuan}&kota_tujuan=${Form.kota_tujuan}&alamat=${Form.alamat}&nama=${Data.tujuan}&amplop=${Form.amplop}` } className={Form.kota_tujuan === '' || Form.tujuan === '' ? 'btn btn-secondary ml-2' : 'btn btn-primary ml-2'}>
                        {Form.kota_tujuan === '' || Form.tujuan === '' ? '#' : 'Cetak'}
                        </a>
                <CButton color="warning" onClick={TogleModalAmplopx}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}


const ModalAmplop = React.memo(ModalAmplopKomponent);
export default ModalAmplop;