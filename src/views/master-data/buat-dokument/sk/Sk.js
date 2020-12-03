import React, {useCallback, useEffect} from 'react';
import {CButton, CCard, CCardBody, CCardHeader, CCollapse, CDataTable} from "@coreui/react";
import {withRouter, Link} from 'react-router-dom';
import * as moment from "moment";
import SkHelpers from "./SkHelpers";
import ModalTambah from "./TambahSK/ModalTambah";
import ModalEdit from "./TambahSK/ModalEdit";
import ModalEditFile from "./TambahSK/ModalEditFile";

const Sk = ({history}) => {
  const {Data, fields, Loading, GetData, User, details, toggleDetails} = SkHelpers();

  const GetDataUser = useCallback(GetData, []);

  useEffect(() => {
    GetDataUser()
  },[GetDataUser, ]);

  return (
    <CCard>
      <CCardHeader>
        <div className="card-header-actions font-weight-bold">
          <ModalTambah history={history}/>
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
          sorter
          pagination
          scopedSlots = {{

            'milik':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {item.milik.nama}
                  </td>
                )
              },
            'created_at':
              (item, index) => {
                return (
                  <td className="py-2 font_for_surat_masuk">
                    {moment(item.created_at).format('dddd, DD MMMM YYYY')}
                  </td>
                )
              },
            'show_details':
              (item, index)=>{
                return (
                    <td className="py-2">
                        <CButton
                          as={Link}
                          to={`/buat-dokument/sk/${item.slug}/${item.id}/${item.instansi_id}`}
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          Buat
                        </CButton>

                      {
                        item.instansi_id === User.instansi_id ?
                          <CButton
                            color="warning"
                            variant="outline"
                            shape="square"
                            size="sm"
                            className='ml-2'
                            onClick={()=>{toggleDetails(index)}}
                          >
                            Edit
                          </CButton> : <a href={`${process.env.REACT_APP_BASE_URL}/template_sk/${item.filenya}`}>Download</a>
                      }
                    </td>
                )
              },
            'details':
              (item, index)=>{
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody><tr>
                          <td><a href={`${process.env.REACT_APP_BASE_URL}/template_sk/${item.filenya}`}>Download File</a><br/><br/></td>
                          <td><ModalEdit item={item} GetDataUser={GetDataUser}/></td>
                          <td><ModalEditFile item={item} GetDataUser={GetDataUser}/></td>
                        </tr></tbody>
                      </table>
                    </CCardBody>
                  </CCollapse>
                )
              }
          }}

        />
      </CCardBody>
    </CCard>
  )
};

export default withRouter(Sk);
