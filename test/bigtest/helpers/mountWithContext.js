import React from 'react';
import ReactDOM from 'react-dom';
import Harness from './Harness';
import { getCleanTestingRoot } from './getCleanTestingRoot';

export function mountWithContext(component) {
  return new Promise(resolve => {
    ReactDOM.render(<Harness>{component}</Harness>, getCleanTestingRoot(), resolve);
  });
}
