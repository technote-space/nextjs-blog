import type { NextApiRequest, NextApiResponse } from 'next';

const Hello = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' });
};
export default Hello;
