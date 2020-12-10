import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInputFile,
  CLabel,
  CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faBarcode, faKey} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import './register.css';
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {

  const [Form, SetForm] = useState({
    nama_pengguna : '',
    email_pengguna : '',
    nomor_handphone : '',
    nama_instansi : '',
    kode_surat : '',
    email_instansi : '',
    password : '',
    c_password : '',
    file : '',
    captcha : ''
  })

  const [Error, SetError] = useState([]);
  const [LoadingButton, setLoadingButton] = useState(false);
  const [Berhasil, setBerhasil] = useState(false);


  const TryRegister = async (e) => {
    setLoadingButton(true);
    let bodyFormData = new FormData();
    bodyFormData.set('nama_pengguna', Form.nama_pengguna);
    bodyFormData.set('email', Form.email_pengguna);
    bodyFormData.set('telpon', Form.nomor_handphone);
    bodyFormData.set('nama_instansi', Form.nama_instansi);
    bodyFormData.set('kode_surat', Form.kode_surat);
    bodyFormData.set('email_instansi', Form.email_instansi);
    bodyFormData.set('password', Form.password);
    bodyFormData.set('c_password', Form.c_password);
    bodyFormData.set('file', Form.file);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/register-tunggu`,
      data: bodyFormData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      SetForm({
        nama_pengguna : '',
        email_pengguna : '',
        nomor_handphone : '',
        nama_instansi : '',
        kode_surat : '',
        email_instansi : '',
        password : '',
        c_password : '',
        file : '',
        captcha : ''
      });
      setBerhasil(true);
    }).catch(function (error) {
      SetError(error.response.data.error);
    });
    setLoadingButton(false);
  };
 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="12" lg="12" xl="12">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Buat Akunmu Sekarang</p>
                  <CRow>
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput invalid={Error.nama_pengguna} value={Form.nama_pengguna} onChange={(e) => {
                          SetForm({...Form, nama_pengguna : e.target.value});
                          SetError({...Error, nama_pengguna : false})
                        }} type="text" placeholder="nama pengguna" autoComplete="name" />
                        {
                          Error.nama_pengguna ?  Error.nama_pengguna.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput  invalid={Error.email} value={Form.email_pengguna} onChange={(e) => {
                      SetForm({...Form, email_pengguna : e.target.value});
                      SetError({...Error, email : false})
                    }} type="text" placeholder="email pengguna" autoComplete="email" />
                    {
                        Error.email ?  Error.email.map((list, i) =>
                          <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                        ) : null
                      }
                  </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-phone" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput invalid={Error.telpon} value={Form.nomor_handphone} 
                        onChange={(e) => {
                          SetForm({...Form, nomor_handphone : e.target.value});
                          SetError({...Error, telpon : false})
                        }}
                        type="text" placeholder="nomor handphone" autoComplete="telpon" />
                        {
                        Error.telpon ?  Error.telpon.map((list, i) =>
                          <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                        ) : null
                      }
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                          <FontAwesomeIcon icon={faBuilding} size='lg'/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput invalid={Error.nama_instansi} value={Form.nama_instansi} 
                        onChange={(e) => {
                          SetForm({...Form, nama_instansi : e.target.value});
                          SetError({...Error, nama_instansi : false})
                        }}
                        type="text" placeholder="nama instansi" autoComplete="instansi" />
                        {
                          Error.nama_instansi ?  Error.nama_instansi.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                          <FontAwesomeIcon icon={faBarcode} size='lg'/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput invalid={Error.kode_surat} value={Form.kode_surat} 
                        onChange={(e) => {
                          SetForm({...Form, kode_surat : e.target.value});
                          SetError({...Error, kode_surat : false})
                        }}
                        type="text" placeholder="kode surat (contoh W15-A6)" autoComplete="kode_surat" />
                        {
                          Error.kode_surat ?  Error.kode_surat.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput invalid={Error.email_instansi}  value={Form.email_instansi} 
                    onChange={(e) => {
                      SetForm({...Form, email_instansi : e.target.value});
                      SetError({...Error, email_instansi : false})
                    }}
                    type="text" placeholder="email instansi" autoComplete="email_instansi" />
                    {
                          Error.email_instansi ?  Error.email_instansi.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                  </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                          <FontAwesomeIcon icon={faKey} size='lg'/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput invalid={Error.password} value={Form.password} 
                        onChange={(e) => {
                          SetForm({...Form, password : e.target.value});
                          SetError({...Error, password : false})
                        }}
                        type="text" className='mirip-password2' placeholder="password" autoComplete="passwprd" />
                        {
                          Error.password ?  Error.password.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <FontAwesomeIcon icon={faKey} size='lg'/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput  invalid={Error.c_password} value={Form.c_password} 
                    onChange={(e) => {
                      SetForm({...Form, c_password : e.target.value});
                      SetError({...Error, c_password : false})
                    }}
                    type="text" className='mirip-password2' placeholder="konfirmasi password" autoComplete="c_password" />
                    {
                          Error.c_password ?  Error.c_password.map((list, i) =>
                            <CInvalidFeedback key={i}>{list}</CInvalidFeedback>
                          ) : null
                        }
                  </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={12}>
                    <CInputGroup className="mb-3">
                    <CInputFile invalid={Error.file} custom id="custom-file-input"
                              onChange={(e) => {
                                SetForm({...Form, file : e.target.files[0]});
                                SetError({...Error, file : false})
                              }}
                              onClick={(event)=> {
                                event.target.value = null
                              }}
                  />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {Form.file ? Form.file.name : 'Upload Logo'}
                  </CLabel>
                  {Error.file ? Error.file.map((list, index)=>
                    <CInvalidFeedback key={index}>{list}</CInvalidFeedback>
                  ) : 
                    null
                  }
                      </CInputGroup>
                    
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={5} className={'text-center'}>
                    <ReCAPTCHA
                        sitekey={`${process.env.REACT_APP_CAPTCHA}`}
                        onChange={(e) => SetForm({...Form, captcha : e})}
                      />
                    </CCol>
                    <CCol md={7}>
                      {
                        Berhasil ?
                        <React.Fragment>
                          <p style={{fontSize : 18, fontWeight : 'bold', color : 'green', marginTop : -5, marginBottom : 0}}>Register Berhasil</p>
                            <p style={{fontSize : 12, fontWeight : 'bold', marginBottom : 0}}>Silahkan lakuan pembayaran untuk segera diverifikasi oleh super admin</p>
                            <p style={{fontSize : 12, fontWeight : 'bold', marginBottom : 0}}>Nomor Rekening : <span style={{color : 'red'}}>1584-01-000286-53-6</span> (B R I) : Jumlah (Rp. 50.000)/6 Bulan</p>
                            <p style={{fontSize : 12, fontWeight : 'bold', marginBottom : 0}}>Atas Nama : Apriadi (0852-4950-0262 : Telpon & Whatshap)</p>
                        </React.Fragment> : null
                      }
                      </CCol>
                  </CRow>
                
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol md={6}>
                  <Link to="/login">
                  <CButton color="danger" block>Kembali</CButton>
                   </Link>
                  </CCol>
                  <CCol md={6}>
                  <CButton disabled={LoadingButton || Form.captcha === ''} onClick={TryRegister} color="success" block>
                  {!LoadingButton ? 'Buat Akun' : 'Loading...'}
                </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
