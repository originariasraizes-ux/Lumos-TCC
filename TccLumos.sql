create database dblumos;
use dblumos;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/11/2025 às 22:50
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dblumos`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbalunoturma`
--

CREATE TABLE `tbalunoturma` (
  `idUsuario` int(11) NOT NULL,
  `idTurma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbalunoturma`
--

INSERT INTO `tbalunoturma` (`idUsuario`, `idTurma`) VALUES
(10, 50);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbfavoritos`
--

CREATE TABLE `tbfavoritos` (
  `idFavoritos` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idJogos` int(11) NOT NULL,
  `dataFavoritado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbfavoritos`
--

INSERT INTO `tbfavoritos` (`idFavoritos`, `idUsuario`, `idJogos`, `dataFavoritado`) VALUES
(8, 11, 12, '2025-11-13 20:36:20'),
(9, 10, 27, '2025-11-13 21:20:58');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbjogos`
--

CREATE TABLE `tbjogos` (
  `idJogos` int(11) NOT NULL,
  `nomeJogos` varchar(100) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `paginaJogo` varchar(255) DEFAULT NULL,
  `imagemJogo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbjogos`
--

INSERT INTO `tbjogos` (`idJogos`, `nomeJogos`, `idMateria`, `paginaJogo`, `imagemJogo`) VALUES
(1, 'Desafio das Bandeiras', 2, '/Lumos-TCC-main/J1CHEF.html', '/Lumos-TCC-main/images/jogos/DesafioBandeiras.PNG'),
(2, 'Descobrindo os Planetas do Sistema Solar', 1, '/Lumos-TCC-main/J1CIEF.html', '/Lumos-TCC-main/images/jogos/planetas.PNG'),
(3, 'Alquerque', 4, '/Lumos-TCC-main/J1RLEF.html', '/Lumos-TCC-main/images/jogos/Alquerque.PNG'),
(4, 'Jogo dos Círculos', 3, '/Lumos-TCC-main/J1RLEM.html', '/Lumos-TCC-main/images/jogos/JogoCirculos.PNG'),
(5, 'Reino das Fábulas', 2, '/Lumos-TCC-main/J2CHEF.html', '/Lumos-TCC-main/images/jogos/ReinoFabulas.PNG'),
(6, 'Manual Secreto da Magia', 1, '/Lumos-TCC-main/J2CIEF.html', '/Lumos-TCC-main/images/jogos/ManualSecreto.PNG'),
(7, 'GNU', 3, '/Lumos-TCC-main/J2RLEF.html', '/Lumos-TCC-main/images/jogos/Gnu.PNG'),
(8, 'Mu Torore', 3, '/Lumos-TCC-main/J2RLEM.html', '/Lumos-TCC-main/images/jogos/MuTorore.PNG'),
(9, 'Quiz Grécia Antiga', 2, '/Lumos-TCC-main/J3CHEF.html', '/Lumos-TCC-main/images/jogos/GreciaAntiga.PNG'),
(10, 'Olimpíada Sustentável', 1, '/Lumos-TCC-main/J3CIEF.html', '/Lumos-TCC-main/images/jogos/OlimpiadaSustentavel.PNG'),
(11, 'Avançando com o resto', 4, '/Lumos-TCC-main/J3RLEF.html', '/Lumos-TCC-main/images/jogos/Avancando.PNG'),
(12, 'Kono', 3, '/Lumos-TCC-main/J3RLEM.html', '/Lumos-TCC-main/images/jogos/Kono.PNG'),
(13, 'Día de los Muertos', 2, '/Lumos-TCC-main/J4CHEF.html', '/Lumos-TCC-main/images/jogos/Muertos.PNG'),
(14, 'Desafio Científico', 1, '/Lumos-TCC-main/J4CIEF.html', '/Lumos-TCC-main/images/jogos/Desafio.PNG'),
(15, 'Cordeiros e Tigres', 3, '/Lumos-TCC-main/J4RLEF.html', '/Lumos-TCC-main/images/jogos/Cordeiros.PNG'),
(16, 'Rebeldes Chineses', 4, '/Lumos-TCC-main/J4RLEM.html', '/Lumos-TCC-main/images/jogos/Rebeldes.PNG'),
(17, 'Desafio das Cores', 2, '/Lumos-TCC-main/J5CHEF.html', '/Lumos-TCC-main/images/jogos/DesafioCores.PNG'),
(18, 'Pixel Cosmos', 1, '/Lumos-TCC-main/J5CIEF.html', '/Lumos-TCC-main/images/jogos/PixelCosmos.PNG'),
(19, 'Estrela Mágica', 4, '/Lumos-TCC-main/J5RLEF.html', '/Lumos-TCC-main/images/jogos/EstrelaEF.PNG'),
(20, 'Avançando com o resto', 4, '/Lumos-TCC-main/J5RLEM.html', '/Lumos-TCC-main/images/jogos/Avancando.PNG'),
(21, 'Desafio Olimpíco', 2, '/Lumos-TCC-main/J6CHEF.html', '/Lumos-TCC-main/images/jogos/DesafioOlimpico.PNG'),
(22, 'Invasores', 1, '/Lumos-TCC-main/J6CIEF.html', '/Lumos-TCC-main/images/jogos/Invasores.PNG'),
(23, 'Jogo da Velha Triangular', 4, '/Lumos-TCC-main/J6RLEF.html', '/Lumos-TCC-main/images/jogos/JogoDaVelha.PNG'),
(24, 'Complete a História – Brasil', 2, '/Lumos-TCC-main/J7CHEF.html', '/Lumos-TCC-main/images/jogos/HistoriaBrasil.PNG'),
(25, 'Desafio ODS', 1, '/Lumos-TCC-main/J7CIEF.html', '/Lumos-TCC-main/images/jogos/DesafioODS.PNG'),
(26, 'Rebeldes Chineses', 4, '/Lumos-TCC-main/J7RLEF.html', '/Lumos-TCC-main/images/jogos/Rebeldes.PNG'),
(27, 'Estrela 26', 3, '/Lumos-TCC-main/J7RLEM.html', '/Lumos-TCC-main/images/jogos/Estrela26.PNG'),
(28, 'Complete a História - Geral', 2, '/Lumos-TCC-main/J8CHEF.html', '/Lumos-TCC-main/images/jogos/HistoriaGeral.PNG'),
(29, 'Heróis Cósmicos', 1, '/Lumos-TCC-main/J8CIEF.html', '/Lumos-TCC-main/images/jogos/HeroisCosmicos.PNG'),
(30, 'Cordeiros e Tigres', 3, '/Lumos-TCC-main/J8RLEF.html', '/Lumos-TCC-main/images/jogos/Cordeiros.PNG'),
(31, 'GNU', 3, '/Lumos-TCC-main/J6RLEM.html', '/Lumos-TCC-main/images/jogos/Gnu.PNG');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbmateria`
--

CREATE TABLE `tbmateria` (
  `idMateria` int(11) NOT NULL,
  `nomeMateria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbmateria`
--

INSERT INTO `tbmateria` (`idMateria`, `nomeMateria`) VALUES
(1, 'Ciências - Ensino Fundamental II'),
(2, 'Linguagens e Ciências Ensino Fundamental II'),
(3, 'Raciocínio Lógico - Ensino Médio'),
(4, 'Raciocínio Lógico - Ensino Fundamental II');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbtarefa`
--

CREATE TABLE `tbtarefa` (
  `idTarefa` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `dataCriacao` datetime DEFAULT current_timestamp(),
  `dataEntrega` date DEFAULT NULL,
  `status` enum('pendente','em_andamento','concluida') DEFAULT 'pendente',
  `prioridade` enum('baixa','media','alta') DEFAULT 'media',
  `idUsuario` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `idTurma` int(11) NOT NULL,
  `idJogos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbtarefa`
--

INSERT INTO `tbtarefa` (`idTarefa`, `titulo`, `descricao`, `dataCriacao`, `dataEntrega`, `status`, `prioridade`, `idUsuario`, `idMateria`, `idTurma`, `idJogos`) VALUES
(11, 'sda', 'qwqeqw', '2025-11-13 17:36:13', '2025-11-18', 'pendente', 'media', 11, 3, 48, 12),
(12, '0000', 'iiiii', '2025-11-13 18:03:07', '2025-11-19', 'pendente', 'media', 11, 1, 49, 2),
(13, 'atividade1', 'dadqwdq', '2025-11-13 18:20:26', '2025-11-20', 'pendente', 'media', 11, 3, 50, 27);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbtarefaaluno`
--

CREATE TABLE `tbtarefaaluno` (
  `idTarefaAluno` int(11) NOT NULL,
  `idTarefa` int(11) NOT NULL,
  `idAluno` int(11) NOT NULL,
  `status` enum('pendente','entregue','avaliado') DEFAULT 'pendente',
  `dataEntregaAluno` date DEFAULT NULL,
  `nota` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbturmas`
--

CREATE TABLE `tbturmas` (
  `idTurma` int(11) NOT NULL,
  `nomeTurma` varchar(50) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbturmas`
--

INSERT INTO `tbturmas` (`idTurma`, `nomeTurma`, `idMateria`, `idUsuario`) VALUES
(48, 'aaa', 3, 11),
(49, 'ss', 1, 11),
(50, 'dasdas', 3, 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusuario`
--

CREATE TABLE `tbusuario` (
  `idUsuario` int(11) NOT NULL,
  `nomeUsuario` varchar(100) NOT NULL,
  `emailUsuario` varchar(100) NOT NULL,
  `apelidoUsuario` varchar(100) NOT NULL,
  `senhaUsuario` varchar(100) NOT NULL,
  `tipo` enum('aluno','professor','responsavel') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusuario`
--

INSERT INTO `tbusuario` (`idUsuario`, `nomeUsuario`, `emailUsuario`, `apelidoUsuario`, `senhaUsuario`, `tipo`) VALUES
(10, 'testealuno', 'aluno@gmail.com', 'aluno', '22', 'aluno'),
(11, 'kauachiles', 'teste@gmail.com', 'kauachiles', '22', 'professor');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbalunoturma`
--
ALTER TABLE `tbalunoturma`
  ADD PRIMARY KEY (`idUsuario`,`idTurma`),
  ADD KEY `tbalunoturma_ibfk_2` (`idTurma`);

--
-- Índices de tabela `tbfavoritos`
--
ALTER TABLE `tbfavoritos`
  ADD PRIMARY KEY (`idFavoritos`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`,`idJogos`),
  ADD KEY `idJogos` (`idJogos`);

--
-- Índices de tabela `tbjogos`
--
ALTER TABLE `tbjogos`
  ADD PRIMARY KEY (`idJogos`),
  ADD KEY `fk_jogos_materia` (`idMateria`);

--
-- Índices de tabela `tbmateria`
--
ALTER TABLE `tbmateria`
  ADD PRIMARY KEY (`idMateria`);

--
-- Índices de tabela `tbtarefa`
--
ALTER TABLE `tbtarefa`
  ADD PRIMARY KEY (`idTarefa`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `fk_tarefa_materia` (`idMateria`),
  ADD KEY `fk_tarefa_turmas` (`idTurma`),
  ADD KEY `fk_tarefa_jogos` (`idJogos`);

--
-- Índices de tabela `tbtarefaaluno`
--
ALTER TABLE `tbtarefaaluno`
  ADD PRIMARY KEY (`idTarefaAluno`),
  ADD KEY `idTarefa` (`idTarefa`),
  ADD KEY `idAluno` (`idAluno`);

--
-- Índices de tabela `tbturmas`
--
ALTER TABLE `tbturmas`
  ADD PRIMARY KEY (`idTurma`),
  ADD KEY `idMateria` (`idMateria`),
  ADD KEY `tbturmas_ibfk_2` (`idUsuario`);

--
-- Índices de tabela `tbusuario`
--
ALTER TABLE `tbusuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbfavoritos`
--
ALTER TABLE `tbfavoritos`
  MODIFY `idFavoritos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tbjogos`
--
ALTER TABLE `tbjogos`
  MODIFY `idJogos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `tbmateria`
--
ALTER TABLE `tbmateria`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tbtarefa`
--
ALTER TABLE `tbtarefa`
  MODIFY `idTarefa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `tbtarefaaluno`
--
ALTER TABLE `tbtarefaaluno`
  MODIFY `idTarefaAluno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbturmas`
--
ALTER TABLE `tbturmas`
  MODIFY `idTurma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de tabela `tbusuario`
--
ALTER TABLE `tbusuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbalunoturma`
--
ALTER TABLE `tbalunoturma`
  ADD CONSTRAINT `tbalunoturma_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbalunoturma_ibfk_2` FOREIGN KEY (`idTurma`) REFERENCES `tbturmas` (`idTurma`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tbfavoritos`
--
ALTER TABLE `tbfavoritos`
  ADD CONSTRAINT `tbfavoritos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbfavoritos_ibfk_2` FOREIGN KEY (`idJogos`) REFERENCES `tbjogos` (`idJogos`);

--
-- Restrições para tabelas `tbjogos`
--
ALTER TABLE `tbjogos`
  ADD CONSTRAINT `fk_jogos_materia` FOREIGN KEY (`idMateria`) REFERENCES `tbmateria` (`idMateria`);

--
-- Restrições para tabelas `tbtarefa`
--
ALTER TABLE `tbtarefa`
  ADD CONSTRAINT `fk_tarefa_jogos` FOREIGN KEY (`idJogos`) REFERENCES `tbjogos` (`idJogos`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tarefa_materia` FOREIGN KEY (`idMateria`) REFERENCES `tbmateria` (`idMateria`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tarefa_turmas` FOREIGN KEY (`idTurma`) REFERENCES `tbturmas` (`idTurma`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbtarefa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tbtarefaaluno`
--
ALTER TABLE `tbtarefaaluno`
  ADD CONSTRAINT `tbtarefaaluno_ibfk_1` FOREIGN KEY (`idTarefa`) REFERENCES `tbtarefa` (`idTarefa`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbtarefaaluno_ibfk_2` FOREIGN KEY (`idAluno`) REFERENCES `tbusuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tbturmas`
--
ALTER TABLE `tbturmas`
  ADD CONSTRAINT `tbturmas_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `tbmateria` (`idMateria`),
  ADD CONSTRAINT `tbturmas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
