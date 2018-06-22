import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Talks from './pages/Talks';
import Rooms from './pages/Rooms';

import routes from './router';

const App = () => (
  <Router>
    <div>
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.talks} component={Talks} />
      <Route exact path={routes.rooms} component={Rooms} />
    </div>
  </Router>
);

export default App;
