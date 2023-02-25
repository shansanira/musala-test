import createHttpError from "http-errors";
import { Schema, Types } from "mongoose";
import Device from "../models/devices.model";
import Gateway, { IGateway } from "../models/gateways.model";
import { findDevicesByIdsService } from "./device.service";

const MAX_DEVICE_COUNT = 10;

export const getAllGatewaysService = async () => {
  return await Gateway.find({}, {__v: 0}).populate('peripheralDevices');
}

export const createNewGatewayService = async (requestBody: IGateway) => {
  try{
    const devices = await findDevicesByIdsService(requestBody?.peripheralDevices);
    const nonExistingDeviceIds = requestBody?.peripheralDevices.filter((item) => !devices.find((device) => device.id === item));
    const gateway = new Gateway(requestBody);
  if (nonExistingDeviceIds && nonExistingDeviceIds.length) {
    throw createHttpError(422, `Invalid device: 'device-ids: [${nonExistingDeviceIds.toString()}]' not exist`);
  } else {
    return await gateway.save();
  }
  } catch(error) {
    throw createHttpError(error);
  }
}

export const getSingleGatewayService = async (id: string) => {
  return await Gateway.findById(id).populate('peripheralDevices');
}

export const updateGatewayByIDService = async (id: string, requestBody: IGateway) => {
  const  newId = new Types.ObjectId(id);
  if (requestBody?.peripheralDevices && requestBody?.peripheralDevices.length) {
    try {
      const deviceCount = await Gateway.aggregate(
        [
          {
            $match: { _id:  newId}
          },
           {
              $project: {
                 _id: 0,
                 deviceCount: { $size: "$peripheralDevices" }
              }
           }
        ]
     );
      if(deviceCount[0].deviceCount >= MAX_DEVICE_COUNT) {
        throw createHttpError(422, "Device array limit of 10 for given gateway exceeded");
      } else if ((deviceCount[0].deviceCount + requestBody?.peripheralDevices?.length) > MAX_DEVICE_COUNT) {
        throw createHttpError(422, `Only ${MAX_DEVICE_COUNT - deviceCount[0].deviceCount} device/s acceptable for this gateway`);
      }
    } catch(error) {
      throw error 
    }
  }
  return await Gateway.findOneAndUpdate(
    {
      _id: id
    },
    {
      $addToSet: { peripheralDevices: requestBody?.peripheralDevices },
      $set: { 
        serialNumber: requestBody?.serialNumber,
        name: requestBody?.name,
        ipv4: requestBody?.ipv4,
      }
    },
    { runValidators: true, new: true },
  );
}

export const deleteGatewayByIdService = async (id: string) => {
  return await Gateway.findByIdAndDelete(id);
}