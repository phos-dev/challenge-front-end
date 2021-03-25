import React from 'react';
import Home from './pages/home/home.page.js';
import { Redirect, Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/page/1"/>
        <Route path='/page/:page' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
