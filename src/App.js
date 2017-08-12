import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers'
import ShowImages from './containers/ShowImages'
import history from './utils/history'

class App extends Component {
  render() {
    const routerMap = (
      <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/images/:id" component={ShowImages} /> 
          </Switch>
      </Router>
    )

    return routerMap
  }
}

export default App