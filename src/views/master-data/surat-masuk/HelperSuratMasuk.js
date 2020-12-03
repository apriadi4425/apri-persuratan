
import axios from "axios";

const HelperSuratMasuk = (SetData, SetLoading, details, setDetails, lperihal, setPerihal) => {
  const User = JSON.parse(localStorage.getItem('user'));


  const GetData = async (Parameter) => {
    SetLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-masuk?tahun=${Parameter.tahun}&bulan=${Parameter.bulan}`, {
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

  const togglePerihal = (index) => {
    const position = lperihal.indexOf(index)
    let newPerihal = lperihal.slice()
    if (position !== -1) {
      newPerihal.splice(position, 1)
    } else {
      newPerihal = [...lperihal, index]
    }
    setPerihal(newPerihal)
  }

  const fields = [
    { key: 'nomor_agenda', label: 'No', _style: { width: '3%'} },
    { key: 'asal_surat', _style: { width: '7%'} },
    { key: 'nomor_surat', _style: { width: '7%'} },
    { key: 'tanggal_terima_indo', label: 'Tgl Terima', _style: { width: '8%'} },
    { key: 'tanggal_surat_indo', label: 'Tgl Surat',  _style: { width: '8%'} },
    { key: 'perihal', label: 'Tentang', _style: { width: '10%'} },
    { key: 'disposisi', label: 'Disposisi', _style: { width: '3%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  const getBadge = (status)=>{
    switch (status) {
      case 1: return ['danger', 'Belum']
      case 2: return ['warning', 'Proses']
      case 3: return ['success', 'Selesai']
      default: return ['primary', '??']
    }
  }

  return {GetData, toggleDetails, fields, togglePerihal, getBadge}
};

export default HelperSuratMasuk;
