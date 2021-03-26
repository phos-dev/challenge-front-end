import React from 'react';
import Home from './pages/home/home.page.js';
import { Redirect, Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/page/1"/>
        <Route path='/page/:page' render={props => {
          const page = parseInt(props.match.params.page);
          return  (page <= 10 && page >= 1) ? <Home {...props}/> : <Redirect to="/page/1"/>
        }}/>
      </Switch>
    </div>
  );
}

export default App;
