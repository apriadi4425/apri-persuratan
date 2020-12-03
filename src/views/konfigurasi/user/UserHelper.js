import axios from 'axios'

const UserHelper =  (SetData, SetLoading, details, setDetails, SetFormEdit) => {
  const User = JSON.parse(localStorage.getItem('user'));

  const GetData = async () => {
    SetLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      SetData(response.data)
    }).catch(error => {
      console.log(error);
    });
    SetLoading(false);
  };

  const UbahKeaktifan = (id, aktif) => {

    const ubahnya = {aktif : aktif};
    axios({
      method : 'put',
      url : `${process.env.REACT_APP_BASE_URL}/api/user-aktif/${id}`,
      data : ubahnya,
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`,
      }
    }).then(res => {
      GetData()
    }).catch(function (error) {
      console.log('error')
    });
  };

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

  const fields = [
    { key: 'name', _style: { width: '25%'} },
    { key: 'jabatan', _style: { width: '20%'} },
    { key: 'email', _style: { width: '25%'} },
    { key: 'telpon', _style: { width: '15%'} },
    { key: 'aktif', _style: { width: '5%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const fields2 = [
    { key: 'name', _style: { width: '25%'} },
    { key: 'jabatan', _style: { width: '20%'} },
    { key: 'email', _style: { width: '25%'} },
    { key: 'telpon', _style: { width: '15%'} },
    {
      key: 'show_details',
      label: 'Aksi',
      _style: { width: '1%' },
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 1: return 'success'
      case 2: return 'danger'
      default: return 'primary'
    }
  }
  const getAktif = (status)=>{
    switch (status) {
      case 1: return 'Aktif'
      case 2: return 'Tidak Aktif'
      default: return 'Tidak Aktif'
    }
  }

  const GetUserById = async (id, modal) => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user-edit/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      console.log(response.data)
      SetFormEdit(response.data);
      modal();
    }).catch(error => {
      console.log(error);
    });
  };


  return {GetData, toggleDetails, fields, getBadge, getAktif, UbahKeaktifan, GetUserById, fields2}
}

export default UserHelper;
