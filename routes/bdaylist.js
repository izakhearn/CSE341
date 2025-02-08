const express = require('express');
const router = express.Router();

const bdaylistController = require('../controllers/bdaylist');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/auth');

router.get('/', bdaylistController.bdaylist);
router.get('/:id', bdaylistController.getbdaylistbyid);
router.post('/',isLoggedIn, validate.saveBdaylistItem, bdaylistController.createbdaylist);
router.put('/:id',isLoggedIn, validate.saveBdaylistItem, bdaylistController.updatebdaylist);
router.delete('/:id',isLoggedIn, bdaylistController.deletebdaylist);

module.exports = router;