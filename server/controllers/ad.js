// controllers/ad.js
const Ad = require("../Models/Ad");

exports.getAllAd = (req, res) => {
  Ad.find()
    .then((ad) => res.json(ad))
    .catch((err) =>
      res.status(404).json({ message: "Ad not found", error: err.message })
    );
};

exports.postCreateAd = (req, res) => {
  Ad.create(req.body)
    .then((data) => res.json({ message: "Ad added successfully", data }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to add ad", error: err.message })
    );
};

exports.putUpdateAd = (req, res) => {
  Ad.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update ad", error: err.message })
    );
};

exports.deleteAd = (req, res) => {
  Ad.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "ad deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
