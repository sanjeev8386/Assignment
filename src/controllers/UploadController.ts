import { Controller, Middleware, Post } from "@overnightjs/core";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger";
import { serverErrorResponse } from "./errors";
import { imageMiddleWare } from "../middlewares/uploadMiddleware";
import verifyToken from "../middlewares/verifyToken";


@Controller('api/upload')
export class UploadController {
    @Post('')
    @Middleware([imageMiddleWare])
    private async uploadImage(req: any, res: Response) {
        try {
            if (!(req.file && req.file.key)) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
                    success: false,
                    code: 0,
                    message: 'Please upload a file'
                });
            }

            return res.status(StatusCodes.OK).send({
                success: true,
                message: 'File uploaded successfully',
                fileUrl: req.file.location
            });
        } catch (error) {
            logger.error(error)
            serverErrorResponse(res)
        }
    }
}