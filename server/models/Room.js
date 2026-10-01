const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    block: { type: String, required: true },
    number: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

roomSchema.index({ block: 1, number: 1 }, { unique: true });

module.exports = mongoose.model('Room', roomSchema);
