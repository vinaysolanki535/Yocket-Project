import React, { useEffect, useState } from 'react'
import './TaskList.css'
import Task from './Task'
import { db } from '../Database/Firebase'
import { useGlobalContext } from '../Components/Context'
import { useStateValue } from '../Components/StateProvider'

function TaskList() {
  const { taskType } = useGlobalContext()
  const [{ user }, dispatch] = useStateValue()
  const [snapShot, setSnapShot] = useState([])

  useEffect(() => {
    getAllTasks()
  }, [user, taskType])

  const getAllTasks = async () => {
    if (taskType === 'allTasks') {
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .orderBy('priority', 'desc')
        .onSnapshot((querySnapshot) => {
          setSnapShot(querySnapshot.docs)
        })
    } else if (taskType === 'completedTasks') {
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .orderBy('priority', 'desc')
        .where('status', '==', 'completed')
        .onSnapshot((querySnapshot) => {
          setSnapShot(querySnapshot.docs)
        })
    } else if (taskType === 'todaysTasks') {
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .where('dueDate', '<=', new Date())
        .onSnapshot((querySnapshot) => {
          setSnapShot(querySnapshot.docs)
        })
    } else if (taskType === 'dueTasks') {
      await db
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Tasks')
        .where('status', '==', 'notCompleted')
        .where('dueDate', '>=', new Date())
        .onSnapshot((querySnapshot) => {
          setSnapShot(querySnapshot.docs)
        })
    }
  }

  return (
    <div className='taskList'>
      {snapShot.map((val) => {
        // console.log(val.data().description)
        return (
          val != null && (
            <Task
              taskHeading={val.data().taskHeading}
              status={val.data().status}
              dueDate={val.data().dueDate}
              description={val.data().description}
              priority={val.data().priority}
              docId={val.id}
            />
          )
        )
      })}
    </div>
  )
}

export default TaskList
