-- only uses one parent.  Needed for email address (and alt_email, if we get to that)
DELETE FROM parents;
INSERT INTO parents (name, email) VALUES ("Andrew", "Andy@gmail.com");

-- only one child for first iteration.  DB is built to accommodate multiple children in future releases.
DELETE FROM children;
-- in these seeds, Sophia swept the floor (10 pts) & took out the trash (15 pts) and got a cookie (-10 pts), so has 15 points left
INSERT INTO children (name, email, points) VALUES ("Sophia", "S@gmail.com", 15);
 
-- Put a few chores in the db
DELETE FROM chores;
INSERT INTO chores (title, points) VALUES
	("Fold laundry", 10),
	("Sweep floor", 10),
	("Take trash out", 15),
	("Clear dinner table", 5);

-- put a few rewards in the db
DELETE FROM rewards;
INSERT INTO rewards (title, points) VALUES
	("$25 Cash", 250),
	("Out to the movies", 150),
	("Out for ice cream", 100),
    ("One cookie", 10),
	("An hour of screen time", 60);

 -- put a few assignments in the db
DELETE FROM assignedchores;
INSERT INTO assignedchores (ChoreId, ChildId) VALUES
	(2, 1),   -- chore #2, sweep floor, assigned to child 1 (10 pts)
    (2, 1),   -- chore #2, sweep floor, assigned to child 1 (10 pts) (a second time)
	(3, 1);   -- chore #3, take trash out, assigned to child 1 (15 pts)

-- assume a few chores were done
DELETE FROM donechores;
INSERT INTO donechores (ChildId, ChoreId) VALUES
	(1, 2),    -- chore #2, sweep floor, was done by child 1 (10 pts)
	(1, 3);    -- chore #3, trash out, was done by child 1 (15 pts)
    

-- and a reward was given    
DELETE FROM usedpoints;    
INSERT INTO usedpoints (ChildId, RewardId) VALUES
	(1, 4);  -- child 1 got reward #4 (cookie for 10 points)