import { Controller, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/hashPassword';
import logger from '../config/logger';
import { serverErrorResponse } from './errors';
import User, { IUser } from '../models/user';
import { asyncWrap } from '../utils/asyncWrap';

const { UNPROCESSABLE_ENTITY, UNAUTHORIZED, OK } = StatusCodes;

@Controller('api/signup')
export class SignUpController {
  @Post('')
  @Middleware([
    body('name', 'Name is less than 4 chars')
      .exists({ checkFalsy: true, checkNull: true })
      .isLength({ min: 3 }),
    body('email', 'Email is not valid!').exists({ checkFalsy: true, checkNull: true }).isEmail(),
    body(
      'password',
      'Password should contain, Lowercase letters, numbers, special character and should be 6 char long!'
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/, 'i')
  ])
  private async signup(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          code: -1,
          errors: errors.array(),
          message: 'Please check your inputs!'
        });
      }

      const { name, email, password } = req.body;

      let user: IUser = await User.findOne({ email: email });

      if (user) {
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: `User with email ${email} already present. Please try to sign in.`
        });
      }

      const data = new User({ email, name, password: hashPassword(password) });

      const [error, result] = await asyncWrap(data.save());

      if (error) {
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: 'Something went wrong while doing signup, Please try again after sometime!'
        });
      }

      return res.status(OK).json({
        success: true,
        message: 'User registered successfully! Please login to use our services.'
      });
    } catch (error) {
      logger.error(error);
      serverErrorResponse(res);
    }
  }
}
