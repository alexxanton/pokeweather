create database if not exists pokeweather;
use pokeweather;

create table if not exists user (
    id int primary key auto_increment,
    name varchar(255) not null unique,
    password varchar(255) not null,
    coins int default 1000,
    boost int default 0,
    tries int default 10
);

create table if not exists team (
    id int primary key auto_increment,
    slot_1 int not null,
    slot_2 int,
    slot_3 int,
    slot_4 int,
    slot_5 int,
    slot_6 int,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists pokemon (
    id int primary key auto_increment,
    specie int not null,
    level int not null,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists trophy (
    id int primary key auto_increment,
    type int not null,
    obtained boolean default false,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);
