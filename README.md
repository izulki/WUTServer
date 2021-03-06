# Server

	▪	The Server uses Node.js, Express.js, babel and node MySQL Driver. 
	▪	You will need a MySQL server running

## MySQL Setup

	1.	Setup a MySQL connection with a local instance
        ⁃	Username: devtest
        ⁃	Password: devtest
	2.	Run some of these scripts to populate the database

Create Database
```
CREATE DATABASE IF NOT EXISTS email
```

Create Users Table
```
CREATE TABLE IF NOT EXISTS email.users (user_id INT AUTO_INCREMENT PRIMARY KEY, address TEXT, first_name TEXT, last_name TEXT)
```

Create Message Table
```
CREATE TABLE IF NOT EXISTS email.messages (id INT AUTO_INCREMENT PRIMARY KEY, time TIMESTAMP, sender_id int, recipient_id int, FOREIGN KEY (sender_id) REFERENCES users(user_id), FOREIGN KEY (recipient_id) REFERENCES users(user_id), message LONGTEXT, archived BOOLEAN)
```

Insert Fake Users
```
INSERT INTO email.users VALUES 
(null, "alice@weusthem.com", "Alice", "Dee"),
(null, "bob@weusthem.com", "Bob", "Ross"),
(null, "charlie@weusthem.com", "Charlie", "Chaplin");
```
Insert Fake Messages
```
INSERT INTO email.messages VALUES 
(null, now(), 1, 2, "Hi Bob, hope you are doing well.", true),
(null, now(), 3, 2, "Hello Bob, how are your paintings going?", false);
```

## Running the Server:

	1.	Clone the repo to a folder and cd into it.
	2.	npm init
	3.	npm start
```
