import React, {useCallback, useEffect, useState} from 'react';
import {CButton, CCard, CCardBody, CCardHeader, CCollapse, CDataTable, CBadge} from "@coreui/react";
import {Link} from "react-router-dom";
import {MenuItem, FormControl, Select} from '@material-ui/core';
import ModalTambahSurat from "./tambah-surat/ModalTambahSurat";
import HelperSuratMasuk from "./HelperSuratMasuk";
import * as moment from "moment";
import '../StyleSurat.css';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DetilSurat from "./DetilSurat";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

const SuratMasuk = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Data,  SetData] = useState([]);
  const [Loading,  SetLoading] = useState(false);
  const [details, setDetails] = useState([])
  const [lperihal, setPerihal] = useState([])
  const [Parameter, SetParameter] = useState({
    tahun : moment().format('YYYY'), bulan : moment().format('MM')
  });
  const {GetData, toggleDetails, fields, togglePerihal, getBadge} = HelperSuratMasuk(SetData, SetLoading, details, setDetails, lperihal, setPerihal);

  const GetDataUser = useCallback(GetData, []);


  useEffect(() => {
      GetDataUser(Parameter);
  },[GetDataUser, Parameter]);

  return (
    <CCard>
      <CCardHeader>
        <a href={`${process.env.REACT_APP_BASE_URL}/cetak-surat-masuk?instansi_id=${User.instansi_id}&tahun=${Parameter.tahun}&bulan=${Parameter.bulan}`} color="primary" style={{marginRight : 10}}><FontAwesomeIcon style={{marginTop : 5}} icon={faPrint} size='lg'/></a>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker autoOk variant="inline" value={Parameter.tahun} onChange={(e) => SetParameter({...Parameter, tahun : moment(e).format('yyyy')})} views={["year"]} style={{ width : 40 }}/>
        </MuiPickersUtilsProvider>
        <FormControl className='ml-2'>
          <Select
            displayEmpty
            value={Parameter.bulan}
            onChange={(e) => SetParameter({...Parameter, bulan : e.target.value})}
          >
            <MenuItem value="all">
              <em>Semua Bulan</em>
            </MenuItem>
            <MenuItem value={'01'}>Januari</MenuItem>
            <MenuItem value={'02'}>Februari</MenuItem>
            <MenuItem value={'03'}>Maret</MenuItem>
            <MenuItem value={'04'}>April</MenuItem>
            <MenuItem value={'05'}>Mei</MenuItem>
            <MenuItem value={'06'}>Juni</MenuItem>
            <MenuItem value={'07'}>Juli</MenuItem>
            <MenuItem value={'08'}>Agustus</MenuItem>
            <MenuItem value={'09'}>September</MenuItem>
            <MenuItem value={'10'}>Oktober</MenuItem>
            <MenuItem value={'11'}>November</MenuItem>
            <MenuItem value={'12'}>Desember</MenuItem>
          </Select>
        </FormControl>

        <div className="card-header-actions text-danger font-weight-bold">
          {User.level === 1 ?  <ModalTambahSurat GetDataUser={() => GetDataUser(Parameter)}/> : null}
        </div>
      </CCardHeader>
      <CCardBody>
            <CDataTable
              items={Data}
              fields={fields}
              columnFilter
              noItemsView={Loading ?  {noItems: '... Mengambil Data'} :  {noResults: 'Pencarian Tidak Ditemukan', noItems: 'Tidak Ada Data'}}
              loading={Loading}
              itemsPerPage={10}
              hover
              striped={true}
              footer={true}
              sorter
              pagination
              scopedSlots = {{
                'asal_surat' :
                  (item, index) => {
                    return (
                      <td className="py-2 font_for_surat_masuk">
                        {item.asal_surat}
                      </td>
                    )
                  },
                'nomor_surat' :
                  (item, index) => {
                    return (
                      <td className="py-2 font_for_surat_masuk">
                        <Link to={`/master-data/surat-masuk/${item.slug}`}>{item.nomor_surat}</Link>
                      </td>
                    )
                  },
                'perihal' :
                  (item, index) => {
                    return (
                      <td className="py-2 font_for_surat_masuk perihal">
                        {lperihal.includes(index) ? null : item.perihal.substring(0, 20)}
                        {
                          item.perihal.length > 20 ?
                            lperihal.includes(index) ? null :
                            <span className='bisa-diklik' onClick={() => togglePerihal(index)}> ...more</span> : null
                        }
                        <CCollapse show={lperihal.includes(index)}>
                          {item.perihal}
                          <span className='bisa-diklik'  onClick={() => togglePerihal(index)}> #hide#</span>
                        </CCollapse>
                      </td>
                    )
                  },
                'nomor_agenda' :
                  (item, index) => {
                    return (
                      <td className="py-2 text-center font_for_surat_masuk">
                        {item.nomor_agenda}
                      </td>
                    )
                  },
                'tanggal_terima_indo' :
                  (item, index) => {
                    return (
                      <td className="py-2 font_for_surat_masuk">
                        {item.tanggal_terima_indo}
                      </td>
                    )
                  },
                'tanggal_surat_indo' :
                  (item, index) => {
                    return (
                      <td className="py-2 font_for_surat_masuk">
                        {item.tanggal_surat_indo}
                      </td>
                    )
                  },
                'disposisi' :
                  (item, index) => {
                    return (
                      <td className="py-2 text-center">
                        <CBadge color={item.disposisi !== null ? getBadge(item.disposisi.status)[0] : getBadge(1)[0]}>
                          {item.disposisi !== null ? getBadge(item.disposisi.status)[1] : getBadge(1)[1]}
                        </CBadge>
                      </td>
                    )
                  },
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{toggleDetails(item.id)}}
                        >
                          {details.includes(item.id) ? 'Tutup' : 'Buka'}
                        </CButton>
                      </td>
                    )
                  },
                'details':
                  (item, index)=>{
                    return (
                      <CCollapse show={details.includes(item.id)}>
                          <DetilSurat item={item} GetDataUser={GetDataUser} Parameter={Parameter}/>
                      </CCollapse>
                    )
                  }
              }}
            />
      </CCardBody>
    </CCard>
  )
};

export default SuratMasuk;
