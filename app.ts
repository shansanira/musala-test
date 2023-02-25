import express, { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import gatewayRouts from './src/routes/gateways.route';
import deviceRouts from './src/routes/devices.route';
import createHttpError, { HttpError } from 'http-errors';
import initDatabase from './initDB';

const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

//initialise DB
initDatabase();

/**
 * routes
 */
app.use('/gateways', gatewayRouts);
app.use('/devices', deviceRouts);

/**
 * 404 error handler
 */
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Not Found'));
})

/**
 * error handler
 */
app.use((err: HttpError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err?.status || 500)
  res.json({
    error: {
      status: err?.status || 500,
      message: err?.message,
    }
  });
  next();
})

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
})