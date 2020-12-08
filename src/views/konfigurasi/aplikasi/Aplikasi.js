import React, {Fragment} from 'react';
import {CCard, CCardBody, CCardHeader, CCol, CRow, CFormGroup, CInputFile, CLabel, CInvalidFeedback, CValidFeedback} from "@coreui/react";
import FormAplikasi from "./FormAplikasi";
import {Redirect} from 'react-router-dom'
import FormHelper from "./FormHelper";
const Aplikasi = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const {Form, HandleForm, Loading, CobaSaveData, Valid, NotifEnter, SaveFile, Error, Suk} = FormHelper();
  
  return (
    <CCard>
      {
        User.level === 2 ? <Redirect to={'/'}/> : null
      }
      <CCardHeader>
        Konfigurasi Aplikasi{' '}

        <div className="card-header-actions text-danger font-weight-bold">
         {NotifEnter ? 'Tekan Enter Untuk Menyimpan' : null}
        </div>
      </CCardHeader>
      <CCardBody>
        {
          Loading ? <p className='text-center'>....Loading Data</p>:
            <Fragment>
              <FormAplikasi valid={Valid.nama} label={'Nama Instansi'} name={'nama'} value={Form.nama} onKeyPress={CobaSaveData} onChange={HandleForm} placeholder={'Nama Instansi'}/>
              <FormAplikasi valid={Valid.alamat} label={'Alamat Instansi'} name={'alamat'} value={Form.alamat} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Alamat Instansi'}/>
              <FormAplikasi valid={Valid.kota} label={'Kota Instansi'} name={'kota'} value={Form.kota} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Kota Instansi'}/>
              <FormAplikasi valid={Valid.telpon} label={'Telpon Instansi'} name={'telpon'} value={Form.telpon} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Telpon Instansi'}/>
              <FormAplikasi valid={Valid.email} label={'Email Instansi'} name={'email'} value={Form.email} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Email Instansi'}/>
              <FormAplikasi valid={Valid.website} label={'Website Instansi'} name={'website'} value={Form.website} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Website Instansi'}/>
              <FormAplikasi valid={Valid.kode_pos} label={'Kode Pos Instansi'} name={'kode_pos'} value={Form.kode_pos} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Kode Pos Instansi'}/>
              <FormAplikasi valid={Valid.kode_surat} label={'Kode Surat Instansi'} name={'kode_surat'} value={Form.kode_surat} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Kode Surat Instansi'}/>
              <FormAplikasi valid={Valid.url_server} label={'Link Upload Surat'} name={'url_server'} value={Form.url_server} onKeyPress={CobaSaveData}  onChange={HandleForm} placeholder={'Link Upload Surat'}/>
              <CRow>
              <CCol md={12}>
              <CFormGroup row>
                <CCol md="2 mt-1">
                  <CLabel htmlFor="text-input">Logo Instansi</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <CInputFile invalid={Error.file} custom id="custom-file-input"
                              onChange={(e) => SaveFile(e.target.files[0])}
                              valid={Suk}
                              onClick={(event)=> {
                                event.target.value = null
                              }}
                  />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {Form.file ? Form.file.name : Form.logo !== '' ? Form.logo : 'Upload Logo'}
                  </CLabel>
                  {Error.file ? Error.file.map((list, index)=>
                    <CInvalidFeedback key={index}>{list}</CInvalidFeedback>
                  ) : 
                    <CValidFeedback>Sukses (Logout dan Login untuk mengganti logo profile)</CValidFeedback>
                  }
                  </CCol>
              </CFormGroup>
              </CCol>
              </CRow>
            
            </Fragment>
        }
      </CCardBody>
    </CCard>
  )
};

export default Aplikasi;
