import React, {useCallback, useEffect, useState} from 'react';
import {CCard, CCardBody} from "@coreui/react";
import './disposisi.css';
import axios from "axios";
import * as moment from 'moment';
import ModalTeruskanDisposisi from "./ModalTeruskanDisposisi";

const DisposisiSayaKomponent = (props) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Data, setData] = useState([]);
  const [Form, setForm] = useState({
    disposisi_id : '' ,  pesan : '', id_penerima : '', teruskan : ''
  });


  const HandleForm = useCallback((e) => {
      setForm({...Form, [e.target.name] : e.target.value})
  }, [Form]);


  const [Loading, setLoading] = useState(false);
  const [Modal, setModal] = useState(false);

  const ToggleModal = useCallback(() => {
    setModal(!Modal);
  },[Modal]);

  const SetForForm = async (disposisi_id) => {
    await setForm({...Form, disposisi_id : disposisi_id})
    ToggleModal();
  };

  const GetData = useCallback(async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/disposisi-saya`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setData(response.data)
    }).catch(error => {
      console.log(error);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    GetData()
  },[GetData]);


  return (
    <CCard>
      <ModalTeruskanDisposisi Modal={Modal} Form={Form} ToggleModal={ToggleModal} HandleForm={HandleForm} setForm={setForm} GetData={GetData}/>
      <CCardBody>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <h4>
                {
                  User.level === 2 ? 'List Disposisi Saya' : 'List Disposisi yang Belum Selesai'
                }
              </h4>
              {
                Loading ? <p className='text-center text-muted' style={{fontSize: 20}}>...Loading Data</p> :
                  <ul className="timelineses">
                    {
                      Data.map((list, index)=>
                        <li key={index}>
                          {
                            User.level === 2 ?
                              <p onClick={() => SetForForm(list.id)} className='text_title_disposisi'>{list.surat.nomor_surat}
                                <strong className={
                                  list.urgensi === 'Biasa' ? 'text-success' : 'text-danger'
                                } style={{fontSize:12}}>({list.urgensi}!)</strong></p>
                              : <p  className='text_title_disposisi'>{list.surat.nomor_surat}
                                <strong className={
                                  list.urgensi === 'Biasa' ? 'text-success' : 'text-danger'
                                } style={{fontSize:12}}>({list.urgensi}!)</strong></p>
                          }
                          <a href="#">{list.surat.asal_surat}</a>
                          <a href="#" className="float-right">{moment(list.created_at).locale('id').format('dddd, DD MMMM YYYY')}</a>
                          <br/>
                          {
                            list.surat.files.map((file,indexFile)=>
                              <p style={{marginTop : 0, marginBottom: 0}} key={indexFile}>File Surat {indexFile+1}: <a href={`${file.url}/${file.slug}.${file.extensi}`}>{file.nama_file}</a></p>
                            )
                          }
                          <p className='mt-2'>Perihal Surat : {list.surat.perihal}</p>


                          <section className="experience pt-100 pb-100" id="experience">
                            <div className="container">
                              <div className="row">
                                <div className="col-xl-8 mx-auto text-center">
                                  <div className="section-title">
                                    <h4>Riwayat Catatan Disposisi</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12">
                                  <ul className="timeline-list">
                                    {
                                      list.penerima.map((penerima, indexPenerima) =>
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
                      )
                    }
                  </ul>
              }
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
const DisposisiSaya = React.memo(DisposisiSayaKomponent);
export default DisposisiSaya;
