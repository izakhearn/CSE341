const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friends');
const isLoggedIn = require('../middleware/auth');
const validate = require('../middleware/validate');


router.get('/', friendController.getAllFriends);
router.get('/:id', friendController.getOneFriend);
router.post('/', isLoggedIn,validate.saveFriend, friendController.createFriend);
router.put('/:id',isLoggedIn, validate.saveFriend, friendController.updateFriend);
router.delete('/:id',isLoggedIn, friendController.deleteFriend);

module.exports = router;