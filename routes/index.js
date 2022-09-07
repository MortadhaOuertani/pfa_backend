var express = require('express');
const { register, login,Test, admin } = require('../controllers/users.controllers');
var router = express.Router();
const passport = require('passport');
const { inRole, ROLES } = require('../security/roleMiddleware');
const { addprofile, findallprofiles, findsingleprofile, deleteprofile } = require('../controllers/profile.controller');

/* user routes. */
router.post('/register',register);
router.post('/login',login)

/* Profile*/
router.post('/profile', passport.authenticate('jwt', { session: false }),addprofile)

/*admin*/
router.get('/profiles', passport.authenticate('jwt', { session: false }),findallprofiles)
router.get('/profile', passport.authenticate('jwt', { session: false }),findsingleprofile)
router.delete('/admin/:id', passport.authenticate('jwt', { session: false }),inRole(ROLES.ADMIN),deleteprofile)





module.exports = router;
