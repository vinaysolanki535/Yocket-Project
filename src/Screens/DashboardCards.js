import React, { useState, useEffect } from 'react'
import './DashboardCards.css'
import { useGlobalContext } from '../Components/Context'
import { db } from '../Database/Firebase'
import { useStateValue } from '../Components/StateProvider'

function DashboardCards() {
  const { taskType, setTaskType } = useGlobalContext()
  const [{ user }, dispatch] = useStateValue()
  const [allTaskCount, setAllTaskCount] = useState(0)
  const [completedTasksCount, setCompletedTasksCount] = useState(0)
  const [dueTasksCount, setDueTasksCount] = useState(0)
  const [todaysTasksCount, setTodaysTasksCount] = useState(0)

  const getAllCount = async () => {
    await db
      .collection('Users')
      .doc(`${user.uid}`)
      .collection('Tasks')
      .get()
      .then((snap) => {
        setAllTaskCount(snap.size)
      })

    await db
      .collection('Users')
      .doc(`${user.uid}`)
      .collection('Tasks')
      .where('status', '==', 'completed')
      .get()
      .then((snap) => {
        setCompletedTasksCount(snap.size)
      })

    await db
      .collection('Users')
      .doc(`${user.uid}`)
      .collection('Tasks')
      .where('status', '==', 'notCompleted')
      .where('dueDate', '>=', new Date())
      .get()
      .then((snap) => {
        setDueTasksCount(snap.size)
      })

    await db
      .collection('Users')
      .doc(`${user.uid}`)
      .collection('Tasks')
      .where('dueDate', '<=', new Date())
      .get()
      .then((snap) => {
        setTodaysTasksCount(snap.size)
      })
  }

  useEffect(() => {
    getAllCount()
  }, [])

  const handleClick = async (task_Type) => {
    if (task_Type === 'allTasks') {
      setTaskType(task_Type)
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .get()
        .then((snap) => {
          setAllTaskCount(snap.size)
        })
    } else if (task_Type === 'completedTasks') {
      setTaskType(task_Type)
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .where('status', '==', 'completed')
        .get()
        .then((snap) => {
          setCompletedTasksCount(snap.size)
        })
    } else if (task_Type === 'dueTasks') {
      setTaskType(task_Type)
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .where('status', '==', 'notCompleted')
        .where('dueDate', '>=', new Date())
        .get()
        .then((snap) => {
          setDueTasksCount(snap.size)
        })
    } else if (task_Type === 'todaysTasks') {
      setTaskType(task_Type)
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .where('dueDate', '<=', new Date())
        .get()
        .then((snap) => {
          setTodaysTasksCount(snap.size)
        })
    }
  }

  return (
    <div className='dashboardCards'>
      <div className='dashboardCard' onClick={() => handleClick('allTasks')}>
        <h3>All Tasks</h3>
        <h2>{allTaskCount}</h2>
      </div>
      <div
        className='dashboardCard'
        onClick={() => handleClick('completedTasks')}
      >
        <h3>Completed Tasks</h3>
        <h2>{completedTasksCount}</h2>
      </div>
      <div className='dashboardCard' onClick={() => handleClick('dueTasks')}>
        <h3>Due Tasks</h3>
        <h2> {dueTasksCount} </h2>
      </div>
      <div className='dashboardCard' onClick={() => handleClick('todaysTasks')}>
        <h3> Todays Task </h3>
        <h2>{todaysTasksCount}</h2>
      </div>
    </div>
  )
}

export default DashboardCards
