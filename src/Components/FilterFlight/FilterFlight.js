import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions.js';

import classes from './FilterFlight.module.scss';

const FilterFlight = ({ filters, toggleFlightFilter }) => {
  return (
    <div className={classes.FilterFlight}>
      <ul>
        <li>
          <input
            type='radio'
            id='сheapestFlight'
            name='optionFlight'
            onChange={() => toggleFlightFilter('сheapestFlight')}
            checked={filters.сheapestFlight}
          />
          <label htmlFor='сheapestFlight'>САМЫЙ ДЕШЕВЫЙ</label>
        </li>
        <li>
          <input
            type='radio'
            id='fastestFlight'
            name='optionFlight'
            onChange={() => toggleFlightFilter('fastestFlight')}
            checked={filters.fastestFlight}
          />
          <label htmlFor='fastestFlight'>САМЫЙ БЫСТРЫЙ</label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filterFlight,
  };
};

export default connect(mapStateToProps, actions)(FilterFlight);
