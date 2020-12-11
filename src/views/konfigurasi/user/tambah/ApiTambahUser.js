import {useState} from "react";
import axios from 'axios';
import firebase from "../../../../firebase";

const ApiTambahUser = (GetDataUser) => {

  const [Form, SetForm] = useState({name : '', email : '', jabatan : '', telpon : '', password : '', c_password :''});
  const [Error, SetError] = useState({});
  const [ButtonForm, setButtonForm] = useState(false);
  const [modal, setModal] = useState(false);
  const TogleModal = () => {
    setModal(!modal)
  };

  const HandleForm = (e) => {
    SetForm({...Form, [e.target.name] : e.target.value});
  };

  const apiData = async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    setButtonForm(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/register`,
      data: Form,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then(res => {
      const PostData = {
        disposisi : 0
      };

      var updates = {};
      updates[`/notifikasi/${res.data.success.instansi_id}/${res.data.success.id}`] = PostData;
      return firebase.database().ref().update(updates).then(res =>{
        TogleModal()
        GetDataUser();
        SetForm({name : '', email : '', jabatan : '', telpon : '', password : '', c_password :''})
      });
    }).catch(function (error) {
      if (error.response) {
        if(error.response.status === 400){
          SetError(error.response.data.error);
        }else{
          console.log(error.response.status)
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
    setButtonForm(false)
  }

  return {Form, Error, HandleForm, apiData, modal, TogleModal, ButtonForm}
}

export default ApiTambahUser
