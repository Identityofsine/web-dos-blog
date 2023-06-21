
-- @block
CREATE TABLE file_system(
	id INT PRIMARY KEY AUTO_INCREMENT
);

-- @block
CREATE TABLE directory(
	id INT PRIMARY KEY AUTO_INCREMENT,
	parent_id INT,
	name VARCHAR(255) UNIQUE,
	FOREIGN KEY (parent_id) REFERENCES directory(id)
);

-- @block
CREATE TABLE files(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) UNIQUE,
	parent_id INT NOT NULL,
	blog_id INT,
	FOREIGN KEY (parent_id) REFERENCES directory(id),
	FOREIGN KEY (blog_id) REFERENCES blog(id)
);

-- @block
CREATE TABLE blog(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
	image VARCHAR(255),
	content TEXT,
	created_at DATETIME,
	updated_at DATETIME
);