import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import classNames from 'classnames';

import * as actions from '../../actions.js';

import classes from './Ticket.module.scss';

const Ticket = ({ tickets, loading, error, getSearchId, filterTransfers, filterFlight }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    getSearchId();
  }, [getSearchId]);

  const getStops = (length) => {
    if (length === 0) return 'БЕЗ ПЕРЕСАДОК';
    else if (length === 1) return `${length} ПЕРЕСАДКА`;
    else return `${length} ПЕРЕСАДКИ`;
  };
  const getTickets = (tickets, filterTransfers, filterFlight) => {
    let filteredTickets = [];
    let sortedTickets = [];

    if (filterTransfers.withoutTransfers) {
      const withoutTransfersTickets = tickets.filter((ticket) => ticket.segments[0].stops.length === 0 || ticket.segments[1].stops.length === 0);
      filteredTickets = [...filteredTickets, ...withoutTransfersTickets];
    }

    if (filterTransfers.oneTransfers) {
      const oneTransfers = tickets.filter((ticket) => ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1);
      filteredTickets = [...filteredTickets, ...oneTransfers];
    }

    if (filterTransfers.twoTransfers) {
      const twoTransfers = tickets.filter((ticket) => ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2);

      filteredTickets = [...filteredTickets, ...twoTransfers];
    }

    if (filterTransfers.threeTransfers) {
      const threeTransfers = tickets.filter((ticket) => ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3);

      filteredTickets = [...filteredTickets, ...threeTransfers];
    }

    const uniqueTickets = Array.from(new Set(filteredTickets.map((ticket) => JSON.stringify(ticket)))).map((ticket) => JSON.parse(ticket));

    if (filterFlight.сheapestFlight) {
      sortedTickets = uniqueTickets.sort((a, b) => a.price - b.price);
    }

    if (filterFlight.fastestFlight) {
      sortedTickets = uniqueTickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration || a.segments[1].duration - b.segments[1].duration);
    }

    sortedTickets = sortedTickets.filter((ticket, index) => index < count);

    return sortedTickets;
  };

  if (error) console.log(`Ошибка поймана ${error}`);

  return (
    <div className={classes.Tickets}>
      {loading && (
        <span>
          <Spin size='large' />
          ЗАГРУЖАЮ БИЛЕТЫ...
        </span>
      )}
      {getTickets(tickets, filterTransfers, filterFlight).length === 0 && !loading && !error && <span>Рейсов, подходящих под заданные фильтры, не найдено</span>}
      {getTickets(tickets, filterTransfers, filterFlight).length === 0 && error && <span>Самолеты сегодня не летают! Попробуйте перезагрузить страницу..</span>}
      {getTickets(tickets, filterTransfers, filterFlight).map((ticket, index) => (
        <div key={index} className={classes.Ticket}>
          <div className={classes.header}>
            <p className={classes.price}>
              {`${ticket.price}`.slice(0, `${ticket.price}`.length - 3)} {`${ticket.price}`.slice(`${ticket.price}`.length - 3, `${ticket.price}`.length)} Р
            </p>
            <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt={`${ticket.carrier} name`} />
          </div>
          {ticket.segments.map((segment, segmentIndex) => (
            <div key={segmentIndex} className={classNames(classes.flight, segmentIndex === 0 ? classes.flightOne : classes.flightTwo)}>
              <div className={classes.rout}>
                <p>
                  {segment.origin} - {segment.destination}
                </p>
                <p>
                  {new Date(segment.date).toLocaleTimeString().slice(0, 5)} - {new Date(new Date(segment.date).getTime() + segment.duration * 60000).toLocaleTimeString().slice(0, 5)}
                </p>
              </div>
              <div className={classes.length}>
                <p>В ПУТИ</p>
                <p>
                  {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
                </p>
              </div>
              <div className={classes.stops}>
                <p>{getStops(segment.stops.length)}</p>
                <p>{segment.stops.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <button className={classes.button} onClick={() => setCount((v) => v + 5)}>
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tickets: state.fetchTicketsSuccess.data,
    loading: state.fetchTicketsSuccess.loading,
    error: state.fetchTicketsSuccess.error,
    filterTransfers: state.filterTransfers,
    filterFlight: state.filterFlight,
  };
};

export default connect(mapStateToProps, actions)(Ticket);
