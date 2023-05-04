import { Controller, Middleware, Post, Patch, Get, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../config/logger';
import { serverErrorResponse } from './errors';
import Assets, { IAssets } from '../models/assets';
import verifyToken from '../middlewares/verifyToken';
import { asyncWrap } from '../utils/asyncWrap';

const { UNAUTHORIZED, NOT_FOUND, OK } = StatusCodes;

@Controller('api/asset')
export class AssetController {
  @Get('')
  @Middleware([verifyToken])
  private async getAllAssets(req: any, res:any) {
    try {
      const { pageSize, page } = req.query;

      const [error, result] = await asyncWrap(
        Assets.find({ isActive: true })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
      );

      if (error) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: 'Something went wrong while fetching the data!'
        });
      }

      return res.status(OK).json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error(error);
      serverErrorResponse(res);
    }
  }

  @Post('')
  @Middleware([verifyToken])
  private async insertAsset(req: Request, res: Response) {
    try {
      const { title, url, description } = req.body;

      const asset = new Assets({ title, url, description });

      const [error, result] = await asyncWrap(asset.save());

      if (error) {
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: 'Something went wrong while doing signup, Please try again after sometime!'
        });
      }

      return res.status(OK).json({
        success: true,
        message: 'Asset inserted successfully!'
      });
    } catch (error) {
      logger.error(error);
      serverErrorResponse(res);
    }
  }

  @Patch(':id')
  @Middleware([verifyToken])
  private async updateAsset(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, url } = req.body;

      const [err, result] = await asyncWrap(Assets.find({ isActive: true, _id: id }));

      if (err) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: 'Something went wrong while fetching the data!'
        });
      }

      if (result.length === 0) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: 'Asset not found in the db, Please update the existing asset!'
        });
      }

      const [error, response] = await asyncWrap(
        Assets.updateOne({ _id: id }, { $set: { title, description, url } })
      );

      if (error) {
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: 'Something went wrong while updating the asset, Please try again after sometime!'
        });
      }

      console.log(response);

      return res.status(OK).json({
        success: true,
        message: 'Asset updated successfully!'
      });
    } catch (error) {
      logger.error(error);
      serverErrorResponse(res);
    }
  }

  @Delete(':id')
  @Middleware([verifyToken])
  private async deleteAsset(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [err, result] = await asyncWrap(Assets.find({ isActive: true, _id: id }));

      if (err) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: 'Something went wrong while fetching the data!'
        });
      }

      if (result.length === 0) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: 'Asset not found in the db, Please delete the existing asset!'
        });
      }

      const [error, response] = await asyncWrap(
        Assets.updateOne({ _id: id }, { $set: { isActive: false } })
      );
      if (error) {
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: 'Something went wrong while deleting the asset, Please try again after sometime!'
        });
      }

      return res.status(OK).json({
        success: true,
        message: 'Asset deleted successfully!'
      });
    } catch (error) {
      logger.error(error);
      serverErrorResponse(res);
    }
  }
}
