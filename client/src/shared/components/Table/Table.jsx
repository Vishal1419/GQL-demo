import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

const Table = ({
  columns, data, selectedEntities, selectAllEntities, selectEntity,
}) => (
  <div className="u-table">
    {
      columns.some(column => column.header)
      && (
        <div className="row">
          <div
            className="col"
            style={{ width: '30px' }}
          >
            <input
              type="checkbox"
              className={
                selectedEntities.length > 0
                && selectedEntities.length < data.length
                  ? 'indeterminate-checkbox'
                  : ''
              }
              checked={
                data.length !== 0
                && selectedEntities.length === data.length
              }
              onChange={selectAllEntities}
            />
          </div>
          {
            columns.map(column => (
              <div
                className="col"
                style={{ width: column.width }}
              >
                {column.header}
              </div>
            ))
          }
        </div>
      )
    }
    {
      data.map(row => (
        <div className="row">
          <div
            className="col"
            style={{ width: '30px' }}
          >
            {console.log(selectedEntities)}
            <input
              type="checkbox"
              checked={selectedEntities.indexOf(row) !== -1}
              onChange={event => selectEntity(event, row)}
            />
          </div>
          {
            columns.map(column => (
              <div
                className="col"
                style={{ width: column.width }}
              >
                {row[column.accessor]}
              </div>
            ))
          }
        </div>
      ))
    }
    {
      columns.some(column => column.footer)
      && (
        <div className="row">
          <div
            className="col"
            style={{ width: '30px' }}
          >
            <input type="checkbox" />
          </div>
          {
            columns.map(column => (
              <div
                className="col"
                style={{ width: column.width }}
              >
                {column.footer}
              </div>
            ))
          }
        </div>
      )
    }
  </div>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  selectedEntities: PropTypes.arrayOf(PropTypes.any),
  selectAllEntities: PropTypes.func,
  selectEntity: PropTypes.func,
};

Table.defaultProps = {
  columns: [],
  data: [],
  selectedEntities: [],
  selectAllEntities: noop,
  selectEntity: noop,
};

export default Table;
