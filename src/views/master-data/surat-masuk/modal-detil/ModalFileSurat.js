import React, {useCallback, useState} from 'react';
import {
  CButton, CModal,
  CModalBody, CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const ModalFileSuratKomponent = ({ModalFile, TogleModalFile, GetDataUser, Parameter, Form, SetForm}) => {
  
  const [Loading, setLoading] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles[0].type === 'application/pdf'
      || acceptedFiles[0].type === 'application/msword'
      || acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      || acceptedFiles[0].type === 'application/vnd.ms-excel'){
      SetForm({...Form, file : acceptedFiles[0], nama_file : acceptedFiles[0].name});
    }else{
      SetForm({...Form, file : 'error'});
    }
  }, [Form])

  const TambahFile = async () => {
    setLoading(true);
    const User = JSON.parse(localStorage.getItem('user'));
    const Instansi = JSON.parse(localStorage.getItem('instansi'));
    let bodyFormData = new FormData();
    bodyFormData.set('url', `${Instansi.url_server}/assets/file/surat-masuk`);
    bodyFormData.set('t_surat_masuk_id', Form.t_surat_masuk_id);
    bodyFormData.set('nama_file', Form.nama_file);
    bodyFormData.set('file', Form.file);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/file-surat-masuk`,
      data: bodyFormData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {

      bodyFormData.set('nama_file', `${res.data.data.slug}.${res.data.data.extensi}`);
      bodyFormData.set('token', `${Instansi.token}`);

      axios({
        method : 'post',
        url : `${Instansi.url_server}/upload/upload_file/surat-masuk`,
        data: bodyFormData,
        headers: {
          Accept: 'application/json',
        }
      }).then(res2 => {
        TogleModalFile();
        GetDataUser(Parameter);
        SetForm({t_surat_masuk_id : '', url : '', file : '', nama_file :''});
        setLoading(false);
      })

    }).catch(function (error) {
      console.log(error);
      setLoading(false);
    });

  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <CModal size='lg' show={ModalFile} onClose={() => TogleModalFile('')} closeOnBackdrop={false} color="primary">
      <CModalHeader closeButton>
        <CModalTitle>Tambah List SK Baru</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div {...getRootProps()} className='border-dark'>
          <input {...getInputProps()} />
          {
             Form.file === 'error' ?
               <h1 className={'text-center text-danger'}>Format File tidak diperbolehkan</h1>
               :
               isDragActive ?
                 <h1 className={'text-center'}>..Lepaskan Sekarang!!</h1> :
                 Form.file === '' || Form.file === null ? <h1 className='text-center'>Klik atau taruh file surat disini!!</h1> : <h1 className={'text-center text-success'}>{Form.nama_file}</h1>
          }
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" disabled={Loading} type='submit' onClick={TambahFile}>{Loading ? '...Loading' : 'Simpan'}</CButton>{' '}
        <CButton color="secondary" onClick={() => TogleModalFile('')}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
}
const ModalFileSurat = React.memo(ModalFileSuratKomponent);
export default ModalFileSurat;
