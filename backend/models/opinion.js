const mongoose = require('mongoose');

class OpinionClass {
}

const OpinionFields = {
  text: { type: String, lowercase: true, trim: true },
  url: { type: String, lowercase: true, trim: true },
};

const OpinionSchema = new mongoose.Schema(OpinionFields, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

OpinionSchema.loadClass(OpinionClass);

const Opinion = mongoose.model('Opinion', OpinionSchema);

module.exports = Opinion;
