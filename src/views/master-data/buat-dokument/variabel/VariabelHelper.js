import {useState} from 'react';
import axios from "axios";

const VariabelHelper = () => {
  const User = JSON.parse(localStorage.getItem('user'));

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

  const GetData = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/variabel`, {
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
  };

  const fields = [
    { key: 'nomor_variabel', label: 'Nomor Variabel', _style: { width: '20%'} },
    { key: 'nama_variabel', label: 'Nama Variabel', _style: { width: '20%'} },
    { key: 'default_value', label: 'Default Value', _style: { width: '20%'} },
    { key: 'tipe', label: 'Tipe Data', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    }
  ];

  return {Data, Loading, fields, GetData}
};

export default VariabelHelper;
