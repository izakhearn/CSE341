const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Hello, world!');
}
);

router.use('/contacts', require('./contacts'));
router.use('/api-docs', require('./swagger'));



module.exports = router;