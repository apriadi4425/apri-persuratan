import React, {useState, useCallback, useEffect, useContext} from 'react';
import {CCard, CCardBody, CContainer, CRow, CCol, CButton} from "@coreui/react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {GlobalStateContext} from "../../../../globalstate";
import * as moment from 'moment';
import ModalEditSuratMasuk from "./modal-edit/ModalEditSuratMasuk";
import PdF from '../../../../assets/images/pdf.png';
import Word from '../../../../assets/images/word.png';
import Excel from '../../../../assets/images/excel.png';
import '../../disposisi/disposisi-saya/disposisi.css';
import './detil.css';
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';
import firebase from "../../../../firebase";

const DetilSuratInKomponent = ({history}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  let { slug } = useParams();
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState({});
  const {GetNotif} = useContext(GlobalStateContext);
  const [Modal, setModal] = useState(false);

  const TogleModal = useCallback(() => {
    setModal(!Modal);
  },[Modal])

  const GetDataSurat = useCallback(async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-masuk-detil?slug=${slug}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      console.log(response.data)
      setData(response.data);
    }).catch(error => {
      console.log(error)
    });
    await setLoading(false);
    GetNotif();
  },[slug]);

  const LakukanDelete = async () => {
    await axios({
      method : 'delete',
      url : `${process.env.REACT_APP_BASE_URL}/api/surat-masuk`,
      data: {
        id_surat : Data.id,
      },
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      if(res.data.disposisi === 1){
        firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}`).once('value').then(function(snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
          const JumTif = (snapshot.val() && snapshot.val().notif) || 0;
          if(JumTif === 0){
            const PostData = {
              disposisi : JumDis - 1,
              notif : JumTif + 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
            return firebase.database().ref().update(updates);
          }else{
            const PostData = {
              disposisi : JumDis - 1,
              notif : JumTif - 1
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${User.id}`] = PostData;
            return firebase.database().ref().update(updates);
          }

        });

        firebase.database().ref(`/notifikasi/${User.instansi_id}/${res.data.penerima}`).once('value').then(function(snapshot) {
          const JumDis = (snapshot.val() && snapshot.val().disposisi) || 0;
            const PostData = {
              disposisi : JumDis - 1,
            };
            const updates = {};
            updates[`/notifikasi/${User.instansi_id}/${res.data.penerima}`] = PostData;
            return firebase.database().ref().update(updates);
        });
      }
      history.push('/master-data/surat-masuk');
    }).catch(function (error) {
      console.log('tes')
    });
  }

  const ClickDelete = () => {
    Swal.fire({
      title: 'Anda yakin akan menghapus?',
      text: "Seluruh data tentang surat ini akan terhapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus Aja!!'
    }).then((result) => {
      if (result.value) {
        LakukanDelete();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }



  useEffect(() => {
    GetDataSurat();
  },[GetDataSurat])
  return (
    <CCard>
      <CCardBody>
        {
          Loading ? <h2 className='text-center'>Loading...</h2>:
            <CContainer fluid={true}>
              <ModalEditSuratMasuk Modal={Modal} TogleModal={TogleModal} Data={Data} GetDataSurat={GetDataSurat}/>
              <CRow>
                <CCol md={12}>
                  <CRow>
                    <CCol md={12}>
                      <h2 className='text-center header_surat' style={{marginBottom : 20}}>{Data.nomor_surat}</h2>
                    </CCol>
                  </CRow>
                  {
                    User.level === 1 ?
                      <CRow>
                        <CCol md={6}>
                          <CButton color="success" onClick={TogleModal} className='mb-2' variant="outline" shape="square" size="sm">Edit Surat</CButton>
                          <a href={Data.disposisi !== null ? `${process.env.REACT_APP_BASE_URL}/cetak-disposisi?slug=${slug}` : `#/master-data/surat-masuk/${slug}`} className='btn btn-sm btn-outline-dark mb-2 ml-2'>
                            {Data.disposisi !== null ? 'Cetak Disposisi' : 'Disposisi Belum Ada'}
                          </a>
                          <a href={Data.disposisi !== null ? `${process.env.REACT_APP_BASE_URL}/cetak-kartu?slug=${slug}` : `#/master-data/surat-masuk/${slug}`} className='btn btn-sm btn-outline-info mb-2 ml-2'>
                            {Data.disposisi !== null ? 'Cetak Kartu Kendali' : 'Disposisi Belum Ada'}
                          </a>
                        </CCol>
                        <CCol md={6}>
                          <CButton color="danger" onClick={ClickDelete} className='mb-2 float-right' variant="outline" shape="square" size="sm">Hapus</CButton>
                        </CCol>
                      </CRow> : null
                  }
                  <CRow style={{backgroundColor : '#e6f7ff'}}>
                    <CCol md={12}>
                      <table className='table table-borderless table-striped mt-2'>
                        <tbody className='detil_text'>

                        <tr>
                          <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>Nomor Surat</p></td>
                          <td>:</td>
                          <td>{Data.nomor_surat}</td>
                          <td>Tgl. Surat</td>
                          <td width='10px'>:</td>
                          <td>{moment(Data.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY')}</td>
                        </tr>
                        <tr>
                          <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>Asal Surat</p></td>
                          <td>:</td>
                          <td>{Data.asal_surat}</td>
                          <td>Tgl. Terima</td>
                          <td width='10px'>:</td>
                          <td>{moment(Data.tanggal_terima).locale('id').format('dddd, DD MMMM YYYY')}</td>
                        </tr>

                        <tr>
                          <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>Nomor Agenda</p></td>
                          <td>:</td>
                          <td>{Data.nomor_agenda}</td>
                          <td>Kategori</td>
                          <td width='10px'>:</td>
                          <td>{Data.kategori.nama_kategori}</td>
                        </tr>
                        <tr>
                          <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>Perihal Surat</p></td>
                          <td width='10px'>:</td>
                          <td colSpan={4}>{Data.perihal}</td>
                        </tr>
                        <tr>
                          <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>File Surat</p></td>
                          <td width='10px'>:</td>
                          <td colSpan={4}>
                            <table><tbody><tr>
                              {
                                Data.files.map((list, index)=>
                                  <td key={index} width='100px'>
                                    <a href={`${list.url}/${list.slug}.${list.extensi}`}>
                                      <img style={{'backgroundColor' : 'white'}} src={
                                        list.extensi === 'pdf' ?
                                          PdF
                                          :
                                          list.extensi === 'docx' || list.extensi === 'rtf' || list.extensi === 'doc' ?
                                            Word
                                            :
                                            list.extensi === 'xls' || list.extensi === 'xlsx' ?
                                              Excel
                                              :
                                              null
                                      } width="100%"/>
                                    </a>
                                  </td>
                                )
                              }
                            </tr></tbody></table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6}>
                            {
                              Data.disposisi !== null ?
                                <ul className="timelineses">
                                  <li>
                                    <section className="experience pt-100 pb-100" id="experience">
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-xl-8 mx-auto text-center">
                                            <div className="section-title">
                                              <p style={{fontSize : 20}}>Riwayat Catatan Disposisi</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-xl-12">
                                            <ul className="timeline-list">
                                              {
                                                Data.disposisi.penerima.map((penerima, indexPenerima) =>
                                                  <li key={indexPenerima}>
                                                    <div className="timeline_content">
                                                      <span>{moment(penerima.updated_at).locale('id').format('dddd, DD MMMM YYYY')}</span>
                                                      <h4>{penerima.id_penerima.name}</h4>
                                                      <p>{penerima.pesan}</p>
                                                    </div>
                                                  </li>
                                                )
                                              }
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </li>
                                </ul> : null
                            }
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </CCol>
                  </CRow>

                </CCol>
              </CRow>
            </CContainer>
        }
      </CCardBody>
    </CCard>
  );
}
const DetilSuratIn = React.memo(DetilSuratInKomponent);
export default withRouter(DetilSuratIn);
