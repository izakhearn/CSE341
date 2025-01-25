const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friends');
const validate = require('../middleware/validate');

router.get('/', friendController.getAllFriends);
router.get('/:id', friendController.getOneFriend);
router.post('/', validate.saveFriend, friendController.createFriend);
router.put('/:id', validate.saveFriend, friendController.updateFriend);
router.delete('/:id', friendController.deleteFriend);

module.exports = router;