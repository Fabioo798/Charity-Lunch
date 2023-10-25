export interface CustomError extends Error {
  statusCode: number;
  statusMessage: string;
}

export const options = {
  timezone: 'Europe/Madrid',
  hour12: false,
};