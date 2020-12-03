import React, {useState} from 'react';
import {CButton} from "@coreui/react";
import {TextField, Select, MenuItem} from "@material-ui/core";
import {CCol, CRow} from "@coreui/react";
import axios from "axios";

const TambahVariabelKomponent = ({GetData, nomor}) => {
  const [InputVariabel, setInputVariabel] = useState(false);
  const [Form, setForm] = useState({nomor_variabel : nomor, nama_variabel : '', default_value : '', tipe : ''});
  const [Loading, SetLoading] = useState(false);

  const HandleInputVariabel = () => {
    setInputVariabel(!InputVariabel)
  };

  const KirimData = async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    SetLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/add-sk-variabel`,
      data: Form,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      GetData();
      HandleInputVariabel();
    }).catch(function (error) {
      console.log('error')
    });

    SetLoading(false);
  }


  return (
    <React.Fragment>
      {InputVariabel ?
        <React.Fragment>
          <CCol md={12}>
            <CRow>
              <CCol md={8}>
                <TextField size={'small'}
                           placeholder="Nama Variabel"
                           className={'mt-1'}
                           value={Form.nama_variabel}
                           onChange={(e) => setForm({...Form, nama_variabel: e.target.value})}

                />
                <TextField size={'small'}
                           placeholder="Default Value"
                           className={'ml-3 mt-1'}
                           value={Form.default_value}
                           onChange={(e) => setForm({...Form, default_value: e.target.value})}
                />
                <Select
                  labelId="Tipe Data"
                  size={'small'}
                  displayEmpty
                  className={'ml-3'}
                  value={Form.tipe}
                  onChange={(e) => setForm({...Form, tipe : e.target.value})}
                >
                  <MenuItem value=''>Tipe Data</MenuItem>
                  <MenuItem value='text'>Text</MenuItem>
                  <MenuItem value='date'>Tanggal</MenuItem>
                </Select>
              </CCol>
              <CCol md={4}>
                <CButton color="danger" className={'ml-2 float-right'} type='submit' onClick={HandleInputVariabel}>Batalkan</CButton>
                <CButton color="info" disabled={Loading} className='float-right' type='submit' onClick={KirimData}>
                    {Loading ? '...Loading' : 'Simpan Variabel'}
                  </CButton>
              </CCol>

            </CRow>
          </CCol>
        </React.Fragment>
         :
          <CButton color="primary" size={'sm'} type='submit' onClick={HandleInputVariabel}>Tambah Variabel</CButton>
      }

    </React.Fragment>
  );
}
const TambahVariabel = React.memo(TambahVariabelKomponent);
export default TambahVariabel;
