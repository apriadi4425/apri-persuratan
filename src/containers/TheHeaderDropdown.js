import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { withRouter } from 'react-router-dom';

import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = ({history}) => {
  const Instansi = JSON.parse(localStorage.getItem('instansi'));
  const CobaLogout = () => {
    localStorage.clear();
    history.push('/login');
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={`${process.env.REACT_APP_BASE_URL}/logo/${Instansi.logo}`}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={CobaLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
            Logouts
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default withRouter(TheHeaderDropdown)
