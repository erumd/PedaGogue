const router = require('express').Router();
// const { Post } = require('../models');
// const { User } = require('../models');

const apiRoutes = require('./api');
const userRoutes = require('../controllers/api/userRoutes');

router.use('/', apiRoutes);
router.use('/', userRoutes);

// router.get('/', (req, res) =>
//   res.send('Pedagogue Under Construction. Trying to set up Routes ')
// );

module.exports = router;
