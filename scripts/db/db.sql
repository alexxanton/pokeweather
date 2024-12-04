create database if not exists pokeweather;
use pokeweather;

create table if not exists user (
    id int primary key auto_increment,
    name varchar(255) not null unique,
    password varchar(255) not null,
    coins int default 1000,
    pokemon1 int not null,
    pokemon2 int,
    pokemon3 int,
    pokemon4 int,
    pokemon5 int,
    pokemon6 int
);

create table if not exists pokemon (
    id int primary key auto_increment,
    specie int not null,
    level int not null,
    exp int not null,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists trophy (
    id int primary key auto_increment,
    obtained boolean default false,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists missions (
    id int primary key auto_increment,
    completed boolean default false,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);
