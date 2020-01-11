const db = require('../models');

module.exports = (app) => {
  // get list of chores
  app.get('/api/chores', (req, res) => {
    console.log(`This is the request ${req}`);
    console.log(`This is the response ${res}`);
    db.Chore.findAll({}).then((dbChore) => {
      //   res.json(dbChore);  // Maura commented
      dbChore.forEach((chore) => {
        console.log(`Chore: ${chore.title} for ${chore.points}.`);
      });
    });
  });

  // get list of rewards
  app.get('/api/rewards', (req, res) => {
    console.log(`This is the request ${req}`);
    console.log(`This is the response ${res}`);
    db.Reward.findAll({}).then((dbReward) => {
      //   res.json(dbChore);  // Maura commented
      dbReward.forEach((reward) => {
        console.log(`Reward: ${reward.title} costs ${reward.points}.`);
      });
    });
  });

  // get list of chores assigned by child id
  // NOTE:  will always be  .../api/assignedchores/1  for first release, since only one child
  app.get('/api/assignedchores/:id', (req, res) => {
    console.log(`This is the response ${res}`);
    //     // Include needed to get the name of the chore from the chores table
    db.AssignedChore.findAll({
      where: {
        ChildId: req.params.id,
      },
      include: [db.Chore],
    }).then((dbChore) => {
      //   res.json(dbChore);  // Maura commented
      console.log('Chores assigned:');
      dbChore.forEach((assignedchore) => {
        console.log(assignedchore.Chore.title);
      });
    });
  });

  // get child's total points
  app.get('/api/children/points/:id', (req, res) => {
    console.log(`This is the response ${res}`);
    db.Child.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbChild) => {
      //   res.json(dbChild);  // Maura commented
      console.log(`Child's points: ${dbChild.points}.`); // Maura  console logged 15 with test data!
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
  app.get('/api/assignedchores/choreid/:id', (req, res) => {
    console.log(`This is the response ${res}`);
    db.AssignedChore.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbChore) => {
      const choreId = dbChore.ChoreId;
      console.log(`The choreId for this assigned chore is ${choreId}.`);
      return choreId;
    });
  });

  // SECOND
  // Second - get chorepoints
  app.get('/api/chores/points/:id', (req, res) => {
    console.log(`This is the response ${res}`);
    db.Chore.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbChore) => {
      const chorePoints = dbChore.points;
      console.log(`This chore is worth ${chorePoints} points.`);
      return chorePoints;
    });
  });

  // THIRD
  // Third - destroy assignedchores record by assignedchore id
  app.delete('/api/assignedchores/:id', (req, res) => {
    console.log(`This is the response ${res}`);
    db.AssignedChore.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbAssignedChore) => {
      //   res.json(dbAssignedChore);
      console.log(dbAssignedChore);
      console.log(`Assigned chore with id of ${req.params.id} has been deleted.`);
    });
  });

  // FOURTH
  // Fourth Then update the total points for the child
  app.put('/api/children/:id/:chorepoints', (req, res) => {
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
      console.log(`The child's points have been incremented by ${req.params.chorepoints}.`);
    });
  });

  // FIFTH
  // Fifth - add a record to the donechores table
  // with the chore id and the child id
  app.post('/api/donechores/:childid/:choreid', (req, res) => {
    console.log(`This is the response ${res}`);
    db.DoneChore.create({
      ChildId: req.params.childid,
      ChoreId: req.params.choreid,
    }).then((dbDone) => {
      //   res.json(dbDone);  // Maura commented
      console.log(dbDone); // Maura
      console.log(`A record of the done chore with chore id of ${req.params.choreid} has been added.`);
    });
  });

  // Assign a chore to the child
  app.post('/api/assignedchores/:childid/:choreid', (req, res) => {
    console.log(`This is the response ${res}`);
    db.AssignedChore.create({
      ChildId: req.params.childid,
      ChoreId: req.params.choreid,
    }).then((dbChore) => {
      //   res.json(dbChore);  // Maura commented
      console.log(dbChore); // Maura
      console.log(`Chore ID ${req.params.choreid} has been assigned.`);
    });
  });


  // Un-assign a chore from the child  (delete the record from the assignedchores table)
  app.delete('/api/assignedchores/:childid/:choreid', (req, res) => {
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
  app.post('/api/usedpoints/:childid/:rewardid', (req, res) => {
    console.log(`This is the response ${res}`);
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
  // Use app.put("/api/children/:id/:chorepoints"
  // from earlier in this module, sending a negative number.


  // Maura - get parent email(s)
  app.get('/api/parents/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log(`This is the response ${res}`);
    db.Parent.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbParent) => {
      //   res.json(dbParent);  // Maura commented
      console.log(dbParent.email); // Maura  returned Andy@gmail.com!!
      console.log(dbParent.alt_email);
    });
  });

  // Maura - get child email
  app.get('/api/children/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log(`This is the response ${res}`);
    db.Child.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbChild) => {
      //   res.json(dbParent);  // Maura commented
      console.log(dbChild.email); // Maura  returned S@gmail.com!!
    });
  });
};
