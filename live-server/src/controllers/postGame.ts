import { v4 as uuid4 } from 'uuid';
import { Response, Request } from "express";

const postGame = () => (_request: Request, response: Response) => {
  console.log('CREATE game');
  const code = uuid4();
  response.status(200).send({ code });
};

export default postGame;
