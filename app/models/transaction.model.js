module.exports = mongoose => {
  var dateJakarta = new Date(Date.now());
  dateJakarta.setHours(dateJakarta.getHours()+7);

  var schema = mongoose.Schema(
    {
      nama_customer: {
        type: String,
        required: [true, 'Nama Customer is required']
      },
      contact: {
        type: String,
        required: [true, 'Contact is required']
      },
      id_ticket_type: {
        type: String,
        required: [true, 'ID Ticket is required']
      },
      qty: {
        type: Number,
        required: [true, 'Quantity is required']
      },
      total_bayar: Number,
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

  const Transaction = mongoose.model("transaction", schema);
  return Transaction;
};
