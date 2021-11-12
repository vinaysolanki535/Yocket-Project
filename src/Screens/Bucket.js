import React, { useEffect, useState } from 'react'
import './Bucket.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { db } from '../Database/Firebase'
import Task from './Task'
import { useStateValue } from '../Components/StateProvider'
import { useHistory } from 'react-router-dom'

function Bucket() {
  const [snapShot, setSnapShot] = useState([])
  const [{ user }, dispatch] = useStateValue()
  const history = useHistory()

  useEffect(() => {
    getAllBucketTasks()
  }, [])

  const getAllBucketTasks = async () => {
    await db
      .collection('Users')
      .doc(`${user.uid}`)
      .collection('Bucket')
      .onSnapshot((querySnapshot) => {
        setSnapShot(querySnapshot.docs)
      })
  }

  return (
    <div className='bucket'>
      <div className='bucketHeader'>
        <h2>Bucket List</h2>
        <KeyboardBackspaceIcon
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/home')}
        />
      </div>
      <div className='bucketTasks' style={{ marginTop: '30px' }}>
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
    </div>
  )
}

export default Bucket
