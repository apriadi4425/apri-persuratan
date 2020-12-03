import axios from "axios";

export const SaranNomorAgenda = (TglTerima, SetSaranNomorAgenda) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-nomor-agenda?metode=get_nomor_agenda&tanggal_terima=${TglTerima}`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      SetSaranNomorAgenda(`Saran Penggunaan Nomor Agenda : ${res.data.nomor_agenda + 1}`);
    });

}

export const CekNomorAgenda = (Form, TglTerima, Error, SetError) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-nomor-agenda?metode=cek_nomor_agenda&nomor_agenda=${Form.nomor_agenda}&tanggal_terima=${TglTerima}`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      if(res.data > 0){
        console.log('error')
        SetError({...Error, error_nomor_agenda: true})
      }
    });

}


