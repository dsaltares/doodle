import React, { FunctionComponent, ReactNode } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';

import ExpandableToolBarButton from './ExpandableToolBarButton';

export default { title: 'ExpandableToolBarButton' };

export const defaultState: FunctionComponent = () => (
  <ExpandableToolBarButton
    title="Sample"
    icon={<CreateIcon />}
    renderContent={(): ReactNode => (
      <Typography>This is the expanded content</Typography>
    )}
  />
);
