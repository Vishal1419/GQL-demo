import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './scenes/dashboard/Dashboard';

import Natures from './scenes/masters/groups/Natures';

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/natures" component={Natures} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
      {/* <Dialogs /> */}
    </Fragment>
  </BrowserRouter>
);

export default Routes;
