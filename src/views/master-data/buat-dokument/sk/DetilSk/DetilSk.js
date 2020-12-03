import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import DetilSkHelpers from "./DetilSkHelpers";
import {CButton, CCard, CCardBody, CCardHeader, CRow, CCol} from "@coreui/react";
import * as moment from "moment";
import {TextField} from "@material-ui/core";
import TambahVariabel from "./tambah-variabel/TambahVariabel";
import MomentUtils from "@date-io/moment";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ModalKonsideran from "./Konsideran/ModalKonsideran";
import ModalMemutuskan from "./Konsideran/ModalMemutuskan";
import axios from "axios";


const DetilSk = () => {
  let { slug, id, sk_asal } = useParams();
  const [ModalParam, setModalParam] = useState({nama : '', jenis : '', id : ''});
  const [Modal, setModal] = useState(false);
  const [ModalMemutuskannya, setModalMemutuskan] = useState(false);
  const [Konsideran, setKonsideran] = useState([]);
  const [GetDatanyaMemutuskan, setDatanyaMemutuskan] = useState([]);

  const TogleModal = useCallback(() => {
    setModal(!Modal)
  }, [Modal])

  const TogleModalMemutuskan = useCallback(() => {
    setModalMemutuskan(!ModalMemutuskannya)
  }, [ModalMemutuskannya])

  const GetDataKonsideran = useCallback( async (id, jenis) => {
    const User = JSON.parse(localStorage.getItem('user'));
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-konsideran?sk_list_id=${id}&jenis=${jenis}&instansi_asal=${sk_asal}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setKonsideran(response.data)
    }).catch(error => {
      console.log(error);
    });
    setModal(true)
  },[sk_asal]);

  const GetDataMemutuskan = useCallback( async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-memutuskan?sk_list_id=${id}&instansi_asal=${sk_asal}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setDatanyaMemutuskan(response.data)
    }).catch(error => {
      console.log(error);
    });
    setModalMemutuskan(true);
  },[id, sk_asal]);

  const ClickModal = async (nama, jenis, id) => {
    await setModalParam({nama : nama, jenis : jenis, id : id});
    await GetDataKonsideran(id, jenis);
  }

  const {getData, Variabel, User, Form, setForm, OnEnter, Loading} = DetilSkHelpers(slug);


  const GetData = useCallback(getData, []);

  useEffect(() => {
    GetData();
  },[GetData]);

  return (
    <CCard>

      {
        ModalParam.nama !== '' ? <ModalKonsideran GetDataKonsideran={GetDataKonsideran} Konsideran={Konsideran} TogleModal={TogleModal} Modal={Modal} nama={ModalParam.nama} jenis={ModalParam.jenis} id={ModalParam.id}/> : null
      }
      <ModalMemutuskan ModalMemutuskan={ModalMemutuskannya} TogleModalMemutuskan={TogleModalMemutuskan} GetDatanyaMemutuskan={GetDatanyaMemutuskan} id={id} GetDataMemutuskan={GetDataMemutuskan}/>
      <CCardHeader>
        <CRow>
          <CCol md={8}>
              <CButton color="primary" variant="outline" shape="square" size="sm" onClick={() => ClickModal('Menimbang',1, id)}>Menimbang</CButton>
              <CButton color="primary" variant="outline" shape="square" className='ml-2' size="sm" onClick={() => ClickModal('Mengingat',2, id)}>Mengingat</CButton>
              <CButton color="primary" variant="outline" shape="square" className='ml-2 mr-2' size="sm" onClick={() => ClickModal('Memperhatikan',3, id)}>Memperhatikan</CButton>
              <CButton color="primary" variant="outline" shape="square" onClick={GetDataMemutuskan} size="sm">Memutuskan</CButton>
          </CCol>
          <CCol md={4}>
            <div className="card-header-actions text-danger font-weight-bold">
              <a href={`${process.env.REACT_APP_BASE_URL}/api/c-sk/${slug}/${User.instansi_id}`}>Cetak</a>
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <table className='table table-bordered'>
         <tbody>
         {
           Variabel.map((list, index) =>
             <tr key={index}>
               <td width={'20%'}>
                 {Form.nomor_variabel === '' ? list.nama === '' || list.nama === null ? `Var No. ${list.nomor}` : list.nama :
                   Form.nomor_variabel === list.nomor ?
                     Loading ? <span className='text-success font-weight-bold'>....Loading</span> : <span className='text-danger font-weight-bold'>Enter to Save</span> :
                     list.nama === '' || list.nama === null ? `Var No. ${list.nomor}` : list.nama
                 }
               </td>
               <td>
                 {
                   list.nama === '' ?
                     list.instansi_id === User.instansi_id ?
                      <TambahVariabel GetData={GetData} nomor={list.nomor}/>
                       : 'Variabel tidak ada Silahkan Hubungi Pemilik SK'
                     :
                     list.tipe === 'text' ?
                       Form.nomor_variabel === '' ? <span onClick={()=> setForm({sk_list_id: list.sk_id, nomor_variabel : list.nomor, isi : list.value})}>{list.value ? list.value : 'Klik disini Untuk Mengubah'}</span> :

                       Form.nomor_variabel === list.nomor ?
                         <TextField size={'small'} fullWidth
                                    autoFocus={true}
                                    onChange={(e) => setForm({...Form, isi : e.target.value})}
                                    onKeyPress={OnEnter}
                                    value={Form.isi}/> : <span onClick={()=> setForm({sk_list_id: list.sk_id, nomor_variabel : list.nomor, isi : list.value})}>{list.value ? list.value : 'Klik disini Untuk Mengubah'}</span>
                        :

                       Form.nomor_variabel === '' ? <span onClick={()=> setForm({sk_list_id: list.sk_id, nomor_variabel : list.nomor, isi : list.value})}>{list.value ? moment(list.value).locale('id').format('dddd, DD MMMM YYYY') : 'Klik disini Untuk Mengubah'}</span> :
                         Form.nomor_variabel === list.nomor ?
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                           <DatePicker onKeyPress={OnEnter} autoFocus={true} onChange={(e) => setForm({...Form, isi : moment(e).format('YYYY-MM-DD')})} size={'small'} fullWidth autoOk value={Form.isi} format="DD MMMM YYYY"/>
                          </MuiPickersUtilsProvider>
                           : <span onClick={()=> setForm({sk_list_id: list.sk_id, nomor_variabel : list.nomor, isi : list.value})}>{list.value ? moment(list.value).locale('id').format('dddd, DD MMMM YYYY') : 'Klik disini Untuk Mengubah'}</span>
                 }
               </td>
             </tr>
           )
         }
         </tbody>
        </table>
      </CCardBody>
    </CCard>
  )
};

export default DetilSk;
