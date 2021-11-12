import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useStateValue } from './Components/StateProvider'
import { auth } from './Database/Firebase'
import Home from './Screens/Home'
import Bucket from './Screens/Bucket'

function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('The User Is >>>', authUser)

      if (authUser) {
        //the user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/bucket'>
            <Bucket />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
