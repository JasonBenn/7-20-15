import React from 'react';
import { Router, Route, Link } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import { SpiralDetailContainer } from './components/SpiralDetailContainer'
import { ThumbnailGridContainer } from './components/ThumbnailGridContainer'
import { NotFound } from './components/NotFound'

import 'normalize.css'
import './styles/main.scss'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>spirals</h1>
        <Link to="/spirals">All Spirals</Link>
        {this.props.children}
      </div>
    )
  }
}

// path="/" should be App
React.render((
  <Router history={new BrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="spirals" component={ThumbnailGridContainer}>
        <Route path=":id" component={SpiralDetailContainer}/>
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('main'))
