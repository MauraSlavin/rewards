/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const db = require('../models');
const email = require('../email.js');

// get list of chores
router.get('/chores', (req, res) => {
  console.log(`This is the request ${req}`);
  console.log(`This is the response ${res}`);
  db.Chore.findAll({}).then((dbChore) => {
    res.json(dbChore);
  });
});

// get list of rewards
router.get('/rewards', (req, res) => {
  console.log(`This is the request ${req}`);
  console.log(`This is the response ${res}`);
  db.Reward.findAll({}).then((dbReward) => {
    res.json(dbReward);
    dbReward.forEach((reward) => {
      console.log(`Reward: ${reward.title} costs ${reward.points}.`);
    });
  });
});

// get list of chores assigned by child id
// NOTE:  will always be  .../assignedchores/1  for first release, since only one child
router.get('/assignedchores/:id', (req, res) => {
  console.log(`This is the response ${res}`);
  //     // Include needed to get the name of the chore from the chores table
  db.AssignedChore.findAll({
    where: {
      ChildId: req.params.id,
    },
    include: [db.Chore],
  }).then((dbChore) => {
    res.json(dbChore); // Maura added
    // console.log('Chores assigned:');
    // dbChore.forEach((assignedchore) => {
    //   console.log(assignedchore.Chore.title);
    // });
  });
});

// get child's total points
router.get('/children/points/:id', (req, res) => {
  console.log(`This is the response ${res}`);
  db.Child.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChild) => {
    res.json(dbChild);
    // console.log(`Child's points: ${dbChild.points}.`); // Maura  console logged 15 with test data
  });
});

// Maura added
// get names of children in children table to populate dropdown list
router.get('/children', (req, res) => {
  console.log(`This is the request ${req}`);
  console.log(`This is the response ${res}`);
  db.Child.findAll({}).then((dbChild) => {
    res.json(dbChild);
  });
});

// when a chore is completed, the assignedchore record gets deleted (destroyed),
//    and the child's points gets incremented by the points the chore was worth.
// First - get the ChoreId from the AssignedChores table
// Second - get chorepoints (points the chore is worth)
// Third - destroy assignedchores record
// Fourth - update child's total points
// Fifth - add a record to the donechores table

// FIRST
// First - get the choreId from the assignedchores table
router.get('/assignedchores/choreid/:id', (req, res) => {
  console.log(`This is the response ${res}`);
  db.AssignedChore.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChore) => {
    const choreId = dbChore.ChoreId;
    // console.log(`The choreId for this assigned chore is ${choreId}.`);
    res.json(dbChore);
  });
});

// SECOND
// Second - get chorepoints
router.get('/chores/points/:id', (req, res) => {
  console.log(`This is the response ${res}`);
  db.Chore.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChore) => {
    const chorePoints = dbChore.points;
    // console.log(`This chore is worth ${chorePoints} points.`);
    res.json(dbChore);
  });
});

// THIRD
// Third - destroy assignedchores record by assignedchore id
router.delete('/assignedchores/:id', (req, res) => {
  console.log(`This is the response ${res}`);
  db.AssignedChore.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbAssignedChore) => {
    res.json(200);
    console.log(dbAssignedChore);
    console.log(`Assigned chore with id of ${req.params.id} has been deleted.`);
  }).catch(() => {
    res.send(500, 'Error deleting a record from the assignedChores table.');
  });
});

// FOURTH
// Fourth Then update the total points for the child
router.put('/children/:id/:chorepoints', (req, res) => {
  console.log(`This is the response ${res}`);
  // const newPoints = points + req.params.chorepoints.
  //   model.decrement(['number', 'count'], { by: 2, where: { foo: 'bar' } });
  db.Child.increment('points', {
    by: req.params.chorepoints,
    where: {
      id: req.params.id,
    },
  }).then((dbChild) => {
    //   res.json(dbChild);  // Maura commented
    console.log(dbChild); // Maura  console logged 15 with test data!
    console.log(
      `The child's points have been incremented by ${req.params.chorepoints}.`,
    );
    res.send('Your points have been added!');
  });
});

// FIFTH
// Fifth - add a record to the donechores table
// with the chore id and the child id
router.post('/donechores/:childid/:choreid', (req, res) => {
  console.log(`This is the response ${res}`);
  db.DoneChore.create({
    ChildId: req.params.childid,
    ChoreId: req.params.choreid,
  }).then((dbDone) => {
    res.json(dbDone); // Maura commented
    // console.log(dbDone); // Maura
    console.log(
      `A record of the done chore with chore id of ${req.params.choreid} has been added.`,
    );
  });
});

// Assign a chore to the child
router.post('/assignedchores/:childid/:choreid', (req, res) => {
  console.log(`This is the response ${res}`);
  db.AssignedChore.create({
    ChildId: req.params.childid,
    ChoreId: req.params.choreid,
  }).then((dbChore) => {
    // res.json(dbChore);
    console.log(dbChore); // Maura
    console.log(`Chore ID ${req.params.choreid} has been assigned.`);
  });
});

// Un-assign a chore from the child  (delete the record from the assignedchores table)
router.delete('/assignedchores/:childid/:choreid', (req, res) => {
  console.log(`This is the response ${res}`);
  db.AssignedChore.destroy({
    where: {
      ChildId: req.params.childid,
      ChoreId: req.params.choreid,
    },
  }).then((dbAssignedChore) => {
    //   res.json(dbAssignedChore);
    console.log(dbAssignedChore);
    console.log(`Chore ID ${req.params.choreid} has been UN-assigned.`);
  });
});

// When a reward is chosen
// 1)  add a record to the pointsused table
// 2)  subtract the points from the child's point total in the children table

// 1)  add a record to the usedpoints table
router.post('/usedpoints/:childid/:rewardid', (req, res) => {
  // console.log(`This is the response ${res}`);
  email.transporter.sendMail(email.mailOptions('dahamilton10@yahoo.com', 'Your child has redeemed a reward', `<p> Hello World </p>`), function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  db.UsedPoint.create({
    ChildId: req.params.childid,
    RewardId: req.params.rewardid,
  }).then((dbUsed) => {
    //   res.json(dbUsed);  // Maura commented
    console.log(dbUsed); // Maura
    console.log(`Reward ID# ${req.params.rewardid} has been chosen.`);
  });
});
//

// 2)  subtract the points from the child's point total in the children table
// Use router.put("/children/:id/:chorepoints"
// from earlier in this module, sending a negative number.

// Maura - get all parents info
router.get('/parents', (req, res) => {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  console.log(`This is the response ${res}`);
  db.Parent.findAll({}).then((dbParent) => {
    res.json(dbParent);
    // console.log(dbParent.email); // Maura  returned Andy@gmail.com!!
    // console.log(dbParent.alt_email);
  });
});

// Maura - get parent email(s), given the parent id
router.get('/parents/:id', (req, res) => {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  console.log(`This is the response ${res}`);
  db.Parent.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbParent) => {
    res.json(dbParent);
    // console.log(dbParent.email); // Maura  returned Andy@gmail.com!!
    // console.log(dbParent.alt_email);
  });
});

// Maura - get child email, given the child id
router.get('/children/:id', (req, res) => {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  console.log(`This is the response ${res}`);
  db.Child.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChild) => {
    res.json(dbChild);
    console.log('dbChild (for dbCHild.email):');
    // console.log(dbChild);
    // console.log(dbChild.email); // Maura  returned S@gmail.com!!
  });
});

module.exports = router;
