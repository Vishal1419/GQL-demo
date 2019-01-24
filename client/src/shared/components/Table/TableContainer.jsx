import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

const TableContainer = ({
  columns, data, isSelectable, isMulti,
}) => (
  <Table
    columns={columns}
    data={data}
    isSelectable={isSelectable}
    isMulti={isMulti}
  />
);

TableContainer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  isSelectable: PropTypes.bool,
  isMulti: PropTypes.bool,
};

TableContainer.defaultProps = {
  columns: [],
  data: [],
  isSelectable: false,
  isMulti: false,
};

export default TableContainer;
