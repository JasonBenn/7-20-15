import React from 'react';
import { Router, Route, Link } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import { SpiralDetailContainer } from './components/SpiralDetailContainer'
import { ThumbnailGridContainer } from './components/ThumbnailGridContainer'

import 'normalize.css'
import './styles/main.scss'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>spirals</h1>
        {this.props.children}
      </div>
    )
  }
}

React.render((
  <Router history={new BrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="spirals" component={ThumbnailGridContainer}>
        <Route path=":id" component={SpiralDetailContainer}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('main'))
