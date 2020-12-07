import React, {useState, useEffect} from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'
import axios from 'axios';
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [SuratKeluarChart, setSuratKeluarChart] = useState({jumlah : '',chart : [],bulan : []})
  const [SuratMasukChart, setSuratSuratMasukChart] = useState({jumlah : '',chart : [],bulan : []})


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
  },[])


  const defaultDatasets = (()=>{
  
    return [
      {
        label: 'Data Surat Keluar',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: SuratMasukChart.chart
      },
      {
        label: 'Data Surat Masuk',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: SuratKeluarChart.chart
      },
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(Number(SuratKeluarChart.jumlah) / 5),
              max: Number(SuratKeluarChart.jumlah)
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
    <CChartBar
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={SuratKeluarChart.bulan}
    />
  )
}


export default MainChartExample
