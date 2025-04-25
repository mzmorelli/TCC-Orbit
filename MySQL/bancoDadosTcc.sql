create database tccOrbit;
create table usuario (
email varchar (80) not null,
telefone varchar (15) not null,
nome varchar (200) not null,
dataNasc date not null,
senha varchar (15) not null,
username varchar (20) primary key not null
);

create table circulo(
enderecos varchar (300) not null,
id int (10) primary key not null
);

create table desaparecido(
nome varchar (200) not null,
idade int (3) not null,
sexo varchar (10) not null,
altura int (10) not null,
telefoneContato int (15) not null,
vezVisto varchar (500) not null,
localVisto varchar (500) not null
);