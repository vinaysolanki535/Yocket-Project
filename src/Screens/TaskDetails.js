import React from 'react'
import './TaskDetails.css'
import { useStateValue } from '../Components/StateProvider'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import { useGlobalContext } from '../Components/Context'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginTop: '30px',
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
  return `${value}`
}

function TaskDetails() {
  const classes = useStyles()
  const [{ user }, dispatch] = useStateValue()
  const { details } = useGlobalContext()
  return (
    <div className='taskDetails'>
      <div className='taskDetailsHeader'>
        <h1 style={{ marginBottom: '30px' }}>Task Details</h1>
        <h1>{details.taskHeading}</h1>
        <h5 style={{ marginTop: '20px' }}>Due Date : {details.dueDate}</h5>
      </div>
      {/* <div className='detailDescription'>
        <h3 style={{ marginBottom: '20px' }}>Description : </h3>
        <p>{details.decription}</p>
      </div> */}
      <div className='detailsPriority'>
        <div className={classes.root}>
          <Typography id='discrete-slider-custom' gutterBottom>
            Priority
          </Typography>
          <Slider
            // defaultValue={20}
            getAriaValueText={valuetext}
            aria-labelledby='discrete-slider-custom'
            step={1}
            valueLabelDisplay='auto'
            marks={marks}
            value={details.priority}
          />
        </div>
        <div className='detailsStatus'>
          <h3>Task {details.status}</h3>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
