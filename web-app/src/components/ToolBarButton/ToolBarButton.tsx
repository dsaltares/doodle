import React, {
  ReactNode,
  FunctionComponent,
  MouseEvent,
} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './ToolBarButton.styles';

type Props = {
  title: string,
  icon: ReactNode,
  onClick: (event: MouseEvent<HTMLElement>) => void,
  disabled?: boolean,
}

const ToolBarButton: FunctionComponent<Props> = ({
  title,
  icon,
  disabled = false,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={title} placement="left">
      <span>
        <IconButton
          aria-label={title}
          onClick={onClick}
          disabled={disabled}
          classes={{
            root: classes.root,
          }}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ToolBarButton;
