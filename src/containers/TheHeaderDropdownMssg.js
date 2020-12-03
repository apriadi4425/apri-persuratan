import React, {useContext} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {GlobalStateContext} from "../globalstate";
import {Link} from "react-router-dom";
import axios from 'axios';

const TheHeaderDropdownMssg = () => {
    const {Notifikasi2, DataNotifikasi2, GetNotif} = useContext(GlobalStateContext);
    const itemsCount = Notifikasi2;

    const SudahDibaca = () => {
      const User = JSON.parse(localStorage.getItem('user'));
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/sudah-dibaca`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${User.token}`
        }
      }).then(response => {
        GetNotif();
      }).catch(error => {
        console.log(error)
      });
    }


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>{itemsCount} Pesan Aktivitas</strong>
        </CDropdownItem>
        {
          DataNotifikasi2.map((list, index) =>
            <CDropdownItem key={index} href="#">
              <div className="message">
              <Link to={`/master-data/surat-masuk/${list.slug}`}>
                  <div>
                    <small className="text-muted">{list.pelaku_nama}</small>
                    <small className="text-muted float-right mt-1">Just now</small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span> {list.nomor_surat}
                    <span style={{fontSize : 8, marginLeft : 10}}>({list.asal_surat})</span>
                  </div>
                  <div className="small text-muted text-truncate" style={{width : '100%'}}>
                    {list.pesan}
                  </div>
              </Link>
              </div>
            </CDropdownItem>
          )
        }
        {
          DataNotifikasi2.length > 0 ? <CDropdownItem href="#" onClick={()=>SudahDibaca()} className="text-center border-top"><strong>Sudah Saya Baca Semua</strong></CDropdownItem> : null

        }
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
