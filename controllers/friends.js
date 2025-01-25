const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllFriends = async (req, res) => {
  const db = mongodb.getDb();
  const Friends = await db.collection("Friends").find();
  Friends.toArray()
    .then((Friends) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(Friends);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching Friends", error: err });
    });
};

const getOneFriend = async (req, res) => {
  const db = mongodb.getDb();
  const Friend = await db
    .collection("Friends")
    .findOne({ _id: new objectId(req.params.id) });

  if (Friend) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(Friend);
  } else {
    res.status(404).json({ message: "Friend not found" });
  }
};

const createFriend = async (req, res) => {
  const db = mongodb.getDb();
  console.log(req.body);
  const Friend = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    bday: req.body.bday,
  };

  db.collection("Friends")
    .insertOne(Friend)
    .then((result) => {
      res.status(201).json({ id: result.insertedId, message: " created" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating Friend", error: err });
    });
};

const updateFriend = async (req, res) => {
  const db = mongodb.getDb();
  const Friend = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    bday: req.body.bday,
  };
  db.collection("Friends")
    .updateOne({ _id: new objectId(req.params.id) }, { $set: Friend })
    .then((result) => {
      res.status(200).json({ message: "Friend updated" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating Friend", error: err });
    });
};

const deleteFriend = async (req, res) => {
  const db = mongodb.getDb();
  db.collection("Friends")
    .deleteOne({ _id: new objectId(req.params.id) })
    .then((result) => {
      res.status(200).json({ message: "Friend deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting Friend", error: err });
    });
};

module.exports = {
  getAllFriends,
  getOneFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};
