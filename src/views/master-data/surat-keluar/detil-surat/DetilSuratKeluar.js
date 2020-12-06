import React, {useState, useCallback, useEffect} from 'react';
import {CCard, CCardBody, CContainer, CRow, CCol, CButton} from "@coreui/react";
import {useParams} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../surat-masuk/detil-surat/detil.css';
import * as moment from 'moment';
import Swal from "sweetalert2";
import PdF from '../../../../assets/images/pdf.png';
import Word from '../../../../assets/images/word.png';
import Excel from '../../../../assets/images/excel.png';
import ModalEditSuratKeluar from './modal-edit/ModalEditSuratKeluar';
import ModalTambahFileSurat from './modal-file/ModalTambahFileSurat';
import ModalSuratPengantar from './modal-surat-pengantar/ModalSuratPengantar';
import ModalAmplop from './modal-amplop/ModalAmplop';

const DetilSuratKeluar = ({history}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Data, setData] = useState({});
    const [Loading, setLoading] = useState(true);
    const [LoadingHapus, setLoadingHapus] = useState(false);
    
    let { slug, action } = useParams();

    const [Modal, setModal] = useState(false);
    const [ModalFile, setModalFile] = useState(false);
    const [ModalSuratPengantarx, SetModalSuratPengantarx] = useState(false);
    const [ModalAmplopx, SetModalAmplopx] = useState(false);

    const TogleModal = useCallback(() => {
        setModal(!Modal);
    },[Modal])

    const TogleModalFile = useCallback(() => {
        setModalFile(!ModalFile);
    },[ModalFile])

    const TogleModalSuratPengantar = useCallback(() => {
      SetModalSuratPengantarx(!ModalSuratPengantarx);
    },[ModalSuratPengantarx])

    const TogleModalAmplopx = useCallback(() => {
      SetModalAmplopx(!ModalAmplopx);
    },[ModalAmplopx])


    const GetDataSurat = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-keluar-detil?slug=${slug}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${User.token}`
          }
        }).then(response => {
          setData(response.data);
        }).catch(error => {
            setData(false)
            console.log(error)
        });
        setLoading(false);
      },[slug]);

      useEffect(() => {
        GetDataSurat();
      },[])

     

      const LakukanDelete = async () => {
        await axios({
          method : 'delete',
          url : `${process.env.REACT_APP_BASE_URL}/api/surat-keluar`,
          data: {
            id_surat : Data.id,
          },
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
          if(action === 'surat-keluar'){
            history.push('/master-data/surat-keluar');
          }else{
            history.push('/master-data/request-surat');
          }
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

      
      const CobadeleteFile = (id, slug) => {
        Swal.fire({
          title: 'yakin ingin menghapus File?',
          text: "File akan terhapus permanent!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Hapus Aja!!'
        }).then((result) => {
          if (result.value) {
            HapusFileSurat(id, slug);
            Swal.fire(
              'Dihapus!',
              'File telah dihapus.',
              'success'
            )
          }
        })
      }

      

      const HapusFileSurat = async (id, slug) => {
        setLoadingHapus(true);
        const User = JSON.parse(localStorage.getItem('user'));
        const Instansi = JSON.parse(localStorage.getItem('instansi'));
        const FormData = {id : id};
        await axios({
          method : 'delete',
          url : `${process.env.REACT_APP_BASE_URL}/api/file-surat-keluar`,
          data: FormData,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
          if(res.data === 'sukses'){
            axios.get(`${Instansi.url_server}/upload/delete_file?path=surat-keluar&file=${slug}`,{
              headers: {
                Accept: 'application/json'
              }}
            ).then( async (res2) =>{
                await GetDataSurat();
                setLoadingHapus(false);
            }).catch((error) => {
                console.log(error)
            });
          }
        })
        
      };


      const TombolOtoritas = () => {
          return(
            <CRow>
                <CCol md={6}>
                    <CButton color="success" onClick={TogleModal} className='mb-2' variant="outline" shape="square" size="sm">Edit Surat</CButton>
                    <CButton color="info" onClick={TogleModalFile} className='mb-2 ml-2' variant="outline" shape="square" size="sm">Tambah File Surat</CButton>
                    <CButton color="primary" onClick={TogleModalSuratPengantar} className='mb-2 ml-2' variant="outline" shape="square" size="sm">Surat Pengantar</CButton>
                    <CButton color="warning" onClick={TogleModalAmplopx} className='mb-2 ml-2' variant="outline" shape="square" size="sm">Amplop</CButton>
                </CCol>
                <CCol md={6}>
                    <CButton color="danger" onClick={ClickDelete}  className='float-right' variant="outline" shape="square" size="sm">Hapus Surat</CButton>
                </CCol>
            </CRow>
          )
      }


    return(
        <CCard>
            <CCardBody>
                <CContainer fluid={true}>
                    {
                        Loading ? <h1 style={{textAlign : 'center'}}>Loading...</h1>:
                            Data.kategori ? 
                            <React.Fragment>
                                <ModalEditSuratKeluar Modal={Modal} TogleModal={TogleModal} Data={Data} GetDataSurat={GetDataSurat}/>
                                <ModalTambahFileSurat ModalFile={ModalFile} TogleModalFile={TogleModalFile} Data={Data} GetDataSurat={GetDataSurat}/>
                                <ModalSuratPengantar ModalSuratPengantarx={ModalSuratPengantarx} TogleModalSuratPengantar={TogleModalSuratPengantar} Data={Data}/>
                                <ModalAmplop ModalAmplopx={ModalAmplopx} TogleModalAmplopx={TogleModalAmplopx} Data={Data}/>
                              
                              {
                                User.level === 2 ?
                                  Data.status === 1 ? <span style={{color : 'red', fontWeight : 'bold'}}>Surat Belum di Aprove Admin</span>
                                  : null
                                : null
                              }
                              <h2 className='text-center header_surat' style={{marginBottom : 20}}>{Data.nomor_surat}</h2>
                            {
                                User.level === 1 ?
                                TombolOtoritas() : 
                                User.id === Data.user_id ?
                                TombolOtoritas() : 
                                null
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
                                     <td>{Data.asal}</td>
                                     <td>Tujuan Surat</td>
                                     <td width='10px'>:</td>
                                     <td>{Data.tujuan}</td>
                                     </tr>

                                     <tr>
                                     <td><p style={{marginTop : 0, marginBottom : 0, marginLeft :20}}>Nomor Urut</p></td>
                                     <td>:</td>
                                     <td>{Data.urutan}</td>
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
                                         
                                     </td>
                                     </tr>
                                     <tr>
                                         <td colSpan={6}>
                                         <table><tbody><tr>
                                         {
                                             Data.files.map((list, index)=>
                                             <td key={index} width='150px'>
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
                                                 {
                                                     list.nama_file
                                                 }<br/>
                                                 <CButton onClick={() => CobadeleteFile(list.id, `${list.slug}.${list.extensi}`)} disabled={LoadingHapus} className='btn-block mt-2' color="danger" shape="square" size="sm">{!LoadingHapus ? 'Hapus' : 'Loading...'}</CButton>
                                             </td>
                                             )
                                         }
                                         </tr></tbody></table>
                                         </td>
                                     </tr>
                                     </tbody>
                                 </table>
                                 </CCol>
                             </CRow>
                         </React.Fragment> :
                        <h1 style={{textAlign : 'center'}}>Data Tidak bisa didapatkan</h1>

                    }
                </CContainer>
            </CCardBody>
        </CCard>
    )
}

export default withRouter(DetilSuratKeluar);