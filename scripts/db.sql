create database if not exists pokeweather;
use pokeweather;

create table if not exists user (
    id int primary key auto_increment,
    mail varchar(255) not null unique,
    coins int default 0,
    pokemon1 int default 1,
    pokemon2 int,
    pokemon3 int,
    pokemon4 int,
    pokemon5 int,
    pokemon6 int
);

create table if not exists pokemon (
    id int primary key auto_increment,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists stats (
    id int primary key auto_increment,
    level int not null,
    exp int not null,
    hp int not null,
    attack int not null,
    defense int not null,
    speed int not null,
    pokemon_fk int not null,
    foreign key (pokemon_fk) references pokemon(id) on delete cascade
);

create table if not exists trophy (
    id int primary key auto_increment,
    obtained boolean default false,
    user_fk int not null,
    foreign key (user_fk) references user(id) on delete cascade
);

create table if not exists trophy_info (
    id int primary key auto_increment,
    name varchar(255) not null,
    description text not null,
    trophy_fk int not null,
    foreign key (trophy_fk) references trophy(id) on delete cascade
);
