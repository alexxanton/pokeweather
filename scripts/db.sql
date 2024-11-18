create database if not exists pokeweather;
use pokeweather;

create table if not exists trophy_info (
    id int primary key auto_increment,
    name varchar(255),
    description text
);

create table if not exists trophy (
    id int primary key auto_increment,
    obtained boolean,
    info_fk int,
    foreign key (info_fk) references trophy_info(id)
);

create table if not exists user (
    id int primary key auto_increment,
    mail varchar(255),
    coins int default 0,
    trophy_fk int,
    pokemon1 int,
    pokemon2 int,
    pokemon3 int,
    pokemon4 int,
    pokemon5 int,
    pokemon6 int,
    foreign key (trophy_fk) references trophy(id),
    foreign key (pokemon1) references pokemon(id),
    foreign key (pokemon2) references pokemon(id),
    foreign key (pokemon3) references pokemon(id),
    foreign key (pokemon4) references pokemon(id),
    foreign key (pokemon5) references pokemon(id),
    foreign key (pokemon6) references pokemon(id)
);

create table if not exists stats (
    id int primary key auto_increment,
    level int,
    exp int,
    hp int,
    attack int,
    defense int,
    speed int
);

create table if not exists pokemon (
    id int primary key auto_increment,
    user_fk int,
    stats_fk int,
    foreign key (user_fk) references user(id),
    foreign key (stats_fk) references stats(id)
);
