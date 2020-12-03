import React, {Fragment} from 'react';
import {CCard, CCardBody, CCardHeader} from "@coreui/react";
import FormAplikasi from "./FormAplikasi";
import {Redirect} from 'react-router-dom'
import FormHelper from "./FormHelper";
const Aplikasi = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const {Form, HandleForm, Loading, CobaSaveData, Valid, NotifEnter} = FormHelper();

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
            </Fragment>
        }
      </CCardBody>
    </CCard>
  )
};

export default Aplikasi;
