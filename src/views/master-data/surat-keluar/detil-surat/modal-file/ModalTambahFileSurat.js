import React, {useState, useCallback} from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {useDropzone} from 'react-dropzone'
import axios from 'axios';

const ModalTambahFileSuratKomponent = ({ModalFile, TogleModalFile, Data, GetDataSurat}) => {
    const [Loading, setLoading] = useState(false);
    const [File, setFile] = useState({
        file : null,
        nama_file : ''
    })
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles[0].type === 'application/pdf'
        || acceptedFiles[0].type === 'application/msword'
        || acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        || acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || acceptedFiles[0].type === 'application/vnd.ms-excel'){
        setFile({...File, file : acceptedFiles[0], nama_file : acceptedFiles[0].name});
        }else{
        setFile({...File, file : 'error'});
        }
    }, [File]);


    const TambahFile = async () => {
        setLoading(true);
        const User = JSON.parse(localStorage.getItem('user'));
        const Instansi = JSON.parse(localStorage.getItem('instansi'));
        let bodyFormData = new FormData();
        bodyFormData.set('url', `${Instansi.url_server}/assets/file/surat-keluar`);
        bodyFormData.set('t_surat_keluar_id', Data.id);
        bodyFormData.set('nama_file', File.nama_file);
        bodyFormData.set('file', File.file);
        await axios({
          method : 'post',
          url : `${process.env.REACT_APP_BASE_URL}/api/file-surat-keluar`,
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
            url : `${Instansi.url_server}/upload/upload_file/surat-keluar`,
            data: bodyFormData,
            headers: {
              Accept: 'application/json',
            }
          }).then(res2 => {
            TogleModalFile();
            setFile({file : '', nama_file :''});
            GetDataSurat();
            setLoading(false);
          })
    
        }).catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    
      };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return(
        <CModal size='lg' show={ModalFile} onClose={TogleModalFile} closeOnBackdrop={false} color="info">
            <CModalHeader closeButton>
                <CModalTitle>Tambah File Surat</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <div {...getRootProps()} className='border-dark'>
                <input {...getInputProps()} />
                {
                    File.file === 'error' ?
                    <h1 className={'text-center text-danger'}>Format File tidak diperbolehkan</h1>
                    :
                    isDragActive ?
                        <h1 className={'text-center'}>..Lepaskan Sekarang!!</h1> :
                        File.file === '' || File.file === null ? <h1 className='text-center'>Klik atau taruh file surat disini!!</h1> : <h1 className={'text-center text-success'}>{File.nama_file}</h1>
                }
                </div>
           
            </CModalBody>
            <CModalFooter>
                <CButton type='submit' onClick={TambahFile} disabled={Loading || File.file === '' || File.file === null || File.file === 'error'} color={'info'}>{!Loading ? 'Tambah File' : 'Loading...'}</CButton>{' '}
                <CButton color="secondary" onClick={TogleModalFile}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const ModalTambahFileSurat = React.memo(ModalTambahFileSuratKomponent);
export default ModalTambahFileSurat;