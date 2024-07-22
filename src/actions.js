export const toggleTransferFilter = (filter) => ({
  type: 'TOGGLE_TRANSFER_FILTER',
  payload: filter,
});

export const toggleFlightFilter = (filter) => ({
  type: 'TOGGLE_FLIGHT_FILTER',
  payload: filter,
});

export const getSearchId = () => {
  const _apiBase = 'https://aviasales-test-api.kata.academy/search';

  return async (dispatch) => {
    try {
      const response = await fetch(`${_apiBase}`);
      if (!response.ok) {
        throw new Error(`Could not fetch, received ${response.status}`);
      }
      const data = await response.json();
      dispatch({
        type: 'FETCH_SEARCHID_SUCCESS',
        payload: data.searchId,
      });
      dispatch(getTicket(data.searchId));
    } catch (error) {
      dispatch({
        type: 'FETCH_TICKETS_FAILURE',
        payload: error.message,
      });
    }
  };
};

export const getTicket = (searchId) => {
  const _apiBase = 'https://aviasales-test-api.kata.academy/tickets?searchId=';

  return async (dispatch) => {
    try {
      const response = await fetch(`${_apiBase}${searchId}`);
      if (!response.ok) {
        throw new Error(`Could not fetch ${_apiBase}${searchId}, received ${response.status}`);
      }
      const data = await response.json();
      dispatch({
        type: 'FETCH_TICKETS_SUCCESS',
        payload: data.tickets,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_TICKETS_FAILURE',
        payload: error.message,
      });
    }
  };
};
