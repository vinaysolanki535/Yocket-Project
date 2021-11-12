import React from 'react'
import './Home.css'
import Dashboard from './Dashboard'
import TaskDetails from './TaskDetails'

function Home() {
  return (
    <div className='home'>
      <Dashboard />
      <TaskDetails />
    </div>
  )
}

export default Home
