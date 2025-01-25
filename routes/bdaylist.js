const express = require('express');
const router = express.Router();

const bdaylistController = require('../controllers/bdaylist');
const validate = require('../middleware/validate');

router.get('/', bdaylistController.bdaylist);
router.get('/:id', bdaylistController.getbdaylistbyid);
router.post('/', validate.saveBdaylistItem, bdaylistController.createbdaylist);
router.put('/:id', validate.saveBdaylistItem, bdaylistController.updatebdaylist);
router.delete('/:id', bdaylistController.deletebdaylist);

module.exports = router;