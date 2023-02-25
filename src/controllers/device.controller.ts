import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import mongoose, { Error } from "mongoose";
import Device, { IDevice } from '../models/devices.model';
import { createNewDeviceService, deleteDeviceByIdService, getAllDevicesService, getSingleDeviceService, updateDeviceByIDService } from "../services/device.service";

interface CustomRequest extends Request {
  body: IDevice;
}

export const getAllDevices = async (_req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.send(await getAllDevicesService());
  } catch(error) {
    next(error);
  }
}

export const createNewDevice = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.send(await createNewDeviceService(req?.body))
  } catch(error) {
    if (error?.name === 'ValidationError') {
      return next(createHttpError(422, error?.message));
    }
    next(error);
  }
}

export const getSingleDevice = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const device = await getSingleDeviceService(req?.params?.id);
    if (!device) {
      throw createHttpError(404, 'Device does not exist');
    }
    res.send(device);
  } catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createHttpError(404, "Invalid Device id"));
    }
    next(error);
  }
}

export const updateDeviceByID = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const device = await updateDeviceByIDService(req.params?.id, req?.body);
    if (!device) {
      throw createHttpError(404, 'Device does not exist');
    }
    res.send(device);
  } catch(error) {
    if (error instanceof Error.CastError) {
      return next(createHttpError(404, "Invalid Device id"));
    }
    next(error);
  }
}

export const deleteDeviceById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const device = await deleteDeviceByIdService(req.params?.id);
    if (!device) {
      throw createHttpError(404, 'Device does not exist');
    }
    res.send(device);
  } catch(error) {
    if (error instanceof Error.CastError) {
      return next(createHttpError(400, "Invalid Device id"));
    }
    next(error);
  }
}