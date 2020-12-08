import React, { useState, useEffect, useCallback } from 'react';
import {CCard, CCardHeader, CCardBody, CButton, CBadge, CDataTable} from "@coreui/react";
import HelperRequestSurat from './HelperRequestSurat';
import '../StyleSurat.css';
import { Link } from 'react-router-dom';
import ModalBokingNomorSurat from './modal-booking/ModalBokingNomorSurat';

const RequestSuratAdminKomponent = () => {

    const [Data,  SetData] = useState([]);
    const [Loading,  SetLoading] = useState(false);
    const [Modal, setModal] = useState(false);

    const {GetData, fields2} = HelperRequestSurat(SetData, SetLoading);
    

    const TogleModal = useCallback(() => {
      setModal(!Modal);
  },[Modal])


    useEffect(() => {
        GetData();
    }, [])
    return(
        <CCard>
            <ModalBokingNomorSurat Modal={Modal} TogleModal={TogleModal} GetData={GetData}/>
            <CCardHeader>
                <span style={{color : 'black', fontWeight : 'bold', fontSize : 15}}>List Request Nomor Surat</span>
                <div className="card-header-actions text-danger font-weight-bold">
                <CButton onClick={TogleModal} size="sm" color='primary' variant='outline' className="btn-brand mr-2 mb-1">
                    Booking Banyak Nomor Surat
                </CButton>
                </div>
            </CCardHeader>
            <CCardBody>                
                <CDataTable
                    items={Data}
                    fields={fields2}
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
                        'nomor_surat':
                        (item, index) => {
                            return (
                            <td className="py-2 font_for_surat_masuk">
                                <Link to={`/master-data/surat-keluar/${item.slug}/request-surat`}>
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
                        'file':
                        (item, index) => {
                            return (
                            <td className="py-2 font_for_surat_masuk text-center">
                                {
                                    item.files.length > 0 ? <CBadge style={{fontSize : 12 }} color={'success'}>File Ada ({item.files.length})</CBadge> : <CBadge  style={{fontSize : 12 }} color={'danger'}>Tidak Ada</CBadge>
                                }
                            </td>
                            )
                        },
                    }}
                    />
            </CCardBody>
        </CCard>
    )
}

const RequestSuratAdmin = React.memo(RequestSuratAdminKomponent);
export default RequestSuratAdmin;