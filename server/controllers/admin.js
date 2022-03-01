// controllers/ad.js
const Admin = require("../Models/Admin");

exports.getAdminDetails = (req, res) => {
  Admin.find()
    .then((admin) => res.json(admin))
    .catch((err) =>
      res.status(404).json({ message: "Admin not found", error: err.message })
    );
};

// exports.postCreateAdmin = (req, res) => {
//   Admin.create(req.body)
//     .then((data) => res.json({ message: "Ad added successfully", data }))
//     .catch((err) =>
//       res.status(400).json({ message: "Failed to add ad", error: err.message })
//     );
// };

exports.putUpdateAdmin = (req, res) => {
  Admin.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update ad", error: err.message })
    );
};
