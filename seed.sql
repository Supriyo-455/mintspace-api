-- Create the user table
create table if not exists user(
    email varchar(255) not null,
    name varchar(255) not null,
    admin bool not null,
    dateOfBirth date not null,
    dateOfCreation date not null,
    password varchar(255) not null,
    primary key (email)
);

-- Create the blog table
create table if not exists blog(
    id int not null auto_increment,
    authorEmail varchar(255) not null,
    premium bool not null,
    title varchar(255) not null,
    content text not null,
    primary key (id)
);

-- Insert demo data into the user table
insert into user(email, name, admin, dateOfBirth, dateOfCreation, password)
values
    ('john@example.com', 'John Doe', true, '1990-05-15', '2023-01-01', 'hashed_password_1'),
    ('alice@example.com', 'Alice Smith', false, '1985-08-22', '2023-02-05', 'hashed_password_2'),
    ('admin@example.com', 'Admin User', true, '1980-01-10', '2023-03-10', 'hashed_password_admin');

-- Insert demo data into the blog table
insert into blog(authorEmail, premium, title, content)
values
    ('john@example.com', false, 'Introduction to SQL', 'This is a beginner\'s guide to SQL.'),
    ('alice@example.com', true, 'Advanced SQL Techniques', 'Learn advanced SQL techniques for better performance.'),
    ('admin@example.com', true, 'Managing User Permissions', 'Guide on managing user permissions in a database.');
