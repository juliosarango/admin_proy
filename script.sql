create table usuario(
id serial not null,
nombres varchar(100),
apellidos varchar(100),
constraint pk primary key(id)
);
create table proyecto(
id smallserial not null,
nombre varchar(300),
lugar varchar(300),
descripcion text,
fecha_registro timestamp without time zone default now(),
id_usuario int not null,
constraint pk_proyecto primary key (id),
constraint fk_proyecto_usuario foreign key (id_usuario)
references usuario(id)
);

create table lote(
id serial not null,
id_proyecto int not null,
nombre_lote varchar(200),
medidas varchar(100),
descripcion text,
fecha_registro timestamp without time zone default now(),
id_usuario int not null,
constraint pk_lote primary key (id),
constraint fk_lote_usuario foreign key (id_usuario)
references usuario(id)
);

create table cliente(
id serial not null,
cedula varchar(20),
nombres varchar(200),
apellidos varchar(200),
direccion varchar(500),
telefono varchar(200),
descripcion text,
fecha_registro timestamp without time zone default now(),
id_usuario int not null,
constraint pk_cliente primary key (id),
constraint fk_cliente_usuario foreign key (id_usuario)
references usuario(id)
);

create table lote_cliente(
id serial not null,
id_lote int not null,
id_cliente int not null,
precio decimal(10,3),
fecha_venta timestamp without time zone,
descripcion text,
fecha_registro timestamp without time zone default now(),
id_usuario int not null,
constraint pk_lote_cliente primary key (id),
constraint fk_lote_cliente_lote foreign key (id_lote)
references lote(id),
constraint fk_lote_cliente_cliente foreign key (id_cliente)
references cliente(id),
constraint fk_lote_cliente_usuario foreign key (id_usuario)
references usuario(id)
);










