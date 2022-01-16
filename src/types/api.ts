export type Status = 'success' | 'fail';

export interface ErrorResponse {
  status: Status;
  error: {
    statusCode: number;
    status: Status;
    isOperational: boolean;
  };
  message: string;
  stack?: string;
}
