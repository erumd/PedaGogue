const router = require('express').Router();
const userRoutes = require('./userRoutes');

// router.use('/home', userRoutes);
router.use('/users', userRoutes);
module.exports = router;
