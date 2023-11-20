import { NextApiResponse } from 'next';

type ApiResponse<T> = {
  status: number;
  data: T;
}

export const sendApiResponse = <T>(
  res: NextApiResponse<ApiResponse<T>>,
  statusCode: number,
  data: T
) => {
  res.status(statusCode).json({ status: statusCode, data })
}