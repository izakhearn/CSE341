const router = require('express').Router();


router.use('/friends', require('./friends'));
router.use('/bdaylist', require('./bdaylist'));
router.use('/api-docs', require('./swagger'));



module.exports = router;