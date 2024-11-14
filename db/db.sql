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

CREATE TABLE MOTIVO(
    IdMotivo INT AUTO_INCREMENT,
    Motivo VARCHAR(200) NOT NULL,
    CONSTRAINT PK_MOTIVO PRIMARY KEY(IdMotivo)
);

CREATE TABLE ESTADOANIMAL(
    IdEstado INT AUTO_INCREMENT,
    Estado VARCHAR(200),
    CONSTRAINT PK_ESTADOANIMAL PRIMARY KEY(IdEstado)
);

CREATE TABLE CORRAL(
    IdCorral INT AUTO_INCREMENT,
    Corral VARCHAR(100) NOT NULL,
    Cantidad INT DEFAULT 0,
    CONSTRAINT PK_CORRAL PRIMARY KEY(IdCorral)
);

CREATE TABLE GUIAENTRADA(
    REEMO VARCHAR(30) NOT NULL,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Empleado INT,
    Motivo INT NOT NULL,
    ESTADO ENUM('Pendiente', 'Completado'), -- PENDIENTE O ACABADO
    CONSTRAINT PK_GUIENTRADA PRIMARY KEY(REEMO),
    CONSTRAINT FK_GUIAENTRADATOEMPLEADO FOREIGN KEY(Empleado) REFERENCES EMPLEADO(IdEmpleado) ON DELETE SET NULL,
    CONSTRAINT FK_GUIAENTRADATOMOTIVO FOREIGN KEY(Motivo) REFERENCES MOTIVO(IdMotivo)
);

CREATE TABLE GANADO(
    Arete VARCHAR(50) NOT NULL,
    Sexo ENUM('Macho','Hembra') NOT NULL,
    Meses INT NOT NULL,
    Clasificacion VARCHAR(200) NOT NULL,
    Estado INT NOT NULL,
    REEMO VARCHAR(30) NOT NULL,
    Corral INT,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Peso INT NOT NULL,
    PrecioCompra INT,
    CONSTRAINT PK_GANADO PRIMARY KEY(Arete),
    CONSTRAINT FK_GANADOTOGUIAENTRADA FOREIGN KEY(REEMO) REFERENCES GUIAENTRADA(REEMO),
    CONSTRAINT FK_GANADOTOESTADOANIMAL FOREIGN KEY(Estado) REFERENCES ESTADOANIMAL(IdEstado)
);

CREATE TABLE HISTORIALGASTOGANADO(
    IdGasto INT NOT NULL AUTO_INCREMENT,
    Arete VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_HISTORIALGASTOGANADO PRIMARY KEY(IdGasto),
    CONSTRAINT FK_HISTORIALGASTPGANADOTOGANADO FOREIGN KEY(Arete) REFERENCES GANADO(Arete)
);


CREATE TABLE GUIA(
    IdGuia INT AUTO_INCREMENT,
    REEMO VARCHAR(30) NOT NULL,
    PSG VARCHAR(100) NOT NULL,
    Nombre VARCHAR(300) NOT NULL,
    RazonSocial VARCHAR(300) NOT NULL,
    Localidad VARCHAR(200) NOT NULL,
    Municipio VARCHAR(200) NOT NULL,
    Estado VARCHAR(300) NOT NULL,
    CONSTRAINT PK_GUIA PRIMARY KEY(IdGuia),
    CONSTRAINT FK_GUIATOGUIAENTRADA FOREIGN KEY(REEMO) REFERENCES GUIAENTRADA(REEMO)
);


ALTER TABLE USUARIO AUTO_INCREMENT = 1001;
ALTER TABLE EMPLEADO AUTO_INCREMENT = 1001;

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

DROP PROCEDURE IF EXISTS SP_GETEMPLEADOSCOLUMNS;
CREATE PROCEDURE SP_GETEMPLEADOSCOLUMNS()
BEGIN
   SHOW COLUMNS FROM EMPLEADOSPAGE;
END;

CREATE PROCEDURE SP_GETEMPLEADOFORMAT(IN IDEMP INT)
BEGIN
        SELECT E.IdEmpleado AS Id, P.Nombre, P.ApellidoPaterno, P.ApellidoMaterno , P.Edad, P.Telefono, R.Rol, E.Sueldo, ES.Estatus FROM EMPLEADO AS E INNER JOIN PERSONA AS P ON E.IdPersona = P.IdPersona INNER JOIN ESTATUS AS ES ON E.Estatus = ES.IdEstatus INNER JOIN ROL AS R ON E.Rol = R.IdRol INNER JOIN USUARIO U on E.IdEmpleado = U.IdEmpleado WHERE E.IdEmpleado = IDEMP ORDER BY E.Fecha ASC;
END;

-- GUIAS GANADO

DROP PROCEDURE IF EXISTS CHECKIFREEMONOTEXISTS;
CREATE PROCEDURE CHECKIFREEMONOTEXISTS(IN REEMOIN VARCHAR(30))
    BEGIN
        DECLARE VARTEMP VARCHAR(30);
        SET VARTEMP = (SELECT REEMO FROM GUIAENTRADA WHERE REEMO = REEMOIN);

        IF(VARTEMP IS NOT NULL) THEN
            SELECT 0 AS RES;
            ELSE
            SELECT 1 AS RES;
        end if;
    END;

DROP PROCEDURE IF EXISTS OBTENERNOMBRECORRALES;
CREATE PROCEDURE OBTENERNOMBRECORRALES()
    BEGIN
       select IdCorral, Corral from CORRAL where Cantidad = 0 AND IdCorral != 1;
    END;

DROP PROCEDURE IF EXISTS OBTENERINFOSESSIONENTRADAS;
CREATE PROCEDURE OBTENERINFOSESSIONENTRADAS(IN MOTIVOIN INT, IN CORRALIN INT)
    BEGIN
       DECLARE MOTIVOCHAR VARCHAR(100);
       DECLARE CORRALCHAR VARCHAR(100);

       SET MOTIVOCHAR = (SELECT MOTIVO FROM MOTIVO WHERE IdMotivo = MOTIVOIN);
       SET CORRALCHAR = (SELECT CORRAL FROM CORRAL WHERE IdCorral = CORRALIN);

       SELECT MOTIVOCHAR AS MotivoChar, CORRALCHAR AS CorralChar;
    END;

DROP PROCEDURE IF EXISTS ENTRADAANIMAL;
CREATE PROCEDURE ENTRADAANIMAL(IN EMPLEADOIN INT,IN REEMOIN VARCHAR(50), IN MOTIVOIN INT, IN CORRALIN INT, IN SEXOIN VARCHAR(10), IN ARETEIN VARCHAR(50), IN MESESIN INT, IN PESOIN INT, IN ESTADOIN INT)
    -- VERIFICA QUE NO HAY UNA GUIA EXISTENTE PARA AGREGAR Y SI LA HAY CONTINUA CON ESA;
BEGIN
    DECLARE ISGUIA VARCHAR(50);
    DECLARE CLASIFICACIONVAR VARCHAR(50);
    DECLARE NEWARETE VARCHAR(50); -- PARA VERFICAR QUE NO EXISTE OTRO ARETE IGUAL YA REGISTRADO
    DECLARE CORRALOPTION INT;
    DECLARE VARTEMP INT;

    SET NEWARETE = (SELECT Arete FROM GANADO WHERE Arete = ARETEIN);

    IF(NEWARETE IS NULL) THEN

        SET ISGUIA = (SELECT REEMO FROM GUIAENTRADA WHERE REEMOIN = REEMO);

    IF(ISGUIA IS NULL) THEN
            INSERT INTO GUIAENTRADA (REEMO, Empleado, Motivo, ESTADO) VALUES (REEMOIN,EMPLEADOIN,MOTIVOIN,ESTADOIN);
        END IF;

        IF(MESESIN < 16) THEN
            IF(SEXOIN = 'MACHO') THEN
                SET CLASIFICACIONVAR = 'Becerro';
            ELSE
                SET CLASIFICACIONVAR = 'Becerra';
            end if;
            ELSE
                IF(MESESIN < 24) THEN
                    IF(SEXOIN = 'MACHO') THEN
                        SET CLASIFICACIONVAR = 'Torete';
                    ELSE
                        SET CLASIFICACIONVAR = 'Vacona';
                    end if;
                ELSE
                    IF(SEXOIN = 'MACHO') THEN
                    SET CLASIFICACIONVAR = 'Toro';
                ELSE
                    SET CLASIFICACIONVAR = 'Vaca';
                end if;
                end if;
            end if;

            IF(ESTADOIN = 3) THEN -- SI ESTÁ MUERTO NO LO AGREGA A NINGUN CORRAL
                SET CORRALOPTION = NULL;
                ELSE
                    IF(ESTADOIN = 2) THEN -- MANDA EL ANIMAL ENFERMO A UN CORRAL DE CUARENTENA
                        SET CORRALOPTION = 1;
                        ELSE
                        SET CORRALOPTION = CORRALIN;
                    end if;
                    SET VARTEMP = ((SELECT Cantidad FROM CORRAL WHERE IdCorral = CORRALOPTION) + 1);
                    UPDATE CORRAL SET Cantidad = VARTEMP WHERE IdCorral = CORRALOPTION; -- ACTUALIZANDO LA CANTIDAD EN LOS CORRALES
            end if;

            INSERT INTO GANADO (Arete, Sexo, Meses, Clasificacion, Estado, REEMO, Corral, Peso) VALUES (ARETEIN, SEXOIN, MESESIN, CLASIFICACIONVAR, ESTADOIN, REEMOIN, CORRALOPTION, PESOIN);
            SELECT 1 AS RES;
        ELSE
            SELECT 0 AS RES;
    END IF;
END;

DROP PROCEDURE IF EXISTS LISTGANADO;
CREATE PROCEDURE LISTGANADO(IN REEMOIN VARCHAR(50))
BEGIN
   SELECT Arete, Sexo, Meses, Clasificacion, Peso, E.Estado FROM GANADO AS G INNER JOIN ESTADOANIMAL E on G.Estado = E.IdEstado WHERE G.REEMO = REEMOIN ORDER BY G.Fecha ASC;
END;

-- Corrales entradas

DROP PROCEDURE IF EXISTS GETCORRRALES;
CREATE PROCEDURE GETCORRRALES(IN NOMBREIN VARCHAR(100))
    BEGIN
       SELECT * FROM CORRAL WHERE Corral LIKE CONCAT('%',NOMBREIN,'%');
    END;

DROP PROCEDURE IF EXISTS GETCORRALESDATA;
CREATE PROCEDURE GETCORRALESDATA(IN IDIN INT)
    BEGIN
        IF(IDIN != 1)THEN
            SELECT C.IdCorral AS Id, C.Corral AS Nombre, C.Cantidad, GU.REEMO, M.Motivo, DATE_FORMAT(G.Fecha, '%d/%m/%Y') AS FECHA FROM CORRAL AS C INNER JOIN GANADO AS G ON C.IdCorral = G.Corral INNER JOIN GUIAENTRADA GU on G.REEMO = GU.REEMO INNER JOIN MOTIVO AS M on GU.Motivo = M.IdMotivo WHERE C.IdCorral = IDIN LIMIT 1;
        end if;
       SELECT G.Arete, G.Sexo, G.Clasificacion, E.Estado, CONCAT(G.Peso,' Kg') AS Peso  FROM GANADO AS G INNER JOIN ESTADOANIMAL AS E ON G.Estado = E.IdEstado WHERE G.Corral = IDIN;
    END;

DROP PROCEDURE IF EXISTS UPDATENAMECORRAL;
CREATE PROCEDURE UPDATENAMECORRAL(IN NAMEIN VARCHAR(100), IN CORRALIN INT)
    BEGIN
       UPDATE CORRAL SET Corral = NAMEIN WHERE IdCorral = CORRALIN;
       SELECT CORRALIN AS Id;
    END;

-- Guias para el administrador

DROP PROCEDURE IF EXISTS GETGUIAS;
CREATE PROCEDURE GETGUIAS(IN FILTROIN VARCHAR(20), IN REEMOIN VARCHAR(20))
    BEGIN
        SELECT G.REEMO, DATE_FORMAT(G.Fecha, '%d/%m/%Y') AS Fecha, CONCAT(P.Nombre, ' ', P.ApellidoPaterno, ' ', P.ApellidoMaterno) AS Nombre, M.Motivo, G.ESTADO FROM GUIAENTRADA AS G INNER JOIN EMPLEADO AS E on G.Empleado = E.IdEmpleado INNER JOIN MOTIVO AS M on G.Motivo = M.IdMotivo INNER JOIN PERSONA P on E.IdPersona = P.IdPersona WHERE G.ESTADO LIKE CONCAT('%',FILTROIN,'%') AND G.REEMO LIKE CONCAT('%',REEMOIN,'%');
    END;

DROP PROCEDURE IF EXISTS GETGUIADATA;
CREATE PROCEDURE GETGUIADATA(IN REEMOIN VARCHAR(50))
    BEGIN
        SELECT G.REEMO, DATE_FORMAT(G.Fecha, '%d/%m/%Y') AS Fecha, M.Motivo, G.ESTADO FROM GUIAENTRADA AS G INNER JOIN MOTIVO AS M on G.Motivo = M.IdMotivo WHERE G.REEMO = REEMOIN;

       SELECT G.Arete, G.Sexo, G.Meses, G.Clasificacion, E.Estado, C.Corral, G.Peso, G.PrecioCompra FROM GANADO AS G LEFT JOIN CORRAL AS C on G.Corral = C.IdCorral INNER JOIN ESTADOANIMAL AS E on G.Estado = E.IdEstado WHERE G.REEMO = REEMOIN;
    END;

DROP PROCEDURE IF EXISTS UPDATEPRECIOCOMPRAANIMAL;
CREATE PROCEDURE UPDATEPRECIOCOMPRAANIMAL(IN ARETEIN VARCHAR(50), IN PRECIOIN INT)
    BEGIN
       UPDATE GANADO SET PrecioCompra = PRECIOIN WHERE Arete = ARETEIN;
    END;

DROP PROCEDURE IF EXISTS CREATEGUIA;
CREATE PROCEDURE CREATEGUIA(IN REEMOIN VARCHAR(30), IN PSGIN VARCHAR(50), IN NOMBREIN VARCHAR(100), IN RAZONIN VARCHAR(100), IN LOCALIDADIN VARCHAR(100), IN MUNICIPIOIN VARCHAR(100), IN ESTADOIN VARCHAR(100))
    BEGIN
       INSERT INTO GUIA (REEMO, PSG, Nombre, RazonSocial, Localidad, Municipio, Estado) VALUES (REEMOIN, PSGIN, NOMBREIN, RAZONIN, LOCALIDADIN, MUNICIPIOIN, ESTADOIN);
    END;


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
CALL ADDUSER('Maria', 'Gomez', 'Lopez', '4425698741', '32', 3, 18000, 1, '123456');

INSERT INTO MOTIVO (Motivo) VALUES ('Cria');
INSERT INTO MOTIVO (Motivo) VALUES ('Engorda');
INSERT INTO MOTIVO (Motivo) VALUES ('Sacrificio');

INSERT INTO ESTADOANIMAL (Estado) VALUES ('Saludable');
INSERT INTO ESTADOANIMAL (Estado) VALUES ('Enfermo');
INSERT INTO ESTADOANIMAL (Estado) VALUES ('Muerto');
INSERT INTO ESTADOANIMAL (Estado) VALUES ('Vendido');

INSERT INTO CORRAL (Corral) VALUES ('Cuarentena');
INSERT INTO CORRAL (Corral) VALUES ('A1');
INSERT INTO CORRAL (Corral) VALUES ('A2');
INSERT INTO CORRAL (Corral) VALUES ('A3');
INSERT INTO CORRAL (Corral) VALUES ('A4');
INSERT INTO CORRAL (Corral) VALUES ('A5');
INSERT INTO CORRAL (Corral) VALUES ('A6');
INSERT INTO CORRAL (Corral) VALUES ('A7');
INSERT INTO CORRAL (Corral) VALUES ('A8');




