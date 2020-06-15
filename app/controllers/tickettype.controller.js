const db = require("../models");
const Tickettype = db.tickettype;
const Event = db.event;

// Create and Save a new TIcket Type
exports.create = (req, res) => {

  // CHECK Event
  Event.findOne({_id : req.body.id_event}, function (err, data) {
      if (!data){
        res.status(200).send({
          error: false,
          message: "Event with id "+ req.body.id_event +" is not found !",
        });
        return;
      }else{
        // Create a TIcket Type
        const tickettype = new Tickettype({
          id_event: req.body.id_event,
          jenis_tiket: req.body.jenis_tiket,
          price: req.body.price,
          quota: req.body.quota,
        });

        // Save TIcket Type in the database
        tickettype
          .save(tickettype)
          .then(data => {
            res.status(200).send({
              error: false,
              message: 'Sukses membuat data ticket',
              data: data
            });
          })
          .catch(err => {
            res.status(500).send({
              error: true,
              message:
                err.message || "Terjadi kesalahan saat membuat data ticket."
            });
          });
      }
  });


};

// Retrieve all TIcket Types from the database.
exports.findAll = (req, res) => {
  Tickettype.find({})
    .then(data => {
      res.status(200).send({
        error: false,
        message: 'Sukses menampilkan semua data ticket',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan data ticket."
      });
    });
};

// Find a single TIcket Type with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Tickettype.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          error: false,
          message: "Ticket type dengan id " + id + " tidak ditemukan."
        });
      else
        res.status(200).send({
          error: false,
          message: "Sukses menampilkan data ticket dengan id " + id,
          data: data
        });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan ticket dengan id=" + id
      });
    });
};


