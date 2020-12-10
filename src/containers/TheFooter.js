import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://apriadi-94.surge,sh" target="_blank" rel="noopener noreferrer">@copyright Apriadi, S.Si</a>
        <span className="ml-1">&copy; UpToTech.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Terimakasih Untuk</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
