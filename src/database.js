import mongoose from 'mongoose';
import { softDeletePlugin } from '../helpers/mongo-plugins';

mongoose
  .connect(
    'mongodb+srv://' +
    process.env.MONGO_USER +
    ':' +
    process.env.MONGO_PASS +
    '@cluster0.pkvzqcv.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB || 'test',
    }
  )
  .then(() => {
    console.log('Database Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

mongoose.plugin(softDeletePlugin);