import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import BlockUI from 'react-block-ui';

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
        {
          data.natures && data.natures.map(nature => (
            <div
              className="nature-wrapper"
            >
              <p key={nature.id} className="nature">
                {nature.name}
              </p>
            </div>
          ))
        }
      </BlockUI>
    )}
  </Query>
);

export default Natures;
