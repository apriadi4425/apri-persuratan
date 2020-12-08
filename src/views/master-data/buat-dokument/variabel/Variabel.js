import React, {useCallback, useEffect, useState} from 'react';
import {CButton, CCard, CCardBody, CCardHeader, CDataTable} from "@coreui/react";
import VariabelHelper from "./VariabelHelper";
import ModalEditVariabel from "./ModalEditVariabel";

const VariabelKomponent = (props) => {
  const {Data, Loading, fields, GetData} = VariabelHelper();

  const [Modal, setModal] = useState(false);
  const [LoadingS, setLoadingS] = useState(false);
  const [Form, setForm] = useState({id : '', nomor_variabel : '', nama_variabel : '', tipe : '', default_value : ''});
  const TogleModal = async (item) => {
    await setForm({id : item.id, nomor_variabel : item.nomor_variabel, nama_variabel : item.nama_variabel, tipe : item.tipe, default_value : item.default_value})
    await setModal(!Modal);
  }


  const GgetData = useCallback(() => GetData(), []);
  useEffect(() => {GgetData()}, [GgetData]);
  return (
    <CCard>
      <ModalEditVariabel Modal={Modal} LoadingS={LoadingS} setForm={setForm} setModal={setModal} Form={Form} setLoadingS={setLoadingS} GgetData={GgetData}/>
      <CCardHeader>
        <div className="card-header-actions font-weight-bold">
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
            'show_details':
              (item, index)=>{
                return (
                  <td className="py-2">
                        <CButton
                          color="warning"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className='ml-2'
                          onClick={() => TogleModal(item)}
                        >
                          Edit
                        </CButton>
                  </td>
                )
              },
          }}

        />
      </CCardBody>
    </CCard>
  );
}
const Variabel = React.memo(VariabelKomponent);
export default Variabel;
