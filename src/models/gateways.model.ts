import { Types, Schema, model, Model } from "mongoose";
import { IDevice } from "./devices.model";

export interface IGateway {
  serialNumber: string;
  name: string;
  ipv4: string;
  peripheralDevices: Types.Array<Schema.Types.ObjectId>;
}

const GatewaySchema = new Schema<IGateway>({
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ipv4: {
    type: String,
    required: true,
    validate: {
      validator: (ip) => {
        let test = true;
        ip.split('.').forEach((num, _index, arr) => {
          const item = parseInt(num, 10);
          test = !isNaN(item) && !isNaN(num) && item >=0 && item < 256 && arr.length==4 && test;
        });
        return test;
      },
      message: (props) => `${props.value} is not a valid ip address!`
    },
  },
  peripheralDevices: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
    required: true,
    validate: {
      validator: (arr) => {
        return arr.length <= 10
      },
      message: () => `peripheral devices exceed the limit of 10`
    }
  }
});

const Gateway: Model<IGateway> = model('Gateway', GatewaySchema);

export default Gateway;