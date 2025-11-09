
-- Create the user table
 CREATE TABLE IF NOT EXISTS users ( 
    email VARCHAR(255) NOT NULL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    admin BOOLEAN NOT NULL DEFAULT FALSE, 
    dateOfBirth DATE NOT NULL, 
    dateOfCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    password VARCHAR(255) NOT NULL 
); 

-- Create the blog table 
CREATE TABLE IF NOT EXISTS blogs ( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    authorEmail VARCHAR(255) NOT NULL, 
    premium BOOLEAN DEFAULT FALSE, 
    title VARCHAR(255) NOT NULL, 
    content TEXT NOT NULL, 
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_blog_user FOREIGN KEY (authorEmail) 
        REFERENCES users(email) ON DELETE CASCADE 
); 

-- Create blogTags table 
CREATE TABLE IF NOT EXISTS blogTags ( 
    blogId INT NOT NULL, 
    tag VARCHAR(50) NOT NULL, 
    CONSTRAINT fk_blog_tag FOREIGN KEY (blogId) 
        REFERENCES blogs(id) ON DELETE CASCADE 
); 

-- Create likes table 
CREATE TABLE IF NOT EXISTS likes ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    blogId INT NOT NULL, 
    userEmail VARCHAR(255), 
    ipAddress VARCHAR(45) NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_blog_like FOREIGN KEY (blogId) 
        REFERENCES blogs(id) ON DELETE CASCADE, 
    UNIQUE (blogId, ipAddress) 
); 

-- Create comments table 
CREATE TABLE IF NOT EXISTS comments ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    blogId INT NOT NULL, 
    authorName VARCHAR(100), 
    comment TEXT NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_blog_comment FOREIGN KEY (blogId) 
        REFERENCES blogs(id) ON DELETE CASCADE 
);

-- Insert demo users
insert into users(email, name, admin, dateOfBirth, dateOfCreation, password)
values
('john@example.com', 'John Doe', true, '1990-05-15', '2023-01-01', 'hashed_password_1'),
('alice@example.com', 'Alice Smith', false, '1985-08-22', '2023-02-05', 'hashed_password_2'),
('emma@example.com', 'Emma Johnson', false, '1992-03-12', '2023-04-15', 'hashed_password_3'),
('liam@example.com', 'Liam Brown', false, '1988-09-30', '2023-05-21', 'hashed_password_4'),
('olivia@example.com', 'Olivia White', true, '1991-11-18', '2023-06-10', 'hashed_password_5'),
('noah@example.com', 'Noah Taylor', false, '1995-07-27', '2023-07-25', 'hashed_password_6'),
('ava@example.com', 'Ava Davis', false, '1993-02-04', '2023-08-09', 'hashed_password_7'),
('sophia@example.com', 'Sophia Miller', false, '1994-10-13', '2023-09-12', 'hashed_password_8'),
('jack@example.com', 'Jack Wilson', false, '1996-12-22', '2023-10-04', 'hashed_password_9'),
('lucas@example.com', 'Lucas Martinez', false, '1989-06-09', '2023-11-01', 'hashed_password_10');

-- Insert demo blogs
insert into blogs (authorEmail, premium, title, content)
values
('john@example.com', false, 'Getting Started with SQL', 'Learn how to query databases using SQL basics.'),
('alice@example.com', true, 'Optimizing Database Performance', 'A guide to improving query performance and indexing.'),
('emma@example.com', false, 'Building REST APIs in Node.js', 'Step-by-step tutorial on creating REST APIs with Express.'),
('liam@example.com', true, 'Advanced TypeScript Patterns', 'Deep dive into TypeScript generics and utility types.'),
('olivia@example.com', false, 'Handling Authentication in Express', 'Implement JWT and session authentication in Express.'),
('noah@example.com', false, 'Working with MySQL in Node.js', 'Using mysql2 package efficiently for production apps.'),
('ava@example.com', true, 'Transactions and ACID Properties', 'Understanding atomicity and consistency in databases.'),
('sophia@example.com', false, 'Intro to Frontend and Backend Integration', 'Connecting React apps with Node.js APIs.'),
('jack@example.com', false, 'How Middleware Works in Express', 'Learn about request lifecycle and middleware stacking.'),
('lucas@example.com', true, 'Scaling Node.js Applications', 'Approaches for handling large-scale traffic and clustering.');

