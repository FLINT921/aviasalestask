import React from 'react';

import FilterTransfers from '../FilterTransfers/FilterTransfers';
import FilterFlight from '../FilterFlight/FilterFlight';
import Ticket from '../Ticket/Ticket';

import classes from './Main.module.scss';

const Main = () => {
  return (
    <div className={classes.Main}>
      <FilterTransfers />
      <FilterFlight />
      <Ticket />
    </div>
  );
};

export default Main;
