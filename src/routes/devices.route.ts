import express from 'express';
import { createNewDevice, deleteDeviceById, getAllDevices, getSingleDevice, updateDeviceByID } from '../controllers/device.controller';

const router = express.Router();

router.route('/').get(getAllDevices);

router.route('/').post(createNewDevice);

router.route('/:id').get(getSingleDevice);

router.route('/:id').patch(updateDeviceByID);

router.route('/:id').delete(deleteDeviceById);


export default router;