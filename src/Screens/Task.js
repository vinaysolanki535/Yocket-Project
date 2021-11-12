import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useGlobalContext } from '../Components/Context'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { db } from '../Database/Firebase'
import Edit_Modal from './Edit_Modal'
import './Task.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { IconButton } from '@material-ui/core'
import { useStateValue } from '../Components/StateProvider'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function Task({ taskHeading, status, dueDate, description, priority, docId }) {
  const [{ user }, dispatch] = useStateValue()
  const { details, setDetails } = useGlobalContext()
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const saveDetails = () => {
    setDetails({
      taskHeading: taskHeading,
      status: status,
      dueDate: dueDate.toString().substring(0, 15),
      description: description,
      priority: priority,
    })
  }

  const deleteTask = async () => {
    if (user) {
      await db
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(docId)
        .delete()
      console.log('Task deleted')
    }
  }

  const taskCompleted = async () => {
    if (user) {
      await db
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(docId)
        .update({
          status: 'completed',
        })
      console.log('Task completed')
    }
  }

  const addBucket = async () => {
    if (user) {
      const currentDate = Date.now()
      const deadline = new Date(dueDate)
      await db
        .collection('Users')
        .doc(user.uid)
        .collection('Bucket')
        .doc()
        .set({
          description: description,
          currentDate: currentDate,
          dueDate: deadline,
          taskHeading: taskHeading,
          priority: priority,
          status: status,
          uid: user.uid,
        })
      console.log('Task uploaded to bucket')
    }
  }

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Edit_Modal
              close={handleClose}
              taskHeadingValue={taskHeading}
              descriptionValue={description}
              priorityValue={priority}
              dueDateValue={dueDate.toString().substring(0, 15)}
              status={status}
              docId={docId}
            />
          </div>
        </Fade>
      </Modal>
      <div className='task'>
        <li className='taskLi'>
          <h4
            style={{
              color: 'rgb(139, 134, 232)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={saveDetails}
          >
            <div
              onClick={saveDetails}
              style={{
                background: `${status === 'completed' ? 'green' : '#FF7A59'}`,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                marginRight: '20px',
                marginTop: '5px',
                cursor: 'pointer',
              }}
            ></div>{' '}
            {taskHeading}
          </h4>
          <h4>{dueDate.toString().substring(0, 15)}</h4>
          <div className='taskLiIcons'>
            <IconButton
              aria-label='add to Bucket'
              style={{ color: 'Lightgreen' }}
            >
              <AddIcon fontSize='Medium' onClick={addBucket} />
            </IconButton>
            <IconButton
              aria-label='Edit Task'
              style={{ color: 'rgb(139, 134, 232)' }}
            >
              <EditIcon onClick={handleOpen} />
            </IconButton>
            <IconButton aria-label='delete' style={{ color: 'red' }}>
              <DeleteIcon onClick={deleteTask} />
            </IconButton>
            <IconButton aria-label='delete' style={{ color: 'green' }}>
              <CheckCircleOutlineIcon onClick={taskCompleted} />
            </IconButton>
          </div>
        </li>
      </div>
    </>
  )
}

export default Task
