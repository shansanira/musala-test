import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Error } from "mongoose";
import { IGateway } from "../models/gateways.model";
import { createNewGatewayService, deleteGatewayByIdService, getAllGatewaysService, getSingleGatewayService, updateGatewayByIDService } from "../services/gateway.service";

interface CustomRequest extends Request {
  body: IGateway;
}

export const getAllGateways = async (_req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.send(await getAllGatewaysService());
  } catch(error) {
    next(error);
  }
}

export const createNewGateway = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.send(await createNewGatewayService(req?.body))
  } catch(error) {
    if (error?.name === 'ValidationError') {
      return next(createHttpError(422, error?.message));
    }
    next(error);
  }
}

export const getSingleGateway = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const gateway = await getSingleGatewayService(req?.params?.id);
    if (!gateway) {
      throw createHttpError(404, 'Gateway does not exist');
    }
    res.send(gateway);
  } catch(error) {
    if (error instanceof Error.CastError) {
      return next(createHttpError(404, "Invalid Gateway id"));
    }
    next(error);
  }
}

export const updateGatewayByID = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const gateway = await updateGatewayByIDService(req?.params?.id, req?.body);
    if (!gateway) {
      throw createHttpError(404, 'Gateway does not exist');
    }
    res.send(gateway);
  } catch(error) {
    if (error instanceof Error.CastError) {
      return next(createHttpError(404, "Invalid Gateway id"));
    }
    next(error);
  }
}

export const deleteGatewayById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const gateway = await deleteGatewayByIdService(req.params?.id);
    if (!gateway) {
      throw createHttpError(404, 'Gateway does not exist');
    }
    res.send(gateway);
  } catch(error) {
    if (error instanceof Error.CastError) {
      return next(createHttpError(400, "Invalid Gateway id"));
    }
    next(error);
  }
}