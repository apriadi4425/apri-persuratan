import React from 'react';
import RequestSuratAdmin from './RequestAdmin';
import RequestSuratUser from './RequestUser';

const RequestSuratKomponent = () => {
  const User = JSON.parse(localStorage.getItem('user'));

  return(
    User.level === 1 ? <RequestSuratAdmin/> : <RequestSuratUser/>
  )
}

const RequestSurat = React.memo(RequestSuratKomponent);
export default RequestSurat;