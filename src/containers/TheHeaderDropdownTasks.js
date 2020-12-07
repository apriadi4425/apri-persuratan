import React, {useContext} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {GlobalStateContext} from "../globalstate";

const TheHeaderDropdownTasks = () => {
  const {Notifikasi2} = useContext(GlobalStateContext);
  const itemsCount = Notifikasi2;
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-list" />
        <CBadge shape="pill" color="warning">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} pending tasks</strong>
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownTasks
