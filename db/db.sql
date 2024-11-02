CREATE DATABASE GANADERIA;

USE GANADERIA;

CREATE TABLE ROL(
    IdRol INT AUTO_INCREMENT,
    Rol VARCHAR(100),
    CONSTRAINT PK_ROL PRIMARY KEY(IdRol)
);

CREATE TABLE ESTATUS(
    IdEstatus INT AUTO_INCREMENT,
    Estatus VARCHAR(100),
    CONSTRAINT PK_ESTATUS PRIMARY KEY(IdEstatus)
);

CREATE TABLE PERSONA(
    IdPersona INT AUTO_INCREMENT,
    Nombre VARCHAR(300) NOT NULL,
    ApellidoPaterno VARCHAR(300) NOT NULL,
    ApellidoMaterno VARCHAR(300) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Edad VARCHAR(3) NOT NULL,
    CONSTRAINT PK_PERSONA PRIMARY KEY(IdPersona)
);

CREATE TABLE EMPLEADO(
    IdEmpleado INT AUTO_INCREMENT NOT NULL,
    IdPersona INT NOT NULL,
    Rol INT NOT NULL,
    Sueldo INT NOT NULL,
    Estatus INT NOT NULL,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_EMPLEADO PRIMARY KEY(IdEmpleado),
    CONSTRAINT FK_EMPLEADOTOPERSONA FOREIGN KEY(IdPersona) REFERENCES PERSONA(IdPersona) ON DELETE CASCADE,
    CONSTRAINT FK_EMPLEADOTOROL FOREIGN KEY(Rol) REFERENCES ROL(IdRol) ON DELETE CASCADE,
    CONSTRAINT FK_EMPLEADOTATUS FOREIGN KEY(Estatus) REFERENCES ESTATUS(IdEstatus) ON DELETE CASCADE

);

CREATE TABLE USUARIO(
    IdUsuario INT AUTO_INCREMENT,
    Contraseña varchar(100) NOT NULL,
    IdEmpleado INT NOT NULL,
    CONSTRAINT PK_USUARIO PRIMARY KEY(IdUsuario),
    CONSTRAINT FK_USUARIOTOEMPLEADO FOREIGN KEY(IdEmpleado) REFERENCES EMPLEADO(IdEmpleado) ON DELETE CASCADE
);

ALTER TABLE USUARIO AUTO_INCREMENT = 1001;


-- VISTAS

DROP VIEW IF EXISTS EMPLEADOSPAGE;
CREATE VIEW EMPLEADOSPAGE AS
    SELECT U.IdUsuario, E.IdEmpleado AS Id, CONCAT(P.Nombre, ' ', P.ApellidoPaterno, ' ', P.ApellidoMaterno) AS Nombre, P.Edad, P.Telefono, R.Rol, E.Sueldo, ES.Estatus FROM EMPLEADO AS E INNER JOIN PERSONA AS P ON E.IdPersona = P.IdPersona INNER JOIN ESTATUS AS ES ON E.Estatus = ES.IdEstatus INNER JOIN ROL AS R ON E.Rol = R.IdRol INNER JOIN USUARIO U on E.IdEmpleado = U.IdEmpleado ORDER BY E.Fecha ASC;

-- STOCK PROCEDURE

DROP PROCEDURE IF EXISTS LOGIN;

CREATE PROCEDURE LOGIN(IN ID INT, IN PASSWORD VARCHAR(50))
BEGIN
    DECLARE USERREGISTER INT;
    DECLARE PASST INT;
    DECLARE USERSTATUS INT;


    SET USERREGISTER = (SELECT IdUsuario FROM USUARIO WHERE IdUsuario = ID);
    IF USERREGISTER IS NULL THEN
        SELECT 0 AS RES;
    ELSE
        SET PASST = (SELECT IdUsuario FROM USUARIO WHERE IdUsuario = ID AND Contraseña = PASSWORD);
        IF PASST IS NULL THEN
            SELECT 1 AS RES;
        ELSE
            SET USERSTATUS = (SELECT Estatus FROM EMPLEADO AS E INNER JOIN USUARIO AS U ON E.IdEmpleado = U.IdEmpleado WHERE U.IdUsuario = ID );
            IF USERSTATUS != 1 THEN
                SELECT 2 AS RES;
            ELSE
                SELECT U.IdUsuario, E.Rol, E.Estatus, P.Nombre, P.ApellidoPaterno AS Apellido FROM USUARIO AS U INNER JOIN EMPLEADO AS E ON U.IdEmpleado = E.IdEmpleado INNER JOIN PERSONA AS P ON E.IdPersona = P.IdPersona WHERE IdUsuario = ID AND Contraseña = PASSWORD;
            end if;
        end if;
    end if;
END;

-- Usuarios

DROP PROCEDURE IF EXISTS ADDUSER;
CREATE PROCEDURE ADDUSER(IN NOMBRE VARCHAR(300), IN APELLIDOPAT VARCHAR(300), IN APELLIDOMAT VARCHAR(300), IN TELEFONO VARCHAR(20), IN EDAD VARCHAR(3), IN ROL INT, IN SUELDO INT, IN ESTATUS INT, IN CONTRASEÑA VARCHAR(100))
    BEGIN
       INSERT INTO PERSONA (Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, Edad) VALUES (NOMBRE, APELLIDOPAT, APELLIDOMAT, TELEFONO, EDAD);
       INSERT INTO EMPLEADO(IdPersona, Rol, Sueldo, Estatus) VALUES ((SELECT LAST_INSERT_ID()), ROL, SUELDO, ESTATUS);
       INSERT INTO USUARIO(Contraseña, IdEmpleado) VALUES (CONTRASEÑA, (SELECT LAST_INSERT_ID()));
       SELECT 1 AS RES;
    END;

DROP PROCEDURE IF EXISTS SP_EMPLEADOSVISTA;
CREATE PROCEDURE SP_EMPLEADOSVISTA(IN IDEMP INT)
    BEGIN
        SELECT Id, Nombre, Edad, Telefono, Rol, Sueldo, Estatus FROM EMPLEADOSPAGE WHERE IdUsuario != IDEMP;
    END;

-- Encuentra a un empleado por su ID
DROP PROCEDURE IF EXISTS SP_FINDEMPLEADO;
CREATE PROCEDURE SP_FINDEMPLEADO(IN IDEMP INT)
BEGIN
    SELECT P.Nombre, P.ApellidoPaterno, P.ApellidoMaterno, P.Edad, P.Telefono, E.Sueldo, E.Rol, E.Estatus FROM EMPLEADO AS E INNER JOIN PERSONA P on E.IdPersona = P.IdPersona WHERE IdEmpleado = IDEMP;

END;

DROP PROCEDURE IF EXISTS SP_DELEETEMPLEADO;
CREATE PROCEDURE SP_DELEETEMPLEADO(IN IDINT INT)
    BEGIN
        DECLARE IDUSER INT;
        DECLARE IDPERSOMA INT;
        SET IDUSER = (SELECT U.IdUsuario FROM USUARIO AS U INNER JOIN EMPLEADO AS E ON U.IdEmpleado = E.IdEmpleado WHERE E.IdEmpleado = IDINT);

        IF(IDUSER IS NOT NULL) THEN
            SET IDPERSOMA = (SELECT P.IdPersona FROM PERSONA AS P INNER JOIN EMPLEADO AS E ON P.IdPersona = E.IdPersona WHERE E.IdEmpleado = IDINT);

        DELETE FROM PERSONA WHERE IdPersona = IDPERSOMA;
        DELETE FROM EMPLEADO WHERE IdEmpleado = IDINT;
        DELETE FROM USUARIO WHERE IdUsuario = IDINT;

        SELECT 1 AS res;
            ELSE
                SELECT 0 AS res;
        end if;


    END;

DROP PROCEDURE IF EXISTS SP_UPDATEEMPLEADO;
CREATE PROCEDURE SP_UPDATEEMPLEADO(IN NOMBREEMP VARCHAR(300), IN APELLIDOPAT VARCHAR(300), IN APELLIDOMAT VARCHAR(300), IN EDADEMP VARCHAR(3), IN TELEFONOEMP VARCHAR(20),IN ROLEMP INT, IN SUELDOEMP INT, IN ESTATUSEMP INT, IN IdEmp INT)
BEGIN
    DECLARE IDUSER INT;
    DECLARE IDPERSOMA INT;
    SET IDUSER = (SELECT U.IdUsuario FROM USUARIO AS U INNER JOIN EMPLEADO AS E ON U.IdEmpleado = E.IdEmpleado WHERE E.IdEmpleado = IdEmp);
    SET IDPERSOMA = (SELECT P.IdPersona FROM PERSONA AS P INNER JOIN EMPLEADO AS E ON P.IdPersona = E.IdPersona WHERE E.IdEmpleado = IdEmp);
    UPDATE PERSONA SET Nombre = NOMBREEMP, ApellidoPaterno = APELLIDOPAT, ApellidoMaterno = APELLIDOMAT, Telefono = TELEFONOEMP,Edad = EDADEMP WHERE IdPersona = IDPERSOMA;
    UPDATE EMPLEADO SET Sueldo = SUELDOEMP, Estatus = ESTATUSEMP, Rol = ROLEMP WHERE IdEmpleado = IdEmp;
    SELECT 1 AS res;
END;

CALL SP_UPDATEEMPLEADO('MARIA', 'GOMEZ', 'PERLA', '25', '4445454', 2, 15000, 1,38);

DROP PROCEDURE IF EXISTS SP_GETEMPLEADOSCOLUMNS;
CREATE PROCEDURE SP_GETEMPLEADOSCOLUMNS()
BEGIN
   SHOW COLUMNS FROM EMPLEADOSPAGE;
END;

CREATE PROCEDURE SP_GETEMPLEADOFORMAT(IN IDEMP INT)
BEGIN
        SELECT E.IdEmpleado AS Id, P.Nombre, P.ApellidoPaterno, P.ApellidoMaterno , P.Edad, P.Telefono, R.Rol, E.Sueldo, ES.Estatus FROM EMPLEADO AS E INNER JOIN PERSONA AS P ON E.IdPersona = P.IdPersona INNER JOIN ESTATUS AS ES ON E.Estatus = ES.IdEstatus INNER JOIN ROL AS R ON E.Rol = R.IdRol INNER JOIN USUARIO U on E.IdEmpleado = U.IdEmpleado WHERE E.IdEmpleado = IDEMP ORDER BY E.Fecha ASC;
END;

CALL SP_GETEMPLEADOFORMAT(1)


-- AGREGANDO DATOS INICIALES

SELECT * FROM EMPLEADO;

INSERT INTO ROL (Rol) VALUES ('Administrador');
INSERT INTO ROL (Rol) VALUES ('Almacen');
INSERT INTO ROL (Rol) VALUES ('Entradas');

INSERT INTO ESTATUS (ESTATUS) VALUES ('Activo');
INSERT INTO ESTATUS (ESTATUS) VALUES ('Despedido');
INSERT INTO ESTATUS (ESTATUS) VALUES ('Suspendido');



CALL ADDUSER('Enzo', 'Villafuerte', 'Cantu', '4454684752', '25', 1, 25000, 1, '123456');
CALL ADDUSER('Luis', 'Suarez', 'Villa', '4486569875', '29', 2, 15000, 1, '123456');
CALL ADDUSER('Maria', 'Gomez', 'Lopez', '4425698741', '32', 3, 18000, 2, '123456');

