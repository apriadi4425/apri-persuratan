import React, {useState, useEffect, useCallback}  from 'react';
import {CCard, CCardBody, CCardHeader, CDataTable, CBadge, CButton, CCollapse} from "@coreui/react";
import UserHelper from "./UserHelper";
import ModalTambah from "./tambah/ModalTambah";
import * as moment from 'moment';
import ModalEdit from "./edit/ModalEdit";
import ModalUbahPassword from "./ubah-password/ModalUbahPassword";

const User = () => {
  const UserSession = JSON.parse(localStorage.getItem('user'));
  const [Data,  SetData] = useState([]);
  const [Loading,  SetLoading] = useState(false);
  const [FormEdit, SetFormEdit] = useState({name : '', email : '', jabatan : '', telpon : ''});
  const [ErrorFormEdit, SetErrorFormEdit] = useState([]);

  const HandleFormEdit = useCallback((e) => {
    SetFormEdit({...FormEdit, [e.target.name] : e.target.value})
  },[FormEdit])

  const [modalEdit, setModalEdit] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const TogleModalEdit = useCallback(() => {
    setModalEdit(!modalEdit)
  },[modalEdit])

  const TogleModalPassword = useCallback(() => {
    setModalPassword(!modalPassword)
  },[modalPassword])
  const [details, setDetails] = useState([])

  const {GetData, toggleDetails, fields, getBadge, getAktif, UbahKeaktifan, GetUserById, fields2} = UserHelper(SetData, SetLoading, details, setDetails, SetFormEdit);
  const GetDataUser = useCallback(GetData, []);

  useEffect(() => {
    GetDataUser()
  },[GetDataUser])


  return (
    <CCard>
      <CCardHeader>

        Konfigurasi User Pengguna{' '}
        <div className="card-header-actions">
          {UserSession.level === 1 ?
            <ModalTambah GetDataUser={GetDataUser}/> : null
          }
          <ModalEdit GetDataUser={GetDataUser} SetErrorFormEdit={SetErrorFormEdit} ErrorFormEdit={ErrorFormEdit} FormEdit={FormEdit} modalEdit={modalEdit} TogleModalEdit={TogleModalEdit} HandleFormEdit={HandleFormEdit}/>
          <ModalUbahPassword modalPassword={modalPassword} TogleModalPassword={TogleModalPassword} FormEdit={FormEdit}/>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={Data}
          fields={UserSession.level === 1 ? fields : fields2}
          columnFilter={UserSession.level === 1}
          noItemsView={Loading ?  {noItems: '... Mengambil Data'} :  {noResults: 'Pencarian Tidak Ditemukan', noItems: 'Tidak Ada Data'}}
          loading={Loading}
          itemsPerPage={10}
          hover
          striped={true}
          sorter={UserSession.level === 1}
          pagination={UserSession.level === 1}
          scopedSlots = {{
            'aktif':
              (Data)=>(
                <td>
                  <CBadge color={getBadge(Data.aktif)}>
                    {getAktif(Data.aktif)}
                  </CBadge>
                </td>
              ),
            'show_details':
              (item, index)=>{
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={()=>{toggleDetails(index)}}
                    >
                      {details.includes(index) ? 'Sembunyikan' : 'Tampilkan'}
                    </CButton>
                  </td>
                )
              },
            'details':
              (item, index)=>{
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <h4>
                        {item.name}
                      </h4>
                      <p className="text-muted">dibuat sejak: {moment(item.tanggal_buat).locale('id').format('dddd, DD MMMM YYYY')}</p>

                      <CButton onClick={() => GetUserById(item.id, TogleModalEdit)} size="sm" color="info">
                        User Settings
                      </CButton>

                      <CButton className='ml-1' onClick={() => GetUserById(item.id, TogleModalPassword)} size="sm" color="warning">
                        Ubah Password
                      </CButton>
                      {UserSession.level === 1 ?
                        item.level === 2 ?
                          <CButton onClick={() => {UbahKeaktifan(item.id, item.aktif)}} size="sm" color={item.aktif === 1 ? 'danger' : 'success'} className="ml-1">
                            {
                              item.aktif === 1 ? 'Non Aktifkan' : 'Aktifkan'
                            }
                          </CButton> : null : null
                      }
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

export default User;
