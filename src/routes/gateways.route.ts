import express from 'express';
import { createNewGateway, deleteGatewayById, getAllGateways, getSingleGateway, updateGatewayByID } from '../controllers/gateway.controller';

const router = express.Router();

router.route('/').get(getAllGateways);

router.route('/').post(createNewGateway);

router.route('/:id').get(getSingleGateway);

router.route('/:id').patch(updateGatewayByID);

router.route('/:id').delete(deleteGatewayById);


export default router;