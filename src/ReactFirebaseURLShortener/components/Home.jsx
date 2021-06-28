import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RedirectPage from './RedirectPage'
import URL from './URL'

export default function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={URL}/>
        <Route exact path="/:id" component={RedirectPage}/>
      </Switch>
    </Router>
  )   
}