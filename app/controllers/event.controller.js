const db = require("../models");
var dateFormat = require('dateformat');
const Event = db.event;
const Schedule = db.schedule;
const Location = db.location;

// Create and Save a new Event
exports.create = (req, res) => {

  // CHECK LOCATION
  Location.findOne({_id : req.body.id_location}, function (err, data) {
      if (!data){
        res.status(200).send({
          error: false,
          message: "Location with id "+ req.body.location +" is not found !",
        });
        return;
      }else{
        Event.findOne({start_date : req.body.start_date, end_date : req.body.end_date, id_location : req.body.id_location }, function (err, data) {
          if (data){
            res.status(200).send({
              error: false,
              message: "Event with these Location and Schedule Date already exist.",
            });
            return;
          }else{
            // Create a Event
            const event = new Event({
              start_date: dateFormat(req.body.start_date, "isoDateTime"),
              end_date: dateFormat(req.body.end_date, "isoDateTime"),
              id_location: req.body.id_location,
              nama_event: req.body.nama_event,
            });

            // Save Event in the database
            event
              .save(event)
              .then(data => {
                res.status(200).send({
                  error: false,
                  message: 'Sukses membuat data event',
                  data: data
                });
              })
              .catch(err => {
                res.status(500).send({
                  error: true,
                  message:
                    err.message || "Terjadi kesalahan saat membuat data event."
                });
              });
          }
        });
      }
  });

};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  Event.find({})
    .then(data => {
      res.status(200).send({
        error: false,
        message: 'Sukses menampilkan semua data event',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan data event."
      });
    });

};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Event.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          error: false,
          message: "Event dengan id " + id + " tidak ditemukan."
        });
      else
        res.status(200).send({
          error: false,
          message: "Sukses menampilkan data event dengan id " + id,
          data: data
        });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan event dengan id=" + id
      });
    });
};


