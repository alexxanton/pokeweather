drop user if exists 'usr'@'localhost';
create user 'usr'@'localhost' identified by '1234';
--grant all privileges on *.* to 'usr'@'localhost';
flush privileges;
