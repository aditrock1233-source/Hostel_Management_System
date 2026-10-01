const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    rollNo: { type: String, required: true, unique: true },
    course: String,
    year: Number,
    phone: String,
    guardianName: String,
    guardianPhone: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
