import React, {
  useState,
  FunctionComponent,
  MouseEvent,
  ReactNode,
} from 'react';

import Popover from '@material-ui/core/Popover';

import ToolBarButton from '../ToolBarButton';
import useStyles from './ExpandableToolBarButton.styles';

type RenderContentProps = {
  close: () => void;
};

type Props = {
  title: string;
  icon: ReactNode;
  renderContent: (props: RenderContentProps) => ReactNode;
};

const ExpandableToolBarButton: FunctionComponent<Props> = ({
  title,
  icon,
  renderContent,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `${title}-popover` : undefined;

  return (
    <React.Fragment>
      <ToolBarButton title={title} icon={icon} onClick={handleClick} />
      <Popover
        id={id}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {renderContent({ close: handleClose })}
      </Popover>
    </React.Fragment>
  );
};

export default ExpandableToolBarButton;
