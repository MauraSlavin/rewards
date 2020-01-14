DROP DATABASE IF EXISTS rewards_db;
CREATE DATABASE rewards_db;

USE rewards_db;


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
	iconfile VARCHAR(255) DEFAULT 'reading-book.png',
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