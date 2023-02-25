import { Model, model, Schema } from "mongoose";

export interface IDevice {
  uid: number;
  vendor: string;
  createdDate: Date;
  status: 'online' | 'offline';
}

const DeviceSchema = new Schema<IDevice>({
  uid: {
    type: Number,
    unique: true,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
});

const Device: Model<IDevice> = model('Device', DeviceSchema);

export default Device;