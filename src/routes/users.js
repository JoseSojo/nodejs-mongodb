const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User.js')
const { OffSession,OnSession } = require('../helpers/auth.js');

router.get('/login', OffSession, (req, res) => {
  res.render('users/login.hbs');
});

router.get('/register', OffSession, (req, res) => {
  res.render('users/register.hbs');
});

router.get('/user/logout', OnSession, (req,res) => {
  req.logout();
  res.redirect('/login');
});

router.post('/register', OffSession, async (req,res) => {
  const { username, email, password, confirm_password } = req.body;
  if(username.length < 0 || email.length < 0 || password.length < 5 || (password != confirm_password)) {
    req.flash('err', 'Asegurese de completar los campos correctamente.')
    res.redirect('/register');
  } else{
    const useEmail = await User.findOne({email: email});
    if(useEmail) {
      req.flash('err', 'El Correo ya está en uso.')
      res.redirect('/register');
    }
    const NewUser = new User({username, email, password});
    NewUser.password = await NewUser.encryptPassword(NewUser.password);
    await NewUser.save();
    req.flash('succ', 'Registrado Exitosamente, Inicia Sessión.');
    res.redirect('/login');
  }
});

router.post('/login', OffSession, passport.authenticate('local', {
  successRedirect: '/note',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
