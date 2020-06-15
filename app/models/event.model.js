module.exports = mongoose => {
  var dateFormat = require('dateformat');
  var dateJakarta = new Date(Date.now());
  dateJakarta.setHours(dateJakarta.getHours()+7);

  var schema = mongoose.Schema(
    {
      id_location: {
        type: String,
        required: [true, 'ID Location is required']
      },
      nama_event: {
        type: String,
        required: [true, 'Name Event is required']
      },
      start_date: {
        type: Date,
        required: [true, 'Start Date is required']
      },
      end_date: {
        type: Date,
        required: [true, 'End Date is required']
      },
      created_date: {
        type: Date,
        default: dateFormat(dateJakarta, "isoDateTime")
      },
      updated_date: {
        type: Date,
        default: dateFormat(dateJakarta, "isoDateTime")
      },
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Event = mongoose.model("event", schema);
  return Event;
};
