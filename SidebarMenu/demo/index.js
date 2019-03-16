import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';

import MainPanel from './pages/MainPanel';

import './styles/main.scss';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path='/' component={MainPanel} />
      </Switch>
    </main>
  );
};

ReactDOM.render(
  <HashRouter><App /></HashRouter>, 
  document.getElementById('app')
);

module.hot.accept();
