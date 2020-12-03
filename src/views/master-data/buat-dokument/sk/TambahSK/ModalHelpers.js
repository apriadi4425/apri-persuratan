import {useState} from 'react';
import axios from "axios";

const ModalHelpers = (setModal, history) => {
  const User = JSON.parse(localStorage.getItem('user'));

  const [Form, SetForm] = useState({nama_sk : '', file : ''});
  const [Loading, SetLoading] = useState(false);
  const [Error, SetError] = useState([]);

  const SaveData = async () => {
    SetLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.set('nama_sk', Form.nama_sk);
    bodyFormData.set('file', Form.file);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/add-sk-list`,
      data: bodyFormData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      history.push(`/buat-dokument/sk/${res.data.slug}/${res.data.id}/${res.data.instansi_id}`)
    }).catch(function (error) {
      SetError(error.response.data.error);
    });

    SetLoading(false);
  };
  return {Form, SetForm, Loading, SaveData, Error}
};

export default ModalHelpers;
