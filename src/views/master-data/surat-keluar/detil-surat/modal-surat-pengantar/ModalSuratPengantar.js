import React, {useState, useCallback, useEffect} from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CCol} from "@coreui/react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from 'axios';

const ModalSuratPengantarKomponent = ({ModalSuratPengantarx, TogleModalSuratPengantar, Data}) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Loading, setLoading] = useState(false);
    const [Form, SetForm] = useState({
        tujuan : Data.tujuan,
        kota_tujuan : '',
        penanda_tangan : '',

    })
    const [ErrorGet, setErrorGet] = useState(false);
    const [Lists, setLists] = useState([]);
    const [addList, setAddList] = useState(false);
    const [FormLists, setFormLists] = useState({
      id_surat : Data.id, urutan : '', perihal : '', jumlah : '', keterangan : ''
    });

    const [ListEdit, setListEdit] = useState({
      id : '', urutan : '', perihal : '', jumlah : '', keterangan : ''
    })

    const [UserList, setUserList] = useState([]);

    const [LoadingTambah, SetLoadingTambah] = useState(false);
    const [LoadingEdit, SetLoadingEdit] = useState(false);
    const [LoadingDelete, SetLoadingDelete] = useState(false);
    
    const KlikCobaEdit = (item) => {
      setListEdit({id : item.id, perihal : item.perihal, urutan : item.urutan, jumlah : item.jumlah, keterangan : item.keterangan});
    }

    const get_user = async () => {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user-2`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${User.token}`
        }
      }).then(response => {
        setUserList(response.data)
      }).catch(error => {
        console.log(error)
      });
    }

    const get_cari_pengantar = async () => {
        setLoading(true);
        setErrorGet(false)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cari-data-surat-pengantar?nama=${Data.tujuan}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${User.token}`
          }
        }).then(response => {
          SetForm({...Form, penanda_tangan : response.data.data.penanda_tangan, tujuan : response.data.data.tujuan, kota_tujuan : response.data.data.kota_tujuan})
        }).catch(error => {
            setErrorGet(true)
        });
        setLoading(false);
      }



    const ValidasiKarakter = (e, parameter) => {
        const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
        if(parameter === 'perihal'){
          SetForm({...Form, parameter: filteredInput})
        }
        else{
          SetForm({...Form, [parameter]: filteredInput})
        }
    
      };

      const get_list_pengantar = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-list-pengantar?id_surat=${Data.id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${User.token}`
          }
        }).then(response => {
          setLists(response.data)
        }).catch(error => {
           console.log(error)
        });
      }

      useEffect(() => {
        get_list_pengantar();
        get_user();
      },[]);



      const TambahkanList = async () => {
        SetLoadingTambah(true);
        await axios({
          method : 'post',
          url : `${process.env.REACT_APP_BASE_URL}/api/add-list-pengantar`,
          data: FormLists,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
            get_list_pengantar();
            setFormLists({...FormLists, urutan : '', perihal : '', jumlah : '', keterangan : ''})
        }).catch(function (error) {
            alert('terjadi kesalahan')
        });
        setAddList(false);
        SetLoadingTambah(false);
      }

      const BatalkanTambahLists = () => {
        setAddList(false);
        setFormLists({...FormLists, urutan : '', perihal : '', jumlah : '', keterangan : ''})
      }

      const EditLists = async () => {
        SetLoadingEdit(true)
        await axios({
          method : 'put',
          url : `${process.env.REACT_APP_BASE_URL}/api/edit-list-pengantar`,
          data: ListEdit,
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
            get_list_pengantar();
            setListEdit({id : '', urutan : '', perihal : '', jumlah : '', keterangan : ''})
        }).catch(function (error) {
            alert('terjadi kesalahan')
        });
        SetLoadingEdit(false);
      }

      const LakukanDelete = async (id) => {
        SetLoadingDelete(true);
        await axios({
          method : 'delete',
          url : `${process.env.REACT_APP_BASE_URL}/api/delete-list-pengantar`,
          data: {
            id : id,
          },
          headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${User.token}`
          }
        }).then(res => {
          get_list_pengantar();
        }).catch(function (error) {
          console.log('tes')
        });
        SetLoadingDelete(false);
      }

    return (
        <CModal size='xl' show={ModalSuratPengantarx} onClose={TogleModalSuratPengantar} closeOnBackdrop={false} color="primary">
            <CModalHeader closeButton>
                <CModalTitle>Buat Surat Pengantar</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                  <CCol>
                    {
                      ErrorGet ? 
                      <span style={{color : 'red', fontWeight : 'bold'}}>
                        Data tidak ditemukan
                      </span> : null
                    }
                   
                    <CButton disabled={Loading} className={'float-right'} color="info" onClick={get_cari_pengantar}>{!Loading ? 'Ambil Data Sebelumnya' : 'Loading...'}</CButton>
                  </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <TextField label="Tujuan Surat"
                                    value={Form.tujuan}
                                    onChange={(e) => ValidasiKarakter(e, 'tujuan')}
                                    placeholder="Tujuan Surat"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                        />
                    </CCol>
                    <CCol md={6}>
                        <TextField label="Kota Tujuan"
                                    value={Form.kota_tujuan}
                                    onChange={(e) => ValidasiKarakter(e, 'kota_tujuan')}
                                    placeholder="Kota Tujuan"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                        />
                    </CCol>
          </CRow>
          <CRow>
            <CCol>
            <FormControl fullWidth margin='normal'>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Pilih Penerima
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={Form.penanda_tangan}
                  name='penanda_tangan'
                  placeholder="Tuliskan Catatan disposisi disini"
                  displayEmpty
                  onChange={(e) => {
                    SetForm({...Form, penanda_tangan : e.target.value});
                  }}
                >
                  <MenuItem value=''>
                    <em>Pilih Penanda Tangan</em>
                  </MenuItem>
                  {
                    UserList.map((list,index)=>
                      list.id !== User.id ? <MenuItem key={index} value={list.id}>{list.name} -- {list.jabatan}</MenuItem> : null
                    )
                  }
                </Select>
              </FormControl>
            </CCol>
          </CRow>
          <br/>
          <CRow>
            <CCol md={12}>
            <table className='table table-bordered'>
              <tbody>
              <tr>
                <td>No.</td>
                <td>Isi yang dikirim</td>
                <td width='10%'>Banyaknya</td>
                <td>Keterangan
                </td>
                <td width='15%'>
                <CButton color={addList ? 'secondary' : 'success'} onClick={() => setAddList(!addList)} className='btn-block btn-sm'>+ Tambah</CButton>
                </td>
              </tr>
              {
                Lists.map((list, index) => 
                  ListEdit.id === list.id ?
                  <tr key={index}>
                  <td>
                        <TextField value={ListEdit.urutan} onChange={(e) => setListEdit({...ListEdit, urutan : e.target.value})} placeholder="Nomor Huruf" style={{width : 50}}/>
                  </td>
                  <td>
                        <TextField fullWidth value={ListEdit.perihal} onChange={(e) => setListEdit({...ListEdit, perihal : e.target.value})} placeholder="Yang dikirim"  multiline rowsMax={10}/>
                  </td>
                  <td>
                        <TextField value={ListEdit.jumlah} onChange={(e) => setListEdit({...ListEdit, jumlah : e.target.value})} placeholder="Banyaknya"/>
                  </td>
                  <td>
                        <TextField fullWidth value={ListEdit.keterangan} onChange={(e) => setListEdit({...ListEdit, keterangan : e.target.value})} placeholder="Keterangan"  multiline rowsMax={10}/>
                  </td>
                    <td align={'center'}>
                      <CButton disabled={LoadingEdit} color={'success'} onClick={EditLists} className='btn-sm ml-2'>{!LoadingEdit ? 'Simpan Perubahan' : 'Loading...'}</CButton>
                    </td>
                  </tr> :
                  <tr key={index}>
                    <td>{list.urutan}</td>
                    <td>{list.perihal}</td>
                    <td>{list.jumlah}</td>
                    <td>{list.keterangan}</td>
                    <td align={'center'}>
                      <CButton color={'info'} onClick={() => KlikCobaEdit(list)} className='btn-sm ml-2'>Edit</CButton>
                      <CButton disabled={LoadingDelete} color={'danger'} onClick={() => LakukanDelete(list.id)} className='btn-sm ml-2'>{!LoadingDelete ? 'Delete' : 'Loading'}</CButton>
                    </td>
                  </tr>
                )
              }
              {
                addList ?
                <tr>
                  <td>
                        <TextField value={FormLists.urutan} onChange={(e) => setFormLists({...FormLists, urutan : e.target.value})} placeholder="Nomor Huruf" style={{width : 50}}/>
                  </td>
                  <td>
                        <TextField fullWidth value={FormLists.perihal} onChange={(e) => setFormLists({...FormLists, perihal : e.target.value})} placeholder="Yang dikirim"  multiline rowsMax={10}/>
                  </td>
                  <td>
                        <TextField value={FormLists.jumlah} onChange={(e) => setFormLists({...FormLists, jumlah : e.target.value})} placeholder="Banyaknya"/>
                  </td>
                  <td colSpan={2}>
                        <TextField fullWidth value={FormLists.keterangan} onChange={(e) => setFormLists({...FormLists, keterangan : e.target.value})} placeholder="Keterangan"  multiline rowsMax={10}/>
                  </td>
                </tr> : null
              }
              </tbody>
            </table>
            </CCol>
          </CRow>
            </CModalBody>
            <CModalFooter>
              {
                addList ? 
                <React.Fragment>
                  <CButton disabled={LoadingTambah} onClick={TambahkanList} color="success" >{!LoadingTambah ? 'Tambahkan' : 'Loading...'}</CButton>
                  <CButton onClick={BatalkanTambahLists} color="warning" >Batalkan</CButton>
                </React.Fragment>
                 : null
              }

                        <a href={Form.kota_tujuan === '' || Form.tujuan === '' ? '#/master-data/surat-keluar/' + Data.slug : `${process.env.REACT_APP_BASE_URL}/cetak-surat-pengantar?slug=${Data.slug}&tujuan=${Form.tujuan}&kota_tujuan=${Form.kota_tujuan}&nama=${Data.tujuan}&penanda_tangan=${Form.penanda_tangan}` } className={Form.kota_tujuan === '' || Form.tujuan === '' ? 'btn btn-secondary ml-2' : 'btn btn-primary ml-2'}>
                        {Form.kota_tujuan === '' || Form.tujuan === '' ? '#' : 'Cetak'}
                        </a>
                <CButton color="secondary" onClick={TogleModalSuratPengantar}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const ModalSuratPengantar = React.memo(ModalSuratPengantarKomponent);
export default ModalSuratPengantar;