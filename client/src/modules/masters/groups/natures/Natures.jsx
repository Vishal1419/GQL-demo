import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import BlockUI from 'react-block-ui';
import TableContainer from '../../../../shared/components/Table/TableContainer';

const GET_NATURES = gql`
  {
    natures {
      id
      name
    }
  }
`;

const Natures = () => (
  <Query query={GET_NATURES}>
    {({ loading, data }) => (
      <BlockUI tag="div" blocking={loading}>
        <TableContainer
          data={data.natures}
          columns={[
            {
              header: 'id',
              accessor: 'id',
              width: '200px',
            },
            {
              header: 'Effects',
              accessor: 'name',
              width: '25%',
            },
            {
              header: 'all',
              accessor: 'name',
              width: '25%',
            },
            {
              header: 'all',
              accessor: 'name',
              width: '25%',
            },
            {
              header: 'all',
              accessor: 'name',
              width: '25%',
            },
            {
              header: 'actions',
              accessor: 'name',
              width: '100px',
            },
          ]}
        />
      </BlockUI>
    )}
  </Query>
);

export default Natures;
