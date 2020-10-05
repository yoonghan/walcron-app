import { NextApiRequest, NextApiResponse } from 'next';

const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(
    {
      "error": messages.reduce((accumulator, message) => `${accumulator} , ${message}`)
    }
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case "GET":
      res.status(200).json({status: "ok"});
      break;
    default:
      _sendMethodError(
        res,
        [
          `method ${req.method} not recognized.`
        ]
      );
  }
}
