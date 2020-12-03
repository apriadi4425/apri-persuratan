import {useState} from 'react';
import axios from 'axios';
import * as moment from "moment";

const AutoCompleteHelper = () => {
  const [NamaPA, SetNamaPA] = useState([{asal_surat : '...Loading'}]);
  const [KodeSurat, SetKodeSurat] = useState([{kode_surat : '...Loading'}]);

  const GetAllNamaPA = (group) => {
    const User = JSON.parse(localStorage.getItem('user'));
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-instansi?group=${group}`,{
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }}
    )
      .then(res => {
        if(group === 'asal_surat'){
          SetNamaPA(res.data)
        }else{
          SetKodeSurat(res.data)
        }
      });
  }

  const  GetNomorSurat = (Form, SetNomorSurat) => {
    const User = JSON.parse(localStorage.getItem('user'));
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/generate-nomor-surat?asal_surat=${Form.asal_surat}&tanggal_surat=${moment(Form.tanggal_surat).format('YYYY-MM-DD')}&kode_surat=${Form.kode_surat}`,{
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }}
    )
      .then(res => {
        if(res.data.status === 'sukses'){
          SetNomorSurat([{nomor_surat : res.data.data}]);
        }else{
          SetNomorSurat([{nomor_surat:  'Tidak Tersedia Pilihan'}])
        }
      });
  }

  const  GetNomorSurat2 = (Form, SetNomorSurat) => {
    const User = JSON.parse(localStorage.getItem('user'));
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-keluar-generate-nomor?nomor_urut=${Form.urutan}&tanggal_surat=${moment(Form.tanggal_surat).format('YYYY-MM-DD')}&kode_surat=${Form.kode_surat}`,{
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }}
    )
      .then(res => {
        if(res.data.status === 'sukses'){
          SetNomorSurat([{nomor_surat : res.data.data}]);
        }else{
          SetNomorSurat([{nomor_surat:  'Tidak Tersedia Pilihan'}])
        }
      });
  }

  return {NamaPA, GetAllNamaPA, KodeSurat, GetNomorSurat, GetNomorSurat2}
};

export default AutoCompleteHelper;
