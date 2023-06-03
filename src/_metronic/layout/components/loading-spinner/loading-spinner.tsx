import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loading = () => {
  return (
    <tr
      className='d-flex align-items-center justify-content-center'
      style={{height: '80vh', width: '80vw'}}
    >
      <Spinner as='td' animation='border' role='status'>
        <span className='sr-only'>Ma'lumotlar yuklanmoqda, biroz kuting</span>
      </Spinner>
    </tr>
  )
}

export default Loading
