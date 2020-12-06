import React, { useState, useEffect, useCallback } from 'react';
import {CCard, CCardHeader, CCardBody, CContainer, CRow, CCol, CButton, CDataTable} from "@coreui/react";
import HelperRequestSurat from './HelperRequestSurat';
import '../StyleSurat.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import ModalTambahRequest from './modal-request/ModalTambahRequest';

const RequestSuratKomponent = () => {

    const [Data,  SetData] = useState([]);
    const [Loading,  SetLoading] = useState(false);
    const [Modal, setModal] = useState(false);

    const {GetData, fields} = HelperRequestSurat(SetData, SetLoading);
    

    const TogleModal = useCallback(() => {
      setModal(!Modal);
  },[Modal])


    useEffect(() => {
        GetData();
    }, [])
    return(
        <CCard>
            <ModalTambahRequest Modal={Modal} TogleModal={TogleModal} GetData={GetData}/>
            <CCardHeader>
                <span style={{color : 'black', fontWeight : 'bold', fontSize : 15}}>Request Nomor Surat</span>
                <div className="card-header-actions text-danger font-weight-bold">
                <CButton onClick={TogleModal} size="sm" className="btn-brand mr-2 mb-1"> <FontAwesomeIcon icon={faPlusSquare} size='lg'/></CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                <p style={{color : 'red', fontWeight : 'bold'}}>Ingat, suatu saat anda akan mencari arsip file surat, jadi silahkan request surat dan lampirkan filenya!</p>
                
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
          }}
        />
            </CCardBody>
        </CCard>
    )
}

const RequestSurat = React.memo(RequestSuratKomponent);
export default RequestSurat;