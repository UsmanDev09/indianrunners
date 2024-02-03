import('../models/User');

import mongoose from 'mongoose';

 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
afterAll(async () => {
  await mongoose.disconnect();
});