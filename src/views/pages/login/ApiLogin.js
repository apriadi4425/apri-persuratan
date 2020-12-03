import {useState, useCallback} from 'react';
import axios from 'axios';

const ApiLogin = (history) => {
  const [Form, SetForm] = useState({
    email : '', password : ''
  });

  const [Error, SetError] = useState([]);
  const [Loading, SetLoading] = useState(false);

  const HandleForm = (e, param) => {
    SetError([])
    if(param === 'email'){
      SetForm({...Form, email: e.target.value})
    }else{
      SetForm({...Form, password: e.target.value})
    }
  }

  const CobaLogin = useCallback( () => {
    SetLoading(true);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/api/login`,
      data: Form,
      config: { headers: {
          'Accept': 'application/json'
        }}
    }).then(res => {
      localStorage.setItem('login', true);
      localStorage.setItem('user', JSON.stringify(res.data.success));
      localStorage.setItem('instansi', JSON.stringify(res.data.instansi));
      history.push('/')
    }).catch(function (error) {
      if(error.response){
        SetError(error.response.data)
      }
      SetLoading(false);
    });

  },[Form, history])

  return {CobaLogin, Form, HandleForm, Error, SetError, Loading}
}

export default ApiLogin;
