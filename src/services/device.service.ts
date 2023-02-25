import Device, { IDevice } from '../models/devices.model';

export const getAllDevicesService = async () => {
  return await Device.find({}, {__v: 0});
}

export const createNewDeviceService = async (requestBody: IDevice) => {
  const device = new Device(requestBody);
  return await device.save()
}

export const getSingleDeviceService = async (id: string) => {
  return await Device.findById(id);
}

export const updateDeviceByIDService = async (id: string, requestBody: IDevice) => {
  return await Device.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: { ...requestBody },
    },
    { runValidators: true, new: true }
  );
}

export const deleteDeviceByIdService = async (id: string) => {
  return await Device.findByIdAndDelete(id);
}

export const findDevicesByIdsService = async (ids: string[]) => {
  return await Device.find({
      '_id': { 
        $in: ids
      }
    }, { __V: 0 });
}