/* index.js Milan Gadhiya 301297324 08/02/2023 */
var express = require('express');
var controller = require('../server/controller/controller');
var router = express.Router();
var axios = require('axios');
var getBaseUrl = () => {
  // custom base URL logic examples:
  // - to request a current URL without the search parameters part:
  let baseUrl = window.location.href.slice(0, -window.location.search.length);

  //// or to insert '/api' after the host part
  //let baseUrl = window.location.host + '/api' + window.location.pathname;

  // ensure slash at the end
  if (baseUrl[baseUrl.length - 1] != '/') baseUrl = baseUrl + '/';

  return baseUrl;
};

var axiosConfig = {
  baseURL: this.getBaseUrl(),
};
var axiosInstance = axios.create(axiosConfig);

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
  axiosInstance.get('/contactlist')
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
