/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
const router = require("express").Router();
const db = require("../models");
const email = require("../email.js");

// get list of chores
router.get("/chores", (req, res) => {
  db.Chore.findAll({}).then((dbChore) => {
    res.json(dbChore);
  });
});

// get list of rewards
router.get("/rewards", (req, res) => {
  db.Reward.findAll({}).then((dbReward) => {
    res.json(dbReward);
  });
});

// get list of chores assigned by child id
// NOTE:  will always be  .../assignedchores/1  for first release, since only one child
router.get("/assignedchores/:id", (req, res) => {
  // Include needed to get the name of the chore from the chores table
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  db.Assignedchore.findAll({
    where: {
      ChildId: req.params.id,
    },
    include: [db.Chore],
  }).then((dbChore) => {
    res.json(dbChore);
  });
});

// get child's total points
router.get("/children/points/:id", (req, res) => {
  db.Child.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChild) => {
    res.json(dbChild);
  });
});

// get names of children in children table to populate dropdown list
router.get("/children", (req, res) => {
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
router.get("/assignedchores/choreid/:id", (req, res) => {
  db.Assignedchore.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChore) => {
    const choreId = dbChore.ChoreId;
    res.json(dbChore);
  });
});

// SECOND
// Second - get chorepoints
router.get("/chores/points/:id", (req, res) => {
  db.Chore.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChore) => {
    const chorePoints = dbChore.points;
    res.json(dbChore);
  });
});

// THIRD
// Third - destroy assignedchores record by assignedchore id
router.delete("/assignedchores/:id", (req, res) => {
  db.Assignedchore.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbAssignedChore) => {
      res.json(200);
    })
    .catch(() => {
      res.send(500, "Error deleting a record from the assignedChores table.");
    });
});

// FOURTH
// Fourth Then update the total points for the child
router.put("/children/:id/add/:chorepoints", (req, res) => {
  db.Child.increment("points", {
    by: req.params.chorepoints,
    where: {
      id: req.params.id,
    },
  })
    .then((dbChild) => {
      console.log(
        `The child's points have been incremented by ${req.params.chorepoints}.`,
      );
      res.send("Your points have been added!");
    })
    .catch((err) => {
      console.log(err);
    });
});

// FIFTH
// Fifth - add a record to the donechores table
// with the chore id and the child id
router.post("/donechores/:childid/:choreid", (req, res) => {
  db.Donechore.create({
    ChildId: req.params.childid,
    ChoreId: req.params.choreid,
  }).then((dbDone) => {
    res.json(dbDone);
    console.log(
      `A record of the done chore with chore id of ${req.params.choreid} has been added.`,
    );
  });
});

// Assign a chore to the child
router.post("/assignedchores/:childid/:choreid", (req, res) => {
  db.Assignedchore.create({
    ChildId: req.params.childid,
    ChoreId: req.params.choreid,
  }).then((dbChore) => {
    res.json(dbChore); // returns the whole chore object (need the new id)
  });
});

// Un-assign a chore from the child  (delete the record from the assignedchores table)
router.delete("/assignedchores/:childid/:choreid", (req, res) => {
  db.Assignedchore.destroy({
    where: {
      ChildId: req.params.childid,
      ChoreId: req.params.choreid,
    },
  }).then((dbAssignedChore) => {
    //   res.json(dbAssignedChore);
    console.log(`Chore ID ${req.params.choreid} has been UN-assigned.`);
  });
});

// When a reward is chosen
// 1)  send the parent an email
// 2)  add a record to the pointsUsed table
// 3)  subtract the points from the child's point total in the children table

// 1)  add a record to the usedpoints table
router.post("/usedpoints/:childid/:rewardid", (req, res) => {
  console.log("in usedpoints/childid/rewardid");
  console.log(`childid: ${req.params.childid}`);
  console.log(`rewardid: ${req.params.rewardid}`);
  // console.log(`This is the response ${res}`);
  // 1)  send the parent an email
  //    get the parent's email, then send it via mailOptions
  db.Parent.findOne({}).then((dbParent) => {
    email.transporter.sendMail(
      email.mailOptions(
        dbParent.email,
        "Your child has redeemed a reward",
        `<p> Your child has chosen a reward </p>`,
      ),
      function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      },
    );
  });

  // 2)  add a record to the pointsUsed table
  db.Usedpoint.create({
    ChildId: req.params.childid,
    RewardId: req.params.rewardid,
  })
    .then((dbUsed) => {
      console.log(`Reward ID# ${req.params.rewardid} has been chosen.`);
      res.json(dbUsed);
    })
    .catch((err) => {
      console.log(err);
    });
});
//

// 3)  subtract the points from the child's point total in the children table
// route /children/:id/sub/:chorepoints is called (route later in this module) from rewards.js

// get all parents info
router.get("/parents", (req, res) => {
  db.Parent.findAll({}).then((dbParent) => {
    res.json(dbParent);
  });
});

// get parent email(s), given the parent id
router.get("/parents/:id", (req, res) => {
  db.Parent.findOne({
    where: {
      // the id is passed in via is req.params.id & the route (after /parents/)
      // :id in '/parents/:id' route corresponds to .id in system variable 'req.params.id'
      // 'req.' in 'req.params.id' corresponds to 'req' in 'router.get(...(req,res)...'
      id: req.params.id,
    },
  }).then((dbParent) => {
    res.json(dbParent);
  });
});

// get child email, given the child id
router.get("/children/:id", (req, res) => {
  db.Child.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbChild) => {
    res.json(dbChild);
    console.log("dbChild (for dbCHild.email):");
  });
});

//
//  Decrement the child's total points after a reward is claimed
router.put("/children/:id/sub/:chorepoints", (req, res) => {
  db.Child.decrement("points", {
    by: req.params.chorepoints,
    where: {
      id: req.params.id,
    },
  })
    .then((dbChild) => {
      console.log(
        `The child's points have been decremented by ${req.params.chorepoints}.`,
      );
      res.send(
        "Your points have been used for the reward and updated in the children table!",
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/emailChild", (res, req) => {
  db.Parent.findOne({}).then((dbParent) => {
    email.transporter.sendMail(
      email.mailOptions(
        dbParent.email,
        "Your child is requesting parent approval",
        `<p> Your child has completed a chore. Head over to them to verify that they have done their chores. </p>`,
      ),
      function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        res.send("Email sent");
      },
    );
  });
});

module.exports = router;
