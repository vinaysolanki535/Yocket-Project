import React from 'react'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useRef, useState } from 'react'
import { db, storageRef } from '../Database/Firebase'
import firebase from 'firebase'
import { useStateValue } from '../Components/StateProvider'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import './Edit_Modal.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  margin: {
    height: theme.spacing(3),
  },
}))

const marks = [
  {
    value: 0,
    label: 'Low',
  },

  {
    value: 50,
    label: 'Mid',
  },

  {
    value: 100,
    label: 'High',
  },
]

function valuetext(value) {
  return `${value}°C`
}

function Edit_Modal({
  taskHeadingValue,
  descriptionValue,
  priorityValue,
  close,
  status,
  docId,
  dueDateValue,
}) {
  const classes = useStyles()
  const [{ user }, dispatch] = useStateValue()
  const [description, setDescription] = useState(descriptionValue)
  const [dueDate, setDueDate] = useState(Date.now())
  const [taskHeading, setTaskHeading] = useState(taskHeadingValue)
  const [value, setValue] = useState(priorityValue)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const uploadImages = async (e) => {
    if (user) {
      const currentDate = Date.now()
      const deadline = new Date(dueDate)
      await db
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(docId)
        .update({
          description: description,
          dueDate: deadline,
          taskHeading: taskHeading,
          priority: value,
          status: status,
        })
      close()
      console.log('Task uploaded')
    }
  }

  return (
    <div className='editModal'>
      <h2 style={{ textAlign: 'center' }}>Edit Task</h2>
      <label>Task Heading</label>
      <input
        onChange={(e) => setTaskHeading(e.target.value)}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        value={taskHeading}
        type='text'
        placeholder='Type Task Heading'
      ></input>

      <label>Description</label>
      <input
        onChange={(e) => setDescription(e.target.value)}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        type='text'
        value={description}
        placeholder='Type Some Description'
      ></input>

      <label>Due Date</label>
      <input
        onChange={(e) => setDueDate(e.target.value)}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        type='date'
        value={dueDate}
        placeholder='   Give Due Date'
        id='outlined-basic'
        variant='outlined'
      ></input>

      <div className={classes.root}>
        <Typography id='discrete-slider-custom' gutterBottom>
          Set Priority
        </Typography>
        <Slider
          // defaultValue={20}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={1}
          valueLabelDisplay='auto'
          marks={marks}
          value={value}
          onChange={handleSliderChange}
        />
      </div>

      <Button onClick={uploadImages} variant='outlined'>
        Edit Task
      </Button>
      <p
        onClick={close}
        style={{
          textAlign: 'end',
          marginTop: '20px',
          color: 'red',
          cursor: 'pointer',
        }}
      >
        Close
      </p>
    </div>
  )
}

export default Edit_Modal
