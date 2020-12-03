import React, {useState, createContext, useEffect, useCallback} from "react";
import firebase from './firebase';
import axios from "axios";
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({children}) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [Notifikasi, setNotifikasi] = useState(0);
  const [Notifikasi2, setNotifikasi2] = useState(0);
  const [DataNotifikasi2, seDatatNotifikasi2] = useState([]);
  const [Load, setLoad] = useState(false);

  const GetNotif =  useCallback(async () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/notif`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      setNotifikasi2(response.data.jumlah);
      seDatatNotifikasi2(response.data.data);
    }).catch(error => {
      console.log(error);
    });
    setLoad(false)
  },[]);

  const KirimNotif = async (token, Form) => {
    const NotifForm = {token : token, disposisi_id : Form.disposisi_id, urgensi : Form.urgensi};
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/kirim-notif`,
      data: NotifForm,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(res => {
      console.log('sukses');
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect( () => {
    setLoad(true);
    const jumDisposisi = firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}/disposisi`);
    jumDisposisi.on('value',   (snapshot) => {
      setNotifikasi(snapshot.val());
      if(User.level !== 1){
        setLoad(false)
      }
    });
    if(User.level === 1){
      const jumDisposisi = firebase.database().ref(`/notifikasi/${User.instansi_id}/${User.id}/notif`);
      jumDisposisi.on('value',   (snapshot) => {
        GetNotif();
      })
    }
  },[]);


  const GlobalState = {Notifikasi, Load, Notifikasi2, DataNotifikasi2, KirimNotif, GetNotif};
  return (
    <GlobalStateContext.Provider value={GlobalState}>
      {children}
    </GlobalStateContext.Provider>
  );

}
