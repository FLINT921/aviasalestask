import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions.js';

import classes from './FilterTransfers.module.scss';

const FilterTransfers = ({ filters, toggleTransferFilter }) => {
  return (
    <div className={classes.FilterTransfers}>
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <ul>
        <li>
          <input type='checkbox' id='all' className='custom-checkbox' onChange={() => toggleTransferFilter('all')} checked={filters.all} />
          <label htmlFor='all'>Все</label>
        </li>
        <li>
          <input type='checkbox' id='withoutTransfers' className='custom-checkbox' onChange={() => toggleTransferFilter('withoutTransfers')} checked={filters.withoutTransfers} />
          <label htmlFor='withoutTransfers'>Без пересадок</label>
        </li>
        <li>
          <input type='checkbox' id='oneTransfers' onChange={() => toggleTransferFilter('oneTransfers')} checked={filters.oneTransfers} />
          <label htmlFor='oneTransfers'>1 пересадка</label>
        </li>
        <li>
          <input type='checkbox' id='twoTransfers' onChange={() => toggleTransferFilter('twoTransfers')} checked={filters.twoTransfers} />
          <label htmlFor='twoTransfers'>2 пересадки</label>
        </li>
        <li>
          <input type='checkbox' id='threeTransfers' onChange={() => toggleTransferFilter('threeTransfers')} checked={filters.threeTransfers} />
          <label htmlFor='threeTransfers'>3 пересадки</label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filterTransfers,
  };
};

export default connect(mapStateToProps, actions)(FilterTransfers);
