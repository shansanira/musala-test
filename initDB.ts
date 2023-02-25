import mongoose from "mongoose";

// mongodb url
// mongodb+srv://musala-test.mhlwlqb.mongodb.net/?retryWrites=true&w=majority/

/**
 * handling mongodb connection via mongoose
 */
export default function initDatabase() {
  mongoose.set('strictQuery', true)
  .connect(process.env.MONGODB_URI,
  {
    user: process.env.USER_NAME,
    pass: process.env.PASS,
    dbName: process.env.DB_NAME
  })
  .then(() => console.log('Mongodb connected...'))
  .catch((error) => console.log(error?.message));

mongoose.connection.on('connected', () => console.log('Mongoose connected to the DB...'));
mongoose.connection.on('error', (error) => console.log(error?.message));
mongoose.connection.on('disconnected', () => console.log('Mongoose connected is disconnected...'));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected due to app termination')
    process.exit(0)
  });
});
}