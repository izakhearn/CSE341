const mongodb = require("../data/database");
const objectId  = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  const db = mongodb.getDb();
  const contacts = await db.collection("Contacts").find();
  contacts
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching contacts", error: err });
    });
};

const getOneContact = async (req, res) => {
  const db = mongodb.getDb();
  const contact = await db
    .collection("Contacts")
    .findOne({ _id: new objectId(req.params.id) });

    if (contact) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);
        }
        else {
        res.status(404).json({ message: "Contact not found" });  
        }
};

module.exports = {
    getAllContacts,
    getOneContact,
    };

