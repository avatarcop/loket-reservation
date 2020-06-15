module.exports = mongoose => {
  var dateJakarta = new Date(Date.now());
  dateJakarta.setHours(dateJakarta.getHours()+7);

  var schema = mongoose.Schema(
    {
      nama_lokasi: {
        type: String,
        required: [true, 'Nama Lokasi is required']
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

  const Location = mongoose.model("location", schema);
  return Location;
};
