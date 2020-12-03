import {useState, useEffect, useCallback} from 'react'
import axios from 'axios';

const FormHelper = () => {

  const [Form, SetForm] = useState({nama : '', alamat : '', kota : '', telpon : '', email : '', website : '', kode_pos : '', kode_surat : '', url_server : ''});
  const [Valid, SetValid] = useState({nama : null, alamat : null, kota : null, telpon : null, email : null, website : null, kode_pos : null, kode_surat : null, url_server : null});
  const [Loading, SetLoading] = useState(true);
  const [NotifEnter, SetNotifEnter] = useState(false);

  const HandleForm = (e) => {
    SetForm({...Form, [e.target.name] : e.target.value});
    SetValid({nama : null, alamat : null, kota : null, telpon : null, email : null, website : null, kode_pos : null, kode_surat : null, url_server : null});
    SetNotifEnter(true);
  };


  const PanggilData = useCallback(async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    console.log(User)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/instansi`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
        SetForm(response.data)
    }).catch(error => {
        console.log(error);
    });
        SetLoading(false)
  }, [])

  useEffect( () => {
    PanggilData()
  },[PanggilData]);

  const SaveData = (e) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const NameField = e.target.name;
    const FormUpdate = {
      [NameField] : e.target.value
    }
    axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/instansi/${User.instansi_id}`,
      data : FormUpdate,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`,
      }
    }).then(res => {
      SetValid({...Valid, [NameField] : true})
      SetNotifEnter(false);
    }).catch(function (error) {
      console.log('error')
    });
  }

  const CobaSaveData = (e) => {
    if(e.key === 'Enter'){
      SaveData(e)
    }
  }

  return {Form, HandleForm, Loading, CobaSaveData, Valid, NotifEnter}
}

export default FormHelper;
