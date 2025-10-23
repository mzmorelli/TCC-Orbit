-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.27-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para tccorbit
CREATE DATABASE IF NOT EXISTS `tccorbit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `tccorbit`;

-- Copiando estrutura para tabela tccorbit.alerta
CREATE TABLE IF NOT EXISTS `alerta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `mensagem` text NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.alerta: ~87 rows (aproximadamente)
INSERT INTO `alerta` (`id`, `usuario`, `mensagem`, `criado_em`) VALUES
	(1, 'Usuário Mobile', '🚨 Alerta de emergência enviado!', '2025-09-22 16:27:11'),
	(2, 'Usuário Mobile', '🚨 Alerta de emergência enviado!', '2025-09-22 16:33:15'),
	(3, 'Usuário Mobile', '🚨 Alerta de emergência enviado!', '2025-09-22 16:33:27'),
	(4, 'Usuário Mobile', '🚨 Alerta de emergência enviado!', '2025-09-22 16:34:15'),
	(5, 'Usuário Mobile', '🚨 Alerta de emergência enviado!', '2025-09-22 16:34:34'),
	(6, 'Usuário Mobile', '🚨 Alerta de emergência enviado pelo app!', '2025-09-22 16:39:51'),
	(7, 'Usuário Mobile', '???? Alerta de emergência enviado!', '2025-09-23 13:08:08'),
	(8, 'Usuário Mobile', '???? Alerta de emergência enviado!', '2025-09-23 13:43:42'),
	(9, 'Usuário Mobile', '???? Alerta de emergência enviado!', '2025-09-23 13:55:25'),
	(10, 'Usuário Mobile', '???? Alerta de emergência enviado!', '2025-09-23 13:55:50'),
	(11, 'Usuário Mobile', '???? Alerta de emergência enviado!', '2025-09-23 13:56:15'),
	(12, 'Usuário Mobile', 'Usuário Mobile enviou um alerta de emergência!', '2025-09-23 13:59:21'),
	(13, 'Usuário Mobile', 'Usuário Mobile enviou um alerta de emergência!', '2025-09-23 13:59:54'),
	(14, 'Usuário Mobile', 'Enviou um alerta de emergência!', '2025-09-23 14:00:21'),
	(15, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-09-23 14:06:06'),
	(16, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-09-23 14:06:31'),
	(17, 'Fernando Lima', 'Enviou um alerta de emergência!', '2025-09-23 14:23:26'),
	(18, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-10 13:44:40'),
	(19, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-10 13:44:59'),
	(20, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-10 13:56:58'),
	(21, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-13 11:05:10'),
	(22, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-13 12:46:26'),
	(23, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-14 11:32:09'),
	(24, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-14 12:45:33'),
	(25, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-14 12:56:08'),
	(26, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 13:24:41'),
	(27, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 13:34:52'),
	(28, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 13:49:18'),
	(29, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 16:02:51'),
	(30, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 16:10:27'),
	(31, 'Juliana Costa', 'Enviou um alerta de emergência!', '2025-10-14 16:30:35'),
	(32, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:13:25'),
	(33, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:13:38'),
	(34, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:14:31'),
	(35, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:14:56'),
	(36, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:15:18'),
	(37, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 11:32:43'),
	(38, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 13:40:49'),
	(39, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 13:40:53'),
	(40, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 13:49:16'),
	(41, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 13:51:36'),
	(42, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 13:57:49'),
	(43, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:07:27'),
	(44, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:12:14'),
	(45, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:20:28'),
	(46, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:29:35'),
	(47, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:47:06'),
	(48, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 14:53:00'),
	(49, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 15:00:24'),
	(50, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:05:42'),
	(51, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:10:56'),
	(52, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:16:12'),
	(53, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:21:27'),
	(54, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:28:33'),
	(55, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:37:30'),
	(56, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:44:44'),
	(57, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:50:58'),
	(58, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 16:58:06'),
	(59, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:03:53'),
	(60, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:09:22'),
	(61, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:15:22'),
	(62, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:23:45'),
	(63, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:30:02'),
	(64, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:35:49'),
	(65, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:42:43'),
	(66, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:49:04'),
	(67, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 17:55:39'),
	(68, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-16 18:01:32'),
	(69, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 11:16:28'),
	(70, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 11:26:57'),
	(71, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 11:34:07'),
	(72, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 12:22:58'),
	(73, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 12:58:55'),
	(74, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:06:03'),
	(75, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:27:34'),
	(76, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:35:36'),
	(77, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:35:40'),
	(78, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:42:14'),
	(79, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 13:55:39'),
	(80, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 14:22:36'),
	(81, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 14:33:15'),
	(82, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 14:53:55'),
	(83, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 16:04:55'),
	(84, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 16:15:28'),
	(85, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 16:22:02'),
	(86, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 16:32:05'),
	(87, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 16:59:47'),
	(88, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 17:11:03'),
	(89, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 17:27:50'),
	(90, 'Isabela Mendes', 'Enviou um alerta de emergência!', '2025-10-17 17:35:43'),
	(91, 'Marcos Silva', 'Enviou um alerta de emergência!', '2025-10-23 14:17:29');

-- Copiando estrutura para tabela tccorbit.desaparecido
CREATE TABLE IF NOT EXISTS `desaparecido` (
  `nome` varchar(200) DEFAULT NULL,
  `idade` int(3) DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `altura` int(10) DEFAULT NULL,
  `telefoneContato` varchar(50) DEFAULT NULL,
  `vezVisto` varchar(500) DEFAULT NULL,
  `localVisto` varchar(500) DEFAULT NULL,
  `descricao` mediumtext DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origem` varchar(10) DEFAULT 'site',
  `usuario_id` int(11) NOT NULL,
  `latitude` decimal(10,7) DEFAULT 0.0000000,
  `longitude` decimal(10,7) DEFAULT 0.0000000,
  PRIMARY KEY (`id`),
  KEY `fk_desaparecido_usuario` (`usuario_id`),
  CONSTRAINT `fk_desaparecido_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.desaparecido: ~12 rows (aproximadamente)
INSERT INTO `desaparecido` (`nome`, `idade`, `sexo`, `altura`, `telefoneContato`, `vezVisto`, `localVisto`, `descricao`, `imagem`, `id`, `origem`, `usuario_id`, `latitude`, `longitude`) VALUES
	('Ana Carolina Silva', 26, 'Feminino', 160, '(11) 91234-5678', '2025-05-20', 'Terminal Rodoviário do Tietê, São Paulo - SP', 'Usava calça jeans azul escura, blusa vermelha de manga curta e tênis branco. Cabelos castanhos longos e lisos, estava com uma mochila lilás. Foi vista conversando com uma senhora próxima à bilheteria antes de desaparecer.', 'mulher1.jpg', 40, 'app', 1, -23.5160318, -46.6242863),
	('Lucas Henrique Alves', 23, 'Masculino', 184, '(11) 99876-5432', '2025-06-10', 'Praça da Sé, São Paulo - SP', 'Vestia camiseta do Corinthians, bermuda preta e tênis azul com detalhes brancos. Carregava uma bola de futebol debaixo do braço e foi visto brincando próximo à escadaria da Catedral da Sé. Relatos indicam que estava acompanhado de outros meninos.', 'homem1.jpg', 41, 'app', 2, -23.5502017, -46.6342653),
	('João Pedro Rocha', 25, 'Masculino', 179, '(21) 99812-1234', '2025-04-22', 'Av. Presidente Vargas, Rio de Janeiro - RJ', 'Adulto com sinais de confusão mental, foi visto vestindo camisa xadrez azul e calça social bege, além de um boné marrom gasto. Caminhava lentamente próximo a uma banca de jornal e parecia estar desorientado, pedindo informações.', 'homem2.jpg', 42, 'app', 3, -22.9057572, -43.1927703),
	('Maria Eduarda Costa', 23, 'Feminino', 154, '(31) 98765-4321', '2025-03-12', 'Shopping Del Rey, Belo Horizonte - MG', 'Estava sozinha, usando saia preta, blusa branca com estampa florida e sandálias. Cabelos loiros presos em coque, tinha uma tatuagem de borboleta no pulso direito. Foi vista pela última vez na praça de alimentação do shopping.', 'mulher2.jpg', 43, 'app', 4, -19.8904345, -43.9680771),
	('Carlos Daniel Ribeiro', 18, 'Masculino', 175, '(71) 91234-8888', '2025-06-01', 'Estação da Lapa, Salvador - BA', 'Adolescente trajava uniforme escolar azul claro e carregava mochila preta cheia de chaveiros coloridos. Usava óculos de grau de armação preta e estava esperando por transporte público quando desapareceu.', 'homem3.jpg', 44, 'app', 5, -12.9829480, -38.5119793),
	('Júlia Fernandes Lopes', 20, 'Feminino', 174, '(41) 99887-2345', '2025-02-05', 'Centro Histórico, Curitiba - PR', 'Vestia vestido longo branco e carregava uma bolsa vermelha de couro. Tinha cabelos castanhos ondulados soltos e usava brincos grandes dourados. Foi vista caminhando em direção à Praça Tiradentes por volta das 18h.', 'mulher3.jpg', 45, 'app', 6, -25.4276617, -49.2722117),
	('Miguel Andrade', 54, 'Masculino', 160, '(85) 99111-4433', '2025-06-15', 'Praia do Futuro, Fortaleza - CE', 'Foi visto entrando no mar sem camisa, vestindo apenas uma bermuda azul listrada. Carregava uma prancha de bodyboard amarela. Pessoas relataram que as ondas estavam fortes no momento do desaparecimento.', 'homem4.jpg', 46, 'app', 7, -3.7466293, -38.4461101),
	('Lara Beatriz Martins', 22, 'Feminino', 158, '(61) 98888-7766', '2025-05-07', 'Parque da Cidade, Brasília - DF', 'Jovem de cabelos cacheados escuros, usava blusa preta, calça jeans rasgada e tênis branco. Estava acompanhada de amigas, mas se afastou do grupo pouco antes de desaparecer. Relatos dizem que ela parecia estar usando fones de ouvido.', 'mulher4.jpeg', 47, 'app', 8, -15.7903320, -47.9005301),
	('Eduardo Nascimento', 24, 'Masculino', 190, '(27) 97777-1234', '2025-06-02', 'Portão de escola municipal, Vila Velha - ES', 'Vestia uniforme da empresa com boné azul e tênis branco de detalhes vermelhos. Foi visto saindo do trabalho e caminhando em direção a uma banca de revistas próximo à entrada.', 'homem5.jpg', 48, 'app', 9, 0.0000000, 0.0000000),
	('Fernanda Alves Moura', 30, 'Feminino', 163, '(62) 96666-2222', '2025-04-18', 'Terminal Isidória, Goiânia - GO', 'Mulher trajava terno preto formal, sapatos sociais e portava um crachá de empresa de tecnologia. Cabelos castanhos presos em coque, carregava uma pasta preta de documentos. Testemunhas relataram que ela aparentava estar com pressa.', 'mulher5.jpg', 49, 'app', 10, -16.7186228, -49.2534239),
	('Bruno César Lima', 19, 'Masculino', 178, '(95) 91122-3344', '2025-03-30', 'Rodoviária de Boa Vista - RR', 'Jovem com barba rala, vestia camiseta regata cinza, bermuda jeans e mochila grande de acampamento. Foi visto comprando passagem e depois andando em direção à área de embarque sozinho.', 'homem6.jpg', 50, 'app', 11, 2.8049808, -60.6886519),
	('Isabela Duarte', 26, 'Feminino', 170, '(98) 92211-3344', '2025-06-20', 'Praça Dom Pedro II, São Luís - MA', 'Vestia vestido floral colorido e óculos escuros grandes. Estava acompanhada de um cachorro de porte médio, marrom com coleira azul. Relatos indicam que ela caminhava em direção ao terminal de ônibus quando desapareceu.', 'mulher6.jpg', 51, 'app', 12, -2.5275741, -44.3050401);

-- Copiando estrutura para tabela tccorbit.membro
CREATE TABLE IF NOT EXISTS `membro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orbita_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orbita_id` (`orbita_id`),
  CONSTRAINT `membro_ibfk_1` FOREIGN KEY (`orbita_id`) REFERENCES `orbita` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.membro: ~4 rows (aproximadamente)
INSERT INTO `membro` (`id`, `orbita_id`, `nome`, `foto`, `latitude`, `longitude`) VALUES
	(1, 1, 'João', 'joao.jpg\r\n', -24.497000, -47.844000),
	(2, 1, 'Maria', 'maria.jpg', -24.500000, -47.846000),
	(3, 2, 'Carlos', 'carlos.jpg', -24.495000, -47.842000),
	(4, 3, 'Ana', 'ana.jpg', -24.499000, -47.840000);

-- Copiando estrutura para tabela tccorbit.orbita
CREATE TABLE IF NOT EXISTS `orbita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.orbita: ~3 rows (aproximadamente)
INSERT INTO `orbita` (`id`, `nome`) VALUES
	(1, 'Família'),
	(2, 'Amigos'),
	(3, 'Namorado');

-- Copiando estrutura para tabela tccorbit.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(300) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `email` varchar(300) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.usuario: ~14 rows (aproximadamente)
INSERT INTO `usuario` (`id`, `nome`, `nascimento`, `email`, `telefone`, `senha`) VALUES
	(1, 'Marcos Silva', '1990-05-12', 'marcos@email.com', '(11) 91234-5678', '123456'),
	(2, 'Patrícia Souza', '1988-11-23', 'patricia@email.com', '(11) 99876-5432', '123456'),
	(3, 'Fernando Lima', '1958-03-10', 'fernando@email.com', '(21) 99812-1234', '123456'),
	(4, 'Juliana Costa', '2000-01-15', 'juliana@email.com', '(31) 98765-4321', '123456'),
	(5, 'Carlos Oliveira', '2005-07-30', 'carlos@email.com', '(71) 91234-8888', '123456'),
	(6, 'Renata Pereira', '1994-12-02', 'renata@email.com', '(41) 99887-2345', '123456'),
	(7, 'Gustavo Martins', '1989-09-14', 'gustavo@email.com', '(85) 99111-4433', '123456'),
	(8, 'Camila Rocha', '2006-03-18', 'camila@email.com', '(61) 98888-7766', '123456'),
	(9, 'André Nascimento', '2011-04-20', 'andre@email.com', '(27) 97777-1234', '123456'),
	(10, 'Isabela Mendes', '1985-08-05', 'isabela@email.com', '(62) 96666-2222', '123456'),
	(11, 'Rafael Carvalho', '2004-02-12', 'rafael@email.com', '(95) 91122-3344', '123456'),
	(12, 'Ana Paula Ribeiro', '1997-06-25', 'ana@email.com', '(98) 92211-3344', '123456'),
	(15, '', NULL, '', '', ''),
	(16, '', NULL, '', '', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
