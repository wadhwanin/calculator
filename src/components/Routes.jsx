import React from 'react';
import Home from './Home';
import InputLookUp from '../container/InputLookUp';
import Welcome from './Welcome';
import Output  from '../container/Output';
import Budget  from '../container/Budget';

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} >
      <IndexRoute component={Welcome} />
      <Route path="inputlookup" component={InputLookUp} />
      <Route path="output" component={Output} />
      <Route path="budget" component={Budget} />
    </Route>
  </Router> 
);

export default Routes;