'use strict';

// This is the translator of Mongoose into REST.

class collection {
  constructor(model) {
    this.model = model;
  }

  create(record) {
    let newRecord = new this.model(record);
    return newRecord.save();
  }
  
  read(_id) {
    return _id ? this.model.findOne({_id}) : this.model.find({});
  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
}

module.exports = collection;
