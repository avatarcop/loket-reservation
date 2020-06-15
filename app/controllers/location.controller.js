var uuid = require('uuid');
const db = require("../models");
const Location = db.location;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Create a Tutorial
  const location = new Location({
    nama_lokasi: req.body.nama_lokasi,
  });

  // Save Tutorial in the database
  location
    .save(location)
    .then(data => {
      res.status(200).send({
        error: false,
        message: 'Sukses membuat data lokasi',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          err.message || "Terjadi kesalahan saat membuat data Lokasi."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nama_lokasi = req.query.nama_lokasi;
  var condition = nama_lokasi ? { nama_lokasi: { $regex: new RegExp(nama_lokasi), $options: "i" } } : {};

  Location.find(condition)
    .then(data => {
      res.status(200).send({
        error: false,
        message: 'Sukses menampilkan semua data lokasi',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan data lokasi."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Location.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          error: false,
          message: "Lokasi dengan id " + id + " tidak ditemukan."
        });
      else
        res.status(200).send({
          error: false,
          message: "Sukses menampilkan data lokasi dengan id " + id,
          data: data
        });
    })
    .catch(err => {
      res.status(500).send({
        error: true,
        message:
          "Terjadi kesalahan saat menampilkan lokasi dengan id=" + id
      });
    });
};


