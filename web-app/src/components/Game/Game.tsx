import React, { ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Connecting from '../Connecting';
import WaitingToJoin from '../WaitingToJoin';
import InitialPhase from '../InitialPhase';
import ConceptChoicePhase from '../ConceptChoicePhase';
import CreateEntryPhase from '../CreateEntryPhase';
import EntryChoicePhase from '../EntryChoicePhase';

import { Alert as AlertType } from '../../store/game/types';

export type StateProps = {
  connected: boolean;
  waitingToJoin: boolean;
  phaseName: string;
  alert?: AlertType;
};

export type DispatchProps = {
  connect: () => void;
  leave: () => void;
  dismissAlert: () => void;
};

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class Game extends React.Component<Props, {}> {
  unblock?: () => void;

  constructor(props: Props) {
    super(props);

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
  }

  onBeforeUnload(e: BeforeUnloadEvent): string | undefined {
    if (process.env.NODE_ENV !== 'development') {
      const dialogText = 'You will exit the game.';
      e.returnValue = dialogText;
      return dialogText;
    }
  }

  componentDidMount(): void {
    const { connect, history } = this.props;

    connect();
    window.addEventListener('beforeunload', this.onBeforeUnload);
    this.unblock = history.block('Are you sure you want to leave the game?');
  }

  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    const { leave } = this.props;
    leave();
    if (this.unblock) {
      this.unblock();
    }
  }

  renderContent(): ReactNode {
    const { connected, phaseName, waitingToJoin } = this.props;

    if (!connected) {
      return <Connecting />;
    }

    if (waitingToJoin) {
      return <WaitingToJoin />;
    }

    switch (phaseName) {
      case 'initial':
        return <InitialPhase />;
      case 'conceptChoice':
        return <ConceptChoicePhase />;
      case 'createEntry':
        return <CreateEntryPhase />;
      case 'entryChoice':
        return <EntryChoicePhase />;
      default:
        return <Typography>Unknown phase</Typography>;
    }
  }

  renderAlert(): ReactNode {
    const { alert, dismissAlert } = this.props;
    const alertComponent = alert ? (
      <Alert onClose={dismissAlert} severity={alert.severity}>
        {alert.message}
      </Alert>
    ) : undefined;

    return (
      <Snackbar
        open={!!alert}
        autoHideDuration={5000}
        onClose={dismissAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {alertComponent}
      </Snackbar>
    );
  }

  render(): ReactNode {
    return (
      <React.Fragment>
        {this.renderContent()}
        {this.renderAlert()}
      </React.Fragment>
    );
  }
}

export default withRouter(Game);