-- Insert demo blog tags
insert into blogTags (blogId, tag)
values
(1, 'sql'), (1, 'database'), (1, 'beginner'),
(2, 'optimization'), (2, 'database'), (2, 'indexing'),
(3, 'api'), (3, 'nodejs'), (3, 'express'),
(4, 'typescript'), (4, 'patterns'), (4, 'advanced'),
(5, 'authentication'), (5, 'express'), (5, 'jwt'),
(6, 'mysql'), (6, 'database'), (6, 'nodejs'),
(7, 'transactions'), (7, 'acid'), (7, 'database'),
(8, 'frontend'), (8, 'backend'), (8, 'integration'),
(9, 'express'), (9, 'middleware'), (9, 'nodejs'),
(10, 'scaling'), (10, 'performance'), (10, 'nodejs');

-- Insert random likes
insert into likes (blogId, userEmail, ipAddress)
values
(1, 'alice@example.com', '192.168.1.11'),
(1, 'emma@example.com', '192.168.1.12'),
(1, 'liam@example.com', '192.168.1.13'),
(2, 'john@example.com', '192.168.1.14'),
(2, 'olivia@example.com', '192.168.1.15'),
(3, 'noah@example.com', '192.168.1.16'),
(3, 'ava@example.com', '192.168.1.17'),
(4, 'sophia@example.com', '192.168.1.18'),
(4, 'jack@example.com', '192.168.1.19'),
(5, 'lucas@example.com', '192.168.1.20'),
(6, 'alice@example.com', '192.168.1.21'),
(6, 'emma@example.com', '192.168.1.22'),
(7, 'john@example.com', '192.168.1.23'),
(7, 'olivia@example.com', '192.168.1.24'),
(8, 'noah@example.com', '192.168.1.25'),
(8, 'sophia@example.com', '192.168.1.26'),
(9, 'jack@example.com', '192.168.1.27'),
(9, 'liam@example.com', '192.168.1.28'),
(10, 'ava@example.com', '192.168.1.29'),
(10, 'lucas@example.com', '192.168.1.30');

-- Insert demo comments
insert into comments (blogId, authorName, comment)
values
(1, 'Alice Smith', 'Great introduction to SQL basics!'),
(1, 'Liam Brown', 'Very clear explanation for beginners.'),
(2, 'John Doe', 'The indexing examples are fantastic.'),
(2, 'Emma Johnson', 'Helpful tips for optimizing slow queries.'),
(3, 'Ava Davis', 'REST API tutorial was very helpful.'),
(3, 'Sophia Miller', 'This was easy to follow, thanks!'),
(4, 'Liam Brown', 'Loved the deep dive into TypeScript patterns.'),
(5, 'Olivia White', 'Finally understood JWT authentication!'),
(5, 'Jack Wilson', 'Clean and practical examples.'),
(6, 'Noah Taylor', 'MySQL integration explained perfectly.'),
(6, 'John Doe', 'Clear instructions for beginners.'),
(7, 'Ava Davis', 'Transactions now make sense to me.'),
(7, 'Emma Johnson', 'Good job explaining ACID properties.'),
(8, 'Sophia Miller', 'Frontend integration part was insightful.'),
(8, 'Alice Smith', 'Would love more examples on API connection.'),
(9, 'Liam Brown', 'Middleware example is awesome.'),
(9, 'Olivia White', 'Now I understand how Express handles requests.'),
(10, 'John Doe', 'Scaling guide was really informative.'),
(10, 'Lucas Martinez', 'This article deserves a bookmark!');
