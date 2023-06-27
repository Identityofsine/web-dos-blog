-- @block
INSERT INTO file_system () VALUES ();

-- @block
INSERT INTO directory (name) VALUES ('featured');

-- @block
INSERT INTO directory (name, parent_id) VALUES ('test_folder', 1);

-- @block
INSERT INTO files (name, parent_id, blog_id) VALUES ('example', 1, 1);

-- @block
INSERT INTO files (name, parent_id, blog_id) VALUES ('example_sub_folder', 2, 2);

-- @block
INSERT INTO files (name, parent_id, blog_id) VALUES ('example_next_file', 2, 3);


-- @block
INSERT INTO blog (title, image, content, created_at, updated_at) VALUES ('Welcome to Adonis', 'https://i.imgur.com/azibwYe.jpeg', 'Welcome to Adonis, a blogging platform built on top of WDB (WEB-DOS-BASE). This is the default blog post, which you can edit or delete from the admin panel.', NOW(), NOW());

-- @block
INSERT INTO blog (title, image, content, created_at, updated_at) VALUES ('Nested Folder', 'https://images-ext-1.discordapp.net/external/nszY0H1xK0FJNKa6-8azxpHqu6bXKTOwuCVFQGhiEzE/%3Fformat%3Djpg%26name%3Dmedium/https/pbs.twimg.com/media/FytjqPiaIAY3W-f?width=831&height=686', 'Oh, thats cool. You found this file in a nested folder, congrats!', NOW(), NOW());


-- @block
INSERT INTO blog (title, image, content, created_at, updated_at) VALUES ('Nigga Ball Sex', 'https://images-ext-2.discordapp.net/external/LfmXSCzyiujWz6cCp6B7UvGIfTxpRYMZiWaf6WgrWg0/%3Fformat%3Djpg%26name%3Dsmall/https/pbs.twimg.com/media/FzRVGWhWcAMWx8I?width=560&height=686', 'Hey, more blog posts... thats cool.', NOW(), NOW());