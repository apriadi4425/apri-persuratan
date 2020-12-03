import React from 'react'
import TheAfterLayout from "./TheAfterLayout";
import {Redirect} from 'react-router-dom'
import {GlobalStateProvider} from "../globalstate";

const TheLayout = () => {

  return (
    localStorage.getItem('login') ?
      <GlobalStateProvider><TheAfterLayout/></GlobalStateProvider>:
      <Redirect to={'/login'}/>
  )
}

export default TheLayout
