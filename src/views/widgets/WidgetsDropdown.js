import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import axios from 'axios';

const WidgetsDropdown = () => {
  const User = JSON.parse(localStorage.getItem('user'));

  const [SuratKeluarChart, setSuratKeluarChart] = useState({jumlah : '',chart : [],bulan : []})
  const [SuratMasukChart, setSuratSuratMasukChart] = useState({jumlah : '',chart : [],bulan : []})
  const [RequestSuratChart, setRequestSuratChart] = useState({jumlah : '',chart : [],bulan : []})
  const [RequestSuratChartBelum, setRequestSuratChartBelum] = useState({jumlah : '',chart : [],bulan : []})

  const SuratKeluar = async (field, tabel, set, status = null) => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/data-surat-keluar?field=${field}&tabel=${tabel}&status=${status}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      set(response.data)
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    SuratKeluar('tanggal_surat', 't_surat_keluar', setSuratKeluarChart, 2)
    SuratKeluar('tanggal_terima', 't_surat_masuk', setSuratSuratMasukChart)
    SuratKeluar('request', 't_surat_keluar', setRequestSuratChart)
    SuratKeluar('belum', 't_surat_keluar', setRequestSuratChartBelum)
  },[])

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={SuratMasukChart.jumlah}
          text="Surat Masuk"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={SuratMasukChart.chart}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels={SuratMasukChart.bulan}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={SuratKeluarChart.jumlah}
          text="Surat Keluar"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={SuratKeluarChart.chart}
              labels={SuratKeluarChart.bulan}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={RequestSuratChart.jumlah}
          text="Request Nomor Surat"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={RequestSuratChart.chart}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels={RequestSuratChart.bulan}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={RequestSuratChartBelum.jumlah}
          text="Request Belum di Setujui"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              dataPoints={RequestSuratChartBelum.chart}
              label="Members"
              labels={RequestSuratChartBelum.bulan}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
