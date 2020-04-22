import React, {
  useState,
  FunctionComponent,
} from 'react';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Emoji from '../Emoji';
import { JoinGameParams } from '../../store/game/types';
import MainContent from '../MainContent';

interface Props extends RouteComponentProps<any> {
  joinGame: (params: JoinGameParams) => void,
}

const JoinMenu: FunctionComponent<Props> = ({
  joinGame,
  history,
}) => {
  const [name, setName] = useState('');
  const handleNameChange = (
    (event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  );

  const { code } = useParams();
  const handleGoClicked = () => joinGame({
    name,
    code: code as string,
    goToGame: (code: string) => history.push(`/game/${code}`),
  });

  const hasName = name.length > 0;

  return (
    <MainContent>
      <form onSubmit={handleGoClicked}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!hasName}
              onClick={handleGoClicked}
            >
              <Emoji symbol="🙌"/>
              <span>Go!</span>
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainContent>
  );
};

export default withRouter(JoinMenu);
