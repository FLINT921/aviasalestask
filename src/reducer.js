import { combineReducers } from 'redux';
export const filterTransfers = (
  state = { all: true, withoutTransfers: true, oneTransfers: true, twoTransfers: true, threeTransfers: true },
  action,
) => {
  switch (action.type) {
    case 'TOGGLE_TRANSFER_FILTER':
      const newState = { ...state, [action.payload]: !state[action.payload] };
      if (action.payload !== 'all') {
        newState.all =
          newState.withoutTransfers && newState.oneTransfers && newState.twoTransfers && newState.threeTransfers;
      } else {
        newState.withoutTransfers =
          newState.oneTransfers =
          newState.twoTransfers =
          newState.threeTransfers =
            newState.all;
      }
      return newState;
    default:
      return state;
  }
};

export const filterFlight = (state = { сheapestFlight: true, fastestFlight: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_FLIGHT_FILTER':
      const newState = { сheapestFlight: false, fastestFlight: false, [action.payload]: true };
      return newState;
    default:
      return state;
  }
};

export const searchId = (state = '', action) => {
  switch (action.type) {
    case 'FETCH_SEARCHID_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export const fetchTicketsSuccess = (state = { data: [], loading: true, error: null }, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case 'FETCH_TICKETS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  filterTransfers,
  filterFlight,
  fetchTicketsSuccess,
});

export default rootReducer;
