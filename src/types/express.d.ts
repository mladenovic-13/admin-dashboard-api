declare namespace Express {
  interface Request {
    authToken: string | null;
    authId: string;
  }
}
