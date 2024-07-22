import React from 'react';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.Header}>
      <span className={classes.logo}></span>
    </div>
  );
};

export default Header;
