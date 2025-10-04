CREATE DATABASE dbLumos;
USE dbLumos;

-- Tabela de usuários
CREATE TABLE tbUsuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nomeUsuario VARCHAR(100) NOT NULL,
    emailUsuario VARCHAR(100) NOT NULL,
    apelidoUsuario VARCHAR(100) NOT NULL,
    senhaUsuario VARCHAR(100) NOT NULL,
    tipo ENUM('aluno', 'professor', 'responsavel') NOT NULL
);

-- Tabela de jogos
CREATE TABLE tbJogos (
    idJogos INT AUTO_INCREMENT PRIMARY KEY,
    nomeJogos VARCHAR(100) NOT NULL
);

-- Tabela de matérias
CREATE TABLE tbMateria (
    idMateria INT AUTO_INCREMENT PRIMARY KEY,
    nomeMateria VARCHAR(50) NOT NULL,
    idUsuario INT NOT NULL,
    idJogos INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES tbUsuario(idUsuario),
    FOREIGN KEY (idJogos) REFERENCES tbJogos(idJogos)
);

-- Tabela de favoritos
CREATE TABLE tbFavoritos (
    idFavoritos INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idJogos INT NOT NULL,
    dataFavoritado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES tbUsuario(idUsuario),
    FOREIGN KEY (idJogos) REFERENCES tbJogos(idJogos),
    UNIQUE (idUsuario, idJogos)
);
