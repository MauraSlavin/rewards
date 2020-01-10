const router = require('express').Router();

// const db = require('../models');

// router.get('/', (req, res) => res.json('Sample API get endpoint'));
// chores by child
router.get('/chores', (req, res) => {
  res.send('gets chores');
});

// POST create, create a new activity
router.post('/chores', (req, res) => {
  res.send('Create individual activity');
});

// PUT updates an activity by id
router.put('/chores/:id', (req, res) => {
  res.send('updates an activity by id');
});

// GET individual activity by id
router.get('/chores/:id', (req, res) => {
  res.send('gets individual activity');
});


module.exports = router;
