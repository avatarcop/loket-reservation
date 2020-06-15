const db = require("../models");
const Transaction = db.transaction;
const Tickettype = db.tickettype;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Check Ticket Type
  Tickettype.findOne({_id : req.body.id_ticket_type}, function (err, data) {
      if (!data){
        res.status(200).send({
          error: false,
          message: "Failed update Quota of Ticket Type, Ticket Type with id "+ req.body.id_ticket_type +" is not found !",
        });
        return;
      }else {
          // Create a Tutorial
          const transaction = new Transaction({
            nama_customer: req.body.nama_customer,
            contact: req.body.contact,
            id_ticket_type: req.body.id_ticket_type,
            qty: req.body.qty,
            total_bayar: data.price * req.body.qty,
          });

          // Update Quota Ticket Type
          Tickettype.findByIdAndUpdate(req.body.id_ticket_type, {$inc: { quota: - req.body.qty }}, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                error: true,
                message: `Cannot update Quota of Ticket Type with id=${req.body.id_ticket_type}. Maybe Ticket Type was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              error: true,
              message: "Error updating Quota of Ticket Type with id=" + req.body.id_ticket_type
            });
          });

          // Save Tutorial in the database
          transaction
            .save(transaction)
            .then(data => {
              res.status(200).send({
                error: false,
                message: 'Sukses membuat data transaction',
                data: data
              });
            })
            .catch(err => {
              res.status(500).send({
                error: true,
                message:
                  err.message || "Terjadi kesalahan saat membuat data transaction."
              });
            });
      }
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Transaction.find({})
    .then(data => {
      res.status(200).send({
        error: false,
        message: 'Sukses menampilkan semua data transaction',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan data transaction."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Transaction.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          error: false,
          message: "Transaction dengan id " + id + " tidak ditemukan."
        });
      else
        res.status(200).send({
          error: false,
          message: "Sukses menampilkan data transaction dengan id " + id,
          data: data
        });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan transaction dengan id=" + id
      });
    });
};


