import React from 'react';
import PropTypes from 'prop-types';

const calculateColumnWidth = (width) => {
  const obj = {
    width,
  };
  if (!(String(width).endsWith('%') || width === 'auto')) {
    obj.maxWidth = width;
  }
  return obj;
};

const Table = ({ columns, data }) => (
  <table className="u-table">
    {
      columns.some(column => column.header)
      && (
        <thead>
          <tr>
            {
              columns.map(column => (
                <th
                  style={{
                    ...calculateColumnWidth(column.width),
                  }}
                >
                  {column.header}
                </th>
              ))
            }
          </tr>
        </thead>
      )
    }
    {
      columns.some(column => column.footer)
      && (
        <tfoot>
          <tr>
            {
              columns.map(column => (
                <td>{column.footer}</td>
              ))
            }
          </tr>
        </tfoot>
      )
    }
    <tbody>
      {
        data.map(row => (
          <tr>
            {
              columns.map(column => (
                <td>{row[column.accessor]}</td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};

Table.defaultProps = {
  columns: [],
  data: [],
};

export default Table;
