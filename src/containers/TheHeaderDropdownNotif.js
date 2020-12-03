import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {
  CBadge,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {GlobalStateContext} from "../globalstate";

const TheHeaderDropdownNotif = () => {
  const {Notifikasi} = useContext(GlobalStateContext);
  const itemsCount = Notifikasi;
  return (
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
      >
          <CDropdownToggle as={Link} to={'/disposisi/saya'} className="c-header-nav-link" caret={false}>
            <CIcon name="cil-bell"/>
            <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
          </CDropdownToggle>
      </CDropdown>
  )
}

export default TheHeaderDropdownNotif
