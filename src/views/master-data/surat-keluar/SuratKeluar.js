import React, {useCallback, useEffect, useState} from 'react';
import {CCard, CCardBody, CCardHeader, CDataTable} from "@coreui/react";
import HelperSuratKeluar from "./HelperSuratKeluar";
import * as moment from "moment";
import '../StyleSurat.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import ModalTambahSurat from "./modal-tambah-surat/ModalTambahSurat";
import { Link } from 'react-router-dom';


const SuratKeluar = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Data,  SetData] = useState([]);
  const [Loading,  SetLoading] = useState(false);

  const [Parameter, SetParameter] = useState({
    tahun : moment().format('YYYY'), bulan : moment().format('MM')
  });

  const {GetData, fields} = HelperSuratKeluar(SetData, SetLoading);
  const GetDataUser = useCallback(GetData, []);


  useEffect(() => {
    GetDataUser(Parameter);
  },[GetDataUser, Parameter]);

  return(
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
          className='table-striped'
          sorter
          pagination
          scopedSlots = {{
            'asal':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                      {item.asal}
                  </td>
                )
              },
            'nomor_surat':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    <Link to={`/master-data/surat-keluar/${item.slug}`}>
                     {item.nomor_surat}
                    </Link>
                  </td>
                )
              },
            'urutan':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {item.urutan}
                  </td>
                )
              },
            'tujuan':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {item.tujuan}
                  </td>
                )
              },
            'tanggal_surat_indo':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {item.tanggal_surat_indo}
                  </td>
                )
              },
            'perihal':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {item.perihal}
                  </td>
                )
              },
          }}
        />
      </CCardBody>
    </CCard>
  )
};

export default SuratKeluar;
