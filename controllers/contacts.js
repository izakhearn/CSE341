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

const createContact = async (req, res) => {
  const db = mongodb.getDb();
  console.log(req.body);
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favColor: req.body.favColor,
    address: req.body.address,
    tags: req.body.tags,
  };
  // Check that all fields are present
  if (!contact.name || !contact.email || !contact.phone || !contact.favColor || !contact.address || !contact.tags) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  db.collection("Contacts")
    .insertOne(contact)
    .then((result) => {
      res.status(201).json({ id: result.insertedId, message: "Contact created" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating contact", error: err });
    });
};

const updateContact = async (req, res) => {
  const db = mongodb.getDb();
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favColor: req.body.favColor,
    address: req.body.address,
    tags: req.body.tags,
  };
  if (!contact.name || !contact.email || !contact.phone || !contact.favColor || !contact.address || !contact.tags) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  db.collection("Contacts")
    .updateOne(
      { _id: new objectId(req.params.id) },
      { $set: contact }
    )
    .then((result) => {
      res.status(200).json({ message: "Contact updated" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating contact", error: err });
    });
};

const deleteContact = async (req, res) => {
  const db = mongodb.getDb();
  db.collection("Contacts")
    .deleteOne({ _id: new objectId(req.params.id) })
    .then((result) => {
      res.status(200).json({ message: "Contact deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting contact", error: err });
    });
};


module.exports = {
    getAllContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
    };

