import { Response, NextFunction } from 'express';
import { ISecureRequest } from '@overnightjs/jwt';
import statusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

const send401WithMessage = (res: Response) => {
  res.status(statusCodes.UNAUTHORIZED).send({
    message: 'You are not authorized to use this service'
  });
};

export default async function verifyToken(req: ISecureRequest, res: Response, next: NextFunction) {
  const authorizationHeader: string = req.headers.authorization ?? ('' as string);

  const parts = authorizationHeader.split(' ');

  if (parts.length === 2) {
    const token = parts[1];
    if (!token) {
      return send401WithMessage(res);
    }
    jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
      if (err) {
        console.log(err);
        return send401WithMessage(res);
      }
      const { userId } = payload;
      req.payload = {};
      req.payload.userId = userId;
      next();
    });
  } else {
    return send401WithMessage(res);
  }
}
