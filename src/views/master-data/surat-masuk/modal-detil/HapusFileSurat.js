import axios from "axios";

const HapusFileSurat = async (id, slug,  GetDataUser, Parameter) => {
  const User = JSON.parse(localStorage.getItem('user'));
  const Instansi = JSON.parse(localStorage.getItem('instansi'));
  const FormData = {id : id};
  await axios({
    method : 'delete',
    url : `${process.env.REACT_APP_BASE_URL}/api/file-surat-masuk`,
    data: FormData,
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }
  }).then(res => {
    if(res.data === 'sukses'){
      axios.get(`${Instansi.url_server}/upload/delete_file?path=surat-masuk&file=${slug}`,{
        headers: {
          Accept: 'application/json'
        }}
      ).then((res2) =>{
        GetDataUser(Parameter)
      });
    }
  })
};

export default HapusFileSurat;
