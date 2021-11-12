import React, { useState, useEffect } from 'react'
import './DashboardHeader.css'
import Button from '@material-ui/core/Button'
import { useGlobalContext } from '../Components/Context'
import { useHistory } from 'react-router-dom'

function DashboardHeader() {
  const { userName } = useGlobalContext()
  const history = useHistory()
  return (
    <div className='dashboardHeader'>
      <div className='headerLeft'>
        <h1>Dashboard</h1>
        <h4>Hello {userName} Welcome</h4>
      </div>
      <div className='headerRight'>
        <Button
          variant='contained'
          style={{ backgroundColor: 'rgb(96,77,195)', color: 'white' }}
          onClick={() => history.push('/bucket')}
        >
          Bucket
        </Button>
      </div>
    </div>
  )
}

export default DashboardHeader
