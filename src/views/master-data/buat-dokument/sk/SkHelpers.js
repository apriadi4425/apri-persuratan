import {useState} from 'react';
import axios from "axios";

const SkHelpers = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [details, setDetails] = useState([])
  const User = JSON.parse(localStorage.getItem('user'));


  const GetData = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sk-list`, {
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
    { key: 'nama_sk', label: 'Nama SK', _style: { width: '50%'} },
    { key: 'created_at', label: 'Tgl. Dibuat', filter: false, sorter: false, _style: { width: '20%'} },
    { key: 'milik', label: 'Pembuat SK', filter: false, sorter: false, _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    }
  ]

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  return {Data, fields, Loading, GetData, User, details, toggleDetails}
};

export default SkHelpers;
