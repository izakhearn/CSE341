const validator = require('../helpers/validate');
const objectId = require('mongoose').Types.ObjectId;

const saveFriend = async (req, res, next) => {
    const validationRule = {
        name: 'required',
        email: 'required|email',
        phone: 'required',
        bday: 'required'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                status: false,
                message: "Validation failed",
                data: err
            });
        } else {
         next();
        }
    })};

const saveBdaylistItem = async (req, res, next) => {
    const validationRule = {
        friendId: 'required',
        category: 'required',
        itemName: 'required',
        cost: 'required'
    };
    //Check if the friendId is a valid ObjectId in the database
    if (!objectId.isValid(req.body.friendId)) {
        return res.status(412).send({
            status: false,
            message: "Validation failed",
            data: "Invalid friendId"
        });
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                status: false,
                message: "Validation failed",
                data: err
            });
        } else {
         next();
        }
    })}

module.exports = {
    saveFriend,
    saveBdaylistItem
};
