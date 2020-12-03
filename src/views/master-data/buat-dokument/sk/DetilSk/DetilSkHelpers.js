import {useState} from 'react';
import axios from "axios";

const DetilSkHelpers = (slug, ) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Variabel, setVariabel] = useState([]);
  const [Form, setForm] = useState({nomor_variabel : '', isi : '', sk_list_id : ''});
  const [Loading, setLoading] = useState(false);


  const getData = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sk-variabel/${slug}/${User.instansi_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setVariabel(response.data)
      setLoading(false);
    }).catch(error => {
      console.log(error);
    });
    setForm({nomor_variabel : '', isi : '', sk_list_id : ''});
  }


  const UpdateForm = async (id) => {
    const DataForm = {id : id, isi : Form.isi}
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/update-isi-sk-variabel`,
      data: DataForm,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      getData();
    }).catch(function (error) {
      console.log('error')
    });
  };

  const SaveForm = async () => {
    setLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/isi-sk-variabel`,
      data: Form,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }
    }).then(res => {
      if(res.data.message === 'save'){
        UpdateForm(res.data.id)
      }else{
        getData();
      }
    }).catch(function (error) {
      console.log('error')
    });

  };

  const OnEnter = async (e) => {
    if(e.key === 'Enter'){
      await SaveForm();
    }
  }
  return {getData, Variabel, User,Form, setForm, OnEnter, Loading}
};

export default DetilSkHelpers;
