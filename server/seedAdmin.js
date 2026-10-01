require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  if (await User.findOne({ role: 'admin' })) {
    console.log('Admin already exists');
  } else {
    await User.create({ name: 'Admin', email: 'admin@hostel.com', password: 'admin123', role: 'admin' });
    console.log('Admin created: admin@hostel.com / admin123 (change this!)');
  }
  process.exit();
})();