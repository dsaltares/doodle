import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Connecting from '../Connecting';
import InitialPhase from '../InitialPhase';
import ConceptChoicePhase from '../ConceptChoicePhase';
import CreateEntryPhase from '../CreateEntryPhase';
import EntryChoicePhase from '../EntryChoicePhase';

interface Props extends RouteComponentProps<any> {
  connected: boolean,
  phaseName: string,
  connect: () => void,
  leave: () => void,
}

class Game extends React.Component<Props, {}> {
  unblock?: () => void;

  constructor(props: Props) {
    super(props);

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
  }

  onBeforeUnload(e: BeforeUnloadEvent) {
    if (process.env.NODE_ENV !== 'development') {
      var dialogText = 'You will exit the game.';
      e.returnValue = dialogText;
      return dialogText;
    }
  }

  componentDidMount() {
    const { connect, history } = this.props;

    connect();
    window.addEventListener('beforeunload', this.onBeforeUnload);
    this.unblock = history.block('Are you sure you want to leave the game?');
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    const { leave } = this.props;
    leave();
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    const { connected, phaseName } = this.props;

    if (!connected) {
      return <Connecting />;
    }

    switch (phaseName) {
      case 'initial':
        return <InitialPhase />;
      case 'conceptChoice':
        return <ConceptChoicePhase />;
      case 'createEntry':
        return <CreateEntryPhase />;
      case 'entryChoice':
        return <EntryChoicePhase />
      default:
        return <Typography>Unknown phase</Typography>
    }
  }
}

export default withRouter(Game);
