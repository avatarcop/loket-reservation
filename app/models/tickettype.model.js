module.exports = mongoose => {
  var dateJakarta = new Date(Date.now());
  dateJakarta.setHours(dateJakarta.getHours()+7);

  var schema = mongoose.Schema(
    {
      id_event: {
        type: String,
        required: [true, 'ID Event is required']
      },
      jenis_tiket: {
        type: String,
        required: [true, 'Jenis Tiket is required']
      },
      price: {
        type: Number,
        required: [true, 'Price is required']
      },
      quota: {
        type: Number,
        required: [true, 'Quota is required']
      },
      created_date: {
        type: Date,
        default: dateJakarta
      },
      updated_date: {
        type: Date,
        default: dateJakarta
      },
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tickettype = mongoose.model("tickettype", schema);
  return Tickettype;
};
