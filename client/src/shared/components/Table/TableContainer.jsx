import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntities: [],
    };
    this.selectAllEntities = this.selectAllEntities.bind(this);
    this.selectEntity = this.selectEntity.bind(this);
  }

  selectAllEntities() {
    const { selectedEntities } = this.state;
    const { data } = this.props;
    if (data.length > selectedEntities.length) {
      this.setState({
        selectedEntities: data,
      });
    } else {
      this.setState({
        selectedEntities: [],
      });
    }
  }

  selectEntity(event, entity) {
    event.stopPropagation();
    const { selectedEntities } = this.state;
    if (!selectedEntities.includes(entity)) {
      this.setState(prevState => ({
        selectedEntities: [
          ...prevState.selectedEntities,
          entity,
        ],
      }));
    } else {
      this.setState(prevState => ({
        selectedEntities: [
          ...prevState.selectedEntities
            .filter(ent => ent !== entity),
        ],
      }));
    }
  }


  render() {
    const {
      columns, data, isSelectable, isMulti,
    } = this.props;
    const { selectedEntities } = this.state;
    return (
      <Table
        columns={columns}
        data={data}
        isSelectable={isSelectable}
        isMulti={isMulti}
        selectedEntities={selectedEntities}
        selectAllEntities={this.selectAllEntities}
        selectEntity={this.selectEntity}
      />
    );
  }
}

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
