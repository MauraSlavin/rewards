-- only uses one parent.  Needed for email address (and alt_email, if we get to that)
DELETE FROM parents;
INSERT INTO parents (name, email, createdAt, updatedAt) VALUES ("Andrew", "Andy@gmail.com", CURRENT_TIME(), CURRENT_TIME());

-- only one child for first iteration.  DB is built to accommodate multiple children in future releases.
DELETE FROM children;
-- in these seeds, Sophia swept the floor (10 pts) & took out the trash (15 pts) and got a cookie (-10 pts), so has 15 points left
INSERT INTO children (name, email, points, createdAt, updatedAt) VALUES ("Sophia", "S@gmail.com", 15, CURRENT_TIME(), CURRENT_TIME());
 
-- Put a few chores in the db
DELETE FROM chores;
INSERT INTO chores (title, points, createdAt, updatedAt) VALUES
	("Fold laundry", 10, CURRENT_TIME(), CURRENT_TIME()),
	("Sweep floor", 10, CURRENT_TIME(), CURRENT_TIME()),
	("Take trash out", 15, CURRENT_TIME(), CURRENT_TIME()),
	("Clear dinner table", 5, CURRENT_TIME(), CURRENT_TIME());

-- put a few rewards in the db
DELETE FROM rewards;
INSERT INTO rewards (title, points, createdAt, updatedAt) VALUES
	("$25 Cash", 250, CURRENT_TIME(), CURRENT_TIME()),
	("Out to the movies", 150, CURRENT_TIME(), CURRENT_TIME()),
	("Out for ice cream", 100, CURRENT_TIME(), CURRENT_TIME()),
    ("One cookie", 10, CURRENT_TIME(), CURRENT_TIME()),
	("An hour of screen time", 60, CURRENT_TIME(), CURRENT_TIME());

 -- put a few assignments in the db
DELETE FROM assignedchores;
INSERT INTO assignedchores (ChoreId, ChildId, createdAt, updatedAt) VALUES
	(2, 1, CURRENT_TIME(), CURRENT_TIME()),   -- chore #2, sweep floor, assigned to child 1 (10 pts)
    (2, 1, CURRENT_TIME(), CURRENT_TIME()),   -- chore #2, sweep floor, assigned to child 1 (10 pts) (a second time)
	(3, 1, CURRENT_TIME(), CURRENT_TIME());   -- chore #3, take trash out, assigned to child 1 (15 pts)

-- assume a few chores were done
DELETE FROM donechores;
INSERT INTO donechores (ChildId, ChoreId, createdAt, updatedAt) VALUES
	(1, 2, CURRENT_TIME(), CURRENT_TIME()),    -- chore #2, sweep floor, was done by child 1 (10 pts)
	(1, 3, CURRENT_TIME(), CURRENT_TIME());    -- chore #3, trash out, was done by child 1 (15 pts)
    

-- and a reward was given    
DELETE FROM usedpoints;    
INSERT INTO usedpoints (ChildId, RewardId, createdAt, updatedAt) VALUES
	(1, 4, CURRENT_TIME(), CURRENT_TIME());  -- child 1 got reward #4 (cookie for 10 points)