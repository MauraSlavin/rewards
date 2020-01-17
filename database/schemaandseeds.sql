DROP DATABASE IF EXISTS rewards_db;
CREATE DATABASE rewards_db;

-- test database
USE rewards_db; 
-- Heroku database
USE vphg7hb2l22od01x;

-- parent table
DROP TABLE IF EXISTS parents;
CREATE TABLE parents (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	alt_email VARCHAR(255),
    createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp
	);


-- child table
DROP TABLE IF EXISTS children;
CREATE TABLE children (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	points INTEGER DEFAULT 0,
	Parent1Id INTEGER NOT NULL,
	Parent2Id INTEGER,
    createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (Parent1Id)
		REFERENCES parents(id),
	FOREIGN KEY (Parent2Id)
		REFERENCES parents(id)
	);
    
    
-- chores table
DROP TABLE IF EXISTS chores;
CREATE TABLE chores (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL UNIQUE,
	points INTEGER NOT NULL,
    iconfile VARCHAR(255) DEFAULT 'wash_dish.png',
    createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp
	);


-- rewards table
DROP TABLE IF EXISTS rewards;
CREATE TABLE rewards (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL UNIQUE,
	points INTEGER NOT NULL,
	iconfile VARCHAR(255) DEFAULT 'salary (1).png',
    createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp
	);

-- doneChores table
DROP TABLE IF EXISTS donechores;
CREATE TABLE donechores (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	ChoreId INTEGER,
	ChildId INTEGER,
	createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (ChoreId)
		REFERENCES chores(id),
	FOREIGN KEY (ChildID)
		REFERENCES children(id)
	);

-- usedpoints table
DROP TABLE IF EXISTS usedpoints;
CREATE TABLE usedpoints (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	RewardId INTEGER,
	ChildId INTEGER,
	createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (RewardId)
		REFERENCES rewards(id),
	FOREIGN KEY (ChildId)
		REFERENCES children(id)
	);

-- assignedchores table
DROP TABLE IF EXISTS assignedchores;
CREATE TABLE assignedchores (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	ChoreId INTEGER,
	ChildId INTEGER,
	createdAt DATETIME DEFAULT current_timestamp,
    updatedAt DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (ChoreId)
		REFERENCES chores(id),
	FOREIGN KEY (ChildId)
		REFERENCES children(id)
	);
    
-- I'm including inserting the id's, even though technically that's not required by SQL.
-- but if you don't know what the id is going to be, you risk getting an error when inserting a foreign id,
-- so I'm inserting id's so I'll know what they are for inserting seed data for testing.
-- only one child for first iteration.  DB is built to accommodate multiple children in future releases.

-- only uses one parent.  Needed for email address (and alt_email, if we get to that)
-- second parent is for dropdown list, to prep for future enhancements.
DELETE FROM parents;
INSERT INTO parents (id, name, email) VALUES 
	(1, 'Andrew', 'Andy@gmail.com'),
    (2, 'FunMom', 'mama@gmail.com');


DELETE FROM children;
-- in these seeds, Sophia did 220 worth of chores, and spent 175 chores for a balance of 45 point.
INSERT INTO children (id, name, email, points, Parent1Id, Parent2Id) VALUES 
	(1, 'Sophia', 'S@gmail.com', 45, 1, 2), 
	(2, 'Lauren', 'Lauren@gmail.com', 0, 1, NULL);   -- just for testing (second parent can be NULL), 0 points
 

-- Put a few chores in the db
DELETE FROM chores;
INSERT INTO chores (id, title, points, iconfile) VALUES
	(1, 'Bathe dog', 10, 'bath_dog.png'),
	(2, 'Workbook', 10, 'do_worbook.png'),
	(3, 'Watering', 10, 'watering.png'),
	(4, 'Pickup toys', 10, 'pickup_toys (1).png'),
    (5, 'Fish bowl', 10, 'fishbowl.png'),
    (6, 'Sweep room', 10, 'broom.png'),
    (7, 'Fold cloths', 20, 'folding-clothes.png'),
    (8, 'Make bed', 20, 'make_bed.png'),
    (9, 'Read book', 20, 'reading-book.png'),
    (10, 'Set table', 30, 'set_table_2.png'),
    (11,'Clear table', 30, 'table.png'),
    (12, 'Trash out', 30, 'trash.png'),
    (13, 'Vacuum', 40, 'vacuum.png'),
    (14, 'Walk dog', 40, 'walk_dog.png'),
    (15, 'Wash dishes', 40, 'wash_dish.png')
    ;


-- put a few rewards in the db
DELETE FROM rewards;
INSERT INTO rewards (id, title, points, iconfile) VALUES
	(1, 'Movie Night', 100, 'cinema.png'),
	(2, 'Screen Time', 150, 'computer.png'),
	(3, 'Family Time', 175, 'family.png'),
    (4, '$$ Money $$', 300, 'salary (1).png'),
	(5, 'Playdate', 250, 'playdate.png');


-- put a few assignments in the db
DELETE FROM assignedchores;
INSERT INTO assignedchores (id, ChoreId, ChildId) VALUES
	(1, 8, 1),   -- chore #8, make bed, assigned to child 1 (20 pts)
    (2, 10, 1),   -- chore #10, Set table, assigned to child 1 (30 pts)
	(3, 11, 1);   -- chore #11, Clear table, assigned to child 1 (30 pts)
    
    
-- put a few chore completed in the database
DELETE FROM donechores;
INSERT INTO donechores (id, ChildId, ChoreId) VALUES
	(1, 1, 7),   -- chore #7, fold, assigned to child 1 (20 pts)
    (2, 1, 9),   -- chore #9, read, assigned to child 1 (20 pts) (a second time)
	(3, 1, 11),   -- chore #11, clear table, assigned to child 1 (30 pts)
    (4, 1, 13),   -- chore #13, vacuum, done by to child 1 (40 pts)
    (5, 1, 12),   -- chore #12, trash out, done by to child 1 (30 pts)
    (6, 1, 14),   -- chore #14, walk dog, done by to child 1 (40 pts)    
    (7, 1, 13);   -- chore #13, vacuum (again), done by to child 1 (40 pts) 
    

-- and a reward was given    
DELETE FROM usedpoints;    
INSERT INTO usedpoints (id, ChildId, RewardId) VALUES
	(1, 1, 3);  -- child 1 got reward #3 (family time for 175 points)
    

-- Verify each table has what you expect it to.
SELECT * FROM parents;
SELECT * FROM children;
SELECT * FROM chores;
SELECT * FROM rewards;
SELECT * FROM donechores;
SELECT * FROM usedpoints;
SELECT * FROM assignedchores;    