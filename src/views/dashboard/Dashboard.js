import React, { lazy, useEffect, useState, useRef } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import KategoriTableKomponent from './TableKategoriKomponent';
import axios from 'axios';

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const myRef = useRef(null);
  const User = JSON.parse(localStorage.getItem('user'));
  const [KategoriTable, setKategoriTable] = useState([])
  const [KategoriTableMasuk, setKategoriTableMasuk] = useState([])

  const DataKategori = async (tabel, setKategoriTableMasuk) => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/data-kategori?tabel=${tabel}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setKategoriTableMasuk(response.data)
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    DataKategori('t_surat_keluar', setKategoriTable);
    DataKategori('t_surat_masuk', setKategoriTableMasuk);
  },[])

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Grafik Data Persuratan</h4>
              <div className="small text-muted">Tahun 2020</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              <CButtonGroup className="float-right mr-3">
                    <CButton
                      onClick={executeScroll}
                      color="outline-secondary"
                      className="mx-0"
                    >
                      Kategori Surat
                    </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
        
      </CCard>

                <div ref={myRef}>
                <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Data Kategori Surat Masuk
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="12" xl="12">
                  <KategoriTableKomponent KategoriTable={KategoriTable}/>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Data Kategori Surat Keluar
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="12" xl="12">
                  <KategoriTableKomponent KategoriTable={KategoriTableMasuk}/>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
                </div>
    
    </>
  )
}

export default Dashboard
