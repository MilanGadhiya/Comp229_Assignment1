/* index.js Milan Gadhiya 301297324 08/02/2023 */
var express = require('express');
var controller = require('../server/controller/controller');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

router.get('/contactlist', function(req, res, next) {
  axios.get('http://localhost:3000/api/contactlist')
      .then(function(response){
          res.render('contactlist', { users : response.data, title: 'ContactList' });
      })
      .catch(err =>{
          res.send(err);
      })
});

router.get('/add-contact', function(req, res, next) {
  res.render('add_contact', { title: 'Add Contact' });
});

router.get('/update-contact', function(req, res, next) {
  axios.get('http://localhost:3000/api/contactlist', { params : { id : req.query.id }})
      .then(function(contactdata){
          res.render("update_contact", { title: 'Update Contact', contact : contactdata.data})
      })
      .catch(err =>{
          res.send(err);
      })
});

// API
router.post('/api/contactlist', controller.create);
router.get('/api/contactlist', controller.find);
router.put('/api/contactlist/:id', controller.update);
router.delete('/api/contactlist/:id', controller.delete);

module.exports = router;
