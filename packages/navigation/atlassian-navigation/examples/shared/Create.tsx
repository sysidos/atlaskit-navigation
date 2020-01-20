import React from 'react';

import { Create } from '@atlaskit/atlassian-navigation';

const onClick = (...args: any[]) => {
  console.log('create click', ...args);
};
const StyledTooltip = () => (
  <span>
    Create
    <span style={{ color: 'orange' }}> [c]</span>
  </span>
);

export const DefaultCreate = () => (
  <Create
    buttonTooltip={<StyledTooltip />}
    iconButtonTooltip="Create button"
    onClick={onClick}
    text="Create"
  />
);
