-- @block
INSERT INTO file_system () VALUES ();

-- @block
INSERT INTO directory (name) VALUES ('featured');

-- @block
INSERT INTO directory (name, parent_id) VALUES ('test_folder', 1);

-- @block
INSERT INTO files (name, parent_id, blog_id) VALUES ('example', 1, 1);

-- @block
INSERT INTO blog (title, image, content, created_at, updated_at) VALUES ('Welcome to Adonis', 'https://i.imgur.com/azibwYe.jpeg', 'Welcome to Adonis, a blogging platform built on top of WDB (WEB-DOS-BASE). This is the default blog post, which you can edit or delete from the admin panel.', NOW(), NOW());