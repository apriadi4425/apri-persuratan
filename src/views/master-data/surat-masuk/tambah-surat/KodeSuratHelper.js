import {createFilterOptions} from "@material-ui/lab/";
import axios from 'axios';
const filter = createFilterOptions();

export const GetKategoriSurat = (Set) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/kategori-surat`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      Set(res.data)
    });
};

export const getOptionLabel = (option, SetKategoriSurat) => {

  const User = JSON.parse(localStorage.getItem('user'));
  // Value selected with enter, right from the input
  if (typeof option === 'string') {
    return option;
  }
  // Untuk Menambahkan Kode Surat.............................
  if (option.inputValue) {
    let DataForm = {
      nama_kategori : option.inputValue
    };
    axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/kategori-surat`,
      data: DataForm,
      headers: {
        Accept: 'application/json',
        Authorization : 'Bearer '.concat(User.token)
      }
    }).then(res => {
      GetKategoriSurat(SetKategoriSurat);
    })
    return option.inputValue;
  }
  // Regular option
  return option.nama_kategori;
}

export const filterOptions = (options, params) => {

  const filtered = filter(options, params);

  // Suggest the creation of a new value
  if (params.inputValue !== '') {
    filtered.push({
      inputValue: params.inputValue,
      nama_kategori: `Tambahkan "${params.inputValue}"`,
    });
  }

  return filtered;
};
