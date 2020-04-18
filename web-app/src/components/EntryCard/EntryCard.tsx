import React, {
  FunctionComponent,
  ReactNode
} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

type Props = {
  name: string,
  avatar: string,
  entry: ReactNode,
  order: number,
  onClick?: () => void,
}

const EntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  entry,
  order,
  onClick,
}) => {
  const content = [
    <CardHeader
      avatar={<Avatar variant="rounded" alt={name} src={avatar}/>}
      title={name}
    />,
    entry,
  ];
  const wrapped = onClick
    ? (<CardActionArea>{content}</CardActionArea>)
    : content;
  return (
    <Badge badgeContent={order} color="primary">
      <Card onClick={onClick}>
        {wrapped}
      </Card>
    </Badge>
  );
}

export default EntryCard;
