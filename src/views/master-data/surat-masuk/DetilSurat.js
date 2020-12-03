import React, {useCallback, useState} from 'react';
import {CRow, CCol, CContainer, CCardBody, CButton, CBadge} from "@coreui/react";
import {Link} from "react-router-dom";
import ModalFileSurat from "./modal-detil/ModalFileSurat";
import HapusFileSurat from "./modal-detil/HapusFileSurat";
import ModalTambahDisposisi from "./disposisi-surat/ModalTambahDisposisi";
import ModalTambahDisposisiManual from "./disposisi-surat/ModalTambahDisposisiManual";
import pdf from '../../../assets/images/pdf.png';
import word from '../../../assets/images/word.png';
import excel from '../../../assets/images/excel.png';
import axios from "axios";
import firebase from "../../../firebase";

const DetilSuratKomponent = ({item, GetDataUser, Parameter}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Form, SetForm] = useState({t_surat_masuk_id : '', url : '', file : '', nama_file :''})
  const [ModalFile, setModalFile] = useState(false);
  const [LoadingKirimNotif, setLoadingKirimNotif] = useState(false);
  const TogleModalFile = useCallback(async (id) => {
    await SetForm({...Form, t_surat_masuk_id : id})
    setModalFile(!ModalFile);
  },[ModalFile]);

  const AkhiriDisposisi = async (disposisi_id) => {
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/disposisi-admin-akhiri`,
      data: {
        disposisi_id : disposisi_id
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
      GetDataUser(Parameter);
      firebase.database().ref(`/notifikasi/${User.instansi_id}/${res.data.data.id_penerima}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const PostData = {
          disposisi : JumDis - 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${res.data.data.id_penerima}`] = PostData;
        return firebase.database().ref().update(updates);
      });

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
        const PostData = {
          disposisi : JumDis - 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
        return firebase.database().ref().update(updates);
      });

      firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}`).once('value').then(function(snapshot) {
        const JumDis = (snapshot.val() && snapshot.val().jumlah) || 0;
        const PostData = {
          jumlah : JumDis - 1
        };
        const updates = {};
        updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
        return firebase.database().ref().update(updates);
      });

    }).catch(function (error) {
      console.log(error);
    });
  }
  const getBadge = (status)=>{
    switch (status) {
      case 1: return ['danger', 'Belum']
      case 2: return ['warning', 'Proses']
      case 3: return ['success', 'Selesai']
      default: return ['primary', '??']
    }
  }

  const KirimNotifLagi = async (id_user, id_disposisi) => {
    setLoadingKirimNotif(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/kirim-notif-2`,
      data: {
        id_user : id_user,
        id_disposisi : id_disposisi
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
      setLoadingKirimNotif(false);
    }).catch(function (error) {
      if(error.response){
        if(error.response.data.message == 'error1'){
          alert('User Belum Login di Android');
        }
      }
      setLoadingKirimNotif(false);
    });
  }

  return (
    <CCardBody>
       <ModalFileSurat ModalFile={ModalFile} TogleModalFile={TogleModalFile} GetDataUser={GetDataUser} Parameter={Parameter} Form={Form} SetForm={SetForm}/>
      <CContainer fluid={true}>
        <CRow>
          <CCol md={12}>
            <p>Surat Nomor : <Link to={`/master-data/surat-masuk/${item.slug}`}><span className='font-weight-bold'>{item.nomor_surat}</span></Link></p>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={4}>
            {
              User.level === 1 ?
                <CButton color="success" className='mb-2' variant="outline" shape="square" size="sm"
                         onClick={() => TogleModalFile(item.id)}>
                         Tambah File</CButton> : <br/>
            }
            {item.files.length > 0 ?
              <table className='table table-bordered'>
                <thead>
                <tr>
                  <td width="70%">Nama File</td>
                  <td width="10%">File</td>
                  {
                    User.level === 1 ?
                      <td width="20%">Aksi</td> : null
                  }
                </tr>
                </thead>
                <tbody>
                {
                  item.files.map((list, index) =>
                    <tr key={index}>
                      <td>
                        {list.nama_file}
                      </td>
                      <td>
                        <a href={`${list.url}/${list.slug}.${list.extensi}`}>
                          <img className="pointer_custom gambar_file" src={
                            list.extensi === 'pdf' ?
                              pdf
                              :
                              list.extensi === 'docx' || list.extensi === 'rtf' || list.extensi === 'doc' ?
                                word
                                :
                                list.extensi === 'xls' || list.extensi === 'xlsx' ?
                                  excel
                                  :
                                  null
                          }
                               alt={`surat-masuk`} width="30px" height='30px' style={{cursor : 'pointer'}}/>
                        </a>
                      </td>
                      {
                        User.level === 1 ?
                          <td align='center'>
                            <CButton color="danger" onClick={() => HapusFileSurat(list.id, `${list.slug}.${list.extensi}`,  GetDataUser, Parameter)} className='mb-2 text-center' variant="outline" shape="square" size="sm" >Hapus</CButton>
                          </td> : null
                      }

                    </tr>
                  )
                }
                </tbody>
              </table> : null
            }
          </CCol>
          <CCol md={8}>
            {
              item.files.length > 0 ?
                <React.Fragment>
                  {User.level === 1 ? item.disposisi ? item.disposisi.status === 1 ?
                    <ModalTambahDisposisi item={item} GetDataUser={GetDataUser} Parameter={Parameter}/>
                    :
                      item.disposisi.status !== 3 ?
                      <CButton color="danger" className='mb-2' variant="outline" onClick={() => AkhiriDisposisi(item.disposisi.id)} shape="square" size="sm">Akhiri Disposisi</CButton>
                        : <a href={`${process.env.REACT_APP_BASE_URL}/cetak-disposisi?slug=${item.slug}`} className='btn btn-sm btn-outline-dark mb-2 ml-2'>
                          Cetak Disposisi
                        </a>
                    : <ModalTambahDisposisi item={item} GetDataUser={GetDataUser} Parameter={Parameter}/>
                    : <br/>}
                  {
                    item.disposisi ?
                      <React.Fragment>
                        {item.disposisi.status !== 3 ?
                          User.level === 1 ? <ModalTambahDisposisiManual item={item} GetDataUser={GetDataUser} Parameter={Parameter}/> : null
                          : null}
                        <table className='table table-bordered'>
                          <thead>
                          <tr>
                            <th width='5%'>No</th>
                            <th width='35%'>Nama</th>
                            <th width='55%'>Disposisi</th>
                            <th width='5%'>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          {item.disposisi.penerima.map((list2, index2) =>
                            <tr key={index2}>
                              <td>{list2.urutan}</td>
                              <td>{list2.id_penerima.name}</td>
                              <td>{
                                list2.status !== 3 ?
                                  <CButton color="info" disabled={LoadingKirimNotif} className='mb-2' variant="outline" size={'sm'} onClick={() => {KirimNotifLagi(list2.id_penerima.id, list2.disposisi_id)}} >{LoadingKirimNotif ? 'Loading...' : 'Kirim Notifikasi Ulang (Android)'}</CButton>
                                  :
                                  list2.pesan
                              }</td>
                              <td>
                                <CBadge color={getBadge(list2.status)[0]}>
                                  {getBadge(list2.status)[1]}
                                </CBadge>
                              </td>
                            </tr>
                          )}
                          </tbody>
                        </table>
                      </React.Fragment>
                      : null
                  }
                </React.Fragment>
                : null
            }
          </CCol>
        </CRow>
      </CContainer>
    </CCardBody>
  );
}
const DetilSurat = React.memo(DetilSuratKomponent);
export default DetilSurat;
