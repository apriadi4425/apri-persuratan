import {useState} from 'react';
import * as moment from "moment";

const HelperTambahSurat = () => {

  const [Form, SetForm] = useState({
    tanggal_surat : moment().format('YYYY-MM-DD'),
    tanggal_terima : moment().format('YYYY-MM-DD'),
    asal_surat : '',
    nomor_agenda : '',
    kode_surat : '',
    tingkat_keamanan : 3,
    nomor_surat : '',
    perihal : '',
    keterangan : ''
  });
  const [Error, SetError] = useState({
    error_tanggal : false,
    error_nomor_agenda : false
  });



  const ValidasiTgl = (TglMasuk, TglSurat, Parameter) => {
    if(moment(TglSurat).format('YYYY-MM-DD') > moment(TglMasuk).format('YYYY-MM-DD')){
      SetError({...Error, error_tanggal: true})
    }else{
      SetError({...Error, error_tanggal: false})
    }
  };

  const ValidasiNomor = (e) => {
    const filteredInput = e.target.value.replace(/([a-zA-Z ])/g, '');
    SetForm({...Form, nomor_agenda: filteredInput})
  };

  const ValidasiKarakter = (e, parameter) => {
    const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
    if(parameter === 'perihal'){
      SetForm({...Form, perihal: filteredInput})
    }
    else{
      SetForm({...Form, keterangan: filteredInput})
    }

  };

  return {Form, SetForm, Error, SetError, ValidasiTgl, ValidasiNomor, ValidasiKarakter}
};

export default HelperTambahSurat;
