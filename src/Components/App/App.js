import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';

import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
