/* eslint-disable react/prop-types */

import React from 'react';
import faker from 'faker';
import { Button } from '@folio/stripes/components';

const { number, uuid, words } = faker.random;

const poLines = [];
for (let i = 0; i < 100; i++) {
  poLines[i] = {
    acquisitionMethod: faker.finance.transactionType(),
    id: uuid(),
    poLineNumber: `${number()}-${number()}`,
    titleOrPackage: words(),
  };
}

let currentIndex = -1;

export default ({
  type: 'plugin',
  name: '@folio/ui-plugin-find-po-line-dummy',
  displayName: 'Find PO Line',
  pluginType: 'find-po-line',
  module: props => (
    <Button
      data-test-po-line-select-po-line
      onClick={() => {
        currentIndex += 1;
        return props.addLines([poLines[currentIndex]]);
      }}
    >
      Select PO Line #{currentIndex + 1}
    </Button>
  ),
});

const getCurrentPOLine = () => poLines[currentIndex];

export {
  getCurrentPOLine,
  poLines,
};
