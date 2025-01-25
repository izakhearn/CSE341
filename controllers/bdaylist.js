const mongodb = require("../data/database");
const objectId  = require("mongodb").ObjectId;

bdaylist = async (req, res) => {
    const db = mongodb.getDb();
    const Bdaylist = await db.collection("Bdaylist").find();
    Bdaylist
        .toArray()
        .then((Bdaylist) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(Bdaylist);
        })
        .catch((err) => {
        res.status(500).json({ message: "Error fetching Bdaylist", error: err });
        });
    };

getbdaylistbyid = async (req, res) => {
    const db = mongodb.getDb();
    const Bdaylist = await db
    .collection("Bdaylist")
    .findOne({ _id: new objectId(req.params.id) });

    if (Bdaylist) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(Bdaylist);
        }
        else {
        res.status(404).json({ message: "Bdaylist not found" });  
        }
};

createbdaylist = async (req, res) => {
    const db = mongodb.getDb();
    console.log(req.body);
    const Bdaylist = {
        friendId: req.body.friendId,
        category: req.body.category,
        itemName: req.body.itemName,
        cost: req.body.cost,
    };

    db.collection("Bdaylist")
        .insertOne(Bdaylist)
        .then((result) => {
        res.status(201).json({ id: result.insertedId, message: " Bday List Items created" });
        })
        .catch((err) => {
        res.status(500).json({ message: "Error creating Bdaylist item for Friend", error: err });
        });
}

updatebdaylist = async (req, res) => {
    const db = mongodb.getDb();
    const Bdaylist = {
        friendId: req.body.friendId,
        category: req.body.category,
        itemName: req.body.itemName,
        cost: req.body.cost,
    };

    db.collection("Bdaylist")
        .updateOne({ _id: new objectId(req.params.id) }, { $set: Bdaylist })
        .then((result) => {
        res.status(200).json({ message: "Bdaylist item updated" });
        })
        .catch((err) => {
        res.status(500).json({ message: "Error updating Bdaylist item", error: err });
        });
}

deletebdaylist = async (req, res) => {
    const db = mongodb.getDb();
    db.collection("Bdaylist")
        .deleteOne({ _id: new objectId(req.params.id) })
        .then((result) => {
        res.status(200).json({ message: "Bdaylist item deleted" });
        })
        .catch((err) => {
        res.status(500).json({ message: "Error deleting Bdaylist item", error: err });
        });
}

module.exports = {
    bdaylist,
    getbdaylistbyid,
    createbdaylist,
    updatebdaylist,
    deletebdaylist,
};