import axios from "axios";

const HelperSuratKeluar = (SetData, SetLoading) => {
  const User = JSON.parse(localStorage.getItem('user'));

  const GetData = async (Parameter) => {
    SetLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-keluar?tahun=${Parameter.tahun}&bulan=${Parameter.bulan}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${User.token}`
      }
    }).then(response => {
      SetData(response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error);
    });
    SetLoading(false);
  };

  const fields = [
    { key: 'urutan', label: 'No', _style: { width: '1%'} },
    { key: 'nomor_surat', _style: { width: '4%'} },
    { key: 'asal', _style: { width: '10%'} },
    { key: 'tujuan', _style: { width: '8%'} },
    { key: 'tanggal_surat_indo', label: 'Tgl Surat',  _style: { width: '7%'} },
    { key: 'perihal', label: 'Tentang', _style: { width: '12%'} },
  ]

  return {GetData, fields}
};

export default HelperSuratKeluar;
