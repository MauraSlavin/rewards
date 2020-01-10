-- I'm including inserting the id's, even though technically that's not required by SQL.
-- but if you don't know what the id is going to be, you risk getting an error when inserting a foreign id,
-- so I'm inserting id's so I'll know what they are for inserting seed data for testing.

-- only uses one parent.  Needed for email address (and alt_email, if we get to that)
DELETE FROM parents;
INSERT INTO parents (id, name, email) VALUES (1, 'Andrew', 'Andy@gmail.com');

-- only one child for first iteration.  DB is built to accommodate multiple children in future releases.
DELETE FROM children;
-- in these seeds, Sophia swept the floor (10 pts) & took out the trash (15 pts) and got a cookie (-10 pts), so has 15 points left
INSERT INTO children (id, name, email, points) VALUES (1, 'Sophia', 'S@gmail.com', 15);
 
-- Put a few chores in the db
DELETE FROM chores;
INSERT INTO chores (id, title, points, iconfile) VALUES
	(1, 'Fold laundry', 10, 'folding-clothes.png'),
	(2, 'Sweep floor', 10, 'broom.png'),
	(3, 'Take trash out', 15, 'trash.png'),
	(4, 'Clear dinner table', 5, 'table.png');

-- put a few rewards in the db
DELETE FROM rewards;
INSERT INTO rewards (id, title, points, iconfile) VALUES
	(1, '$25 Cash', 250, 'salary (1).png'),
	(2, 'Out to the movies', 150, 'cinema.png'),
	(3, 'Reading a book with a parent', 100, 'reading-book.png'),
    (4, 'Family game night', 15, 'family.png'),
	(5, 'An hour of screen time', 60, 'computer.png');

 -- put a few assignments in the db
DELETE FROM assignedchores;
INSERT INTO assignedchores (id, ChoreId, ChildId) VALUES
	(1, 2, 1),   -- chore #2, sweep floor, assigned to child 1 (10 pts)
    (2, 2, 1),   -- chore #2, sweep floor, assigned to child 1 (10 pts) (a second time)
	(3, 3, 1);   -- chore #3, take trash out, assigned to child 1 (15 pts)

-- assume a few chores were done
DELETE FROM donechores;
INSERT INTO donechores (id, ChildId, ChoreId) VALUES
	(1, 1, 2),    -- chore #2, sweep floor, was done by child 1 (10 pts)
	(2, 1, 3);    -- chore #3, trash out, was done by child 1 (15 pts)
    

-- and a reward was given    
DELETE FROM usedpoints;    
INSERT INTO usedpoints (id, ChildId, RewardId) VALUES
	(1, 1, 4);  -- child 1 got reward #4 (cookie for 10 points)
    
-- Verify each table has what you expect it to.
SELECT * FROM parents;
SELECT * FROM children;
SELECT * FROM chores;
SELECT * FROM rewards;
SELECT * FROM donechores;
SELECT * FROM usedpoints;
SELECT * FROM assignedchores;