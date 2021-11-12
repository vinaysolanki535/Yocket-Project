import React from 'react'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader'
import DashboardCards from './DashboardCards'
import TaskList from './TaskList'
import AddTaskButton from './AddTaskButton'
import { useGlobalContext } from '../Components/Context'

function Dashboard() {
  const { taskType } = useGlobalContext()
  return (
    <div className='dashboard'>
      <DashboardHeader />
      <DashboardCards />
      <p
        style={{
          textAlign: 'center',
          fontSize: 'Medium',
        }}
      >
        {taskType}
      </p>
      <TaskList />
      <AddTaskButton />
    </div>
  )
}

export default Dashboard
