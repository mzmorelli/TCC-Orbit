-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para tccorbit
CREATE DATABASE IF NOT EXISTS `tccorbit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `tccorbit`;

-- Copiando estrutura para tabela tccorbit.desaparecido
CREATE TABLE IF NOT EXISTS `desaparecido` (
  `nome` varchar(200) NOT NULL,
  `idade` int(3) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `altura` int(10) NOT NULL,
  `telefoneContato` varchar(50) NOT NULL,
  `vezVisto` varchar(500) NOT NULL,
  `localVisto` varchar(500) NOT NULL,
  `descricao` mediumtext DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origem` varchar(10) DEFAULT 'site',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela tccorbit.desaparecido: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `desaparecido` DISABLE KEYS */;
INSERT INTO `desaparecido` (`nome`, `idade`, `sexo`, `altura`, `telefoneContato`, `vezVisto`, `localVisto`, `descricao`, `imagem`, `id`, `origem`) VALUES
	('Ana Carolina Silva', 16, 'Feminino', 160, '(11) 91234-5678', '2025-05-20 ', 'Terminal Rodoviário do Tietê, São Paulo - SP', 'Usava calça jeans e blusa vermelha, cabelo castanh', 'mulher1.jpg', 28, 'app'),
	('Lucas Henrique Alves', 10, 'Masculino', 184, '(11) 99876-5432', '2025-06-10 ', 'Praça da Sé, São Paulo - SP', 'Camiseta do Corinthians, bermuda preta, tênis azul', 'homem1.jpg', 29, 'app'),
	('João Pedro Rocha', 65, 'Masculino', 179, '(21) 99812-1234', '2025-04-22 ', 'Av. Presidente Vargas, Rio de Janeiro - RJ', 'Aparenta confusão mental, vestia camisa xadrez e c', 'homem2.jpg', 30, 'app'),
	('Maria Eduarda Costa', 23, 'Feminino', 154, '(31) 98765-4321', '2025-03-12 ', 'Shopping Del Rey, Belo Horizonte - MG', 'Estava sozinha, cabelo loiro preso em coque, tatua', 'mulher2.jpg', 31, 'app'),
	('Carlos Daniel Ribeiro', 14, 'Masculino', 175, '(71) 91234-8888', '2025-06-01 ', 'Estação da Lapa, Salvador - BA', 'Uniforme escolar azul, mochila preta com chaveiros', 'homem3.jpg', 32, 'app'),
	('Júlia Fernandes Lopes', 29, 'Feminino', 174, '(41) 99887-2345', '2025-02-05 ', 'Centro Histórico, Curitiba - PR', 'Usava vestido longo branco e carregava bolsa verme', 'mulher3.jpg', 33, 'app'),
	('Miguel Andrade', 34, 'Masculino', 160, '(85) 99111-4433', '2025-06-15 ', 'Praia do Futuro, Fortaleza - CE', 'Última vez visto entrando no mar, sem camisa, berm', 'homem4.jpg', 34, 'app'),
	('Lara Beatriz Martins', 17, 'Feminino', 158, '(61) 98888-7766', '2025-05-07 ', 'Parque da Cidade, Brasília - DF', 'Blusa preta, calça jeans rasgada, cabelo cacheado ', 'mulher4.jpeg', 35, 'app'),
	('Eduardo Nascimento', 12, 'Masculino', 190, '(27) 97777-1234', '2025-06-02 ', 'Portão de escola municipal, Vila Velha - ES', 'Uniforme escolar, boné azul, tênis branco com deta', 'homem5.jpg', 36, 'app'),
	('Fernanda Alves Moura', 38, 'Feminino', 163, '(62) 96666-2222', '2025-04-18 ', 'Terminal Isidória, Goiânia - GO', 'Terno preto, usava crachá de empresa de tecnologia', 'mulher5.jpg', 37, 'app'),
	('Bruno César Lima', 19, 'Masculino', 178, '(95) 91122-3344', '2025-03-30 ', 'Rodoviária de Boa Vista - RR', 'Camiseta regata, mochila grande, barba rala.', 'homem6.jpg', 38, 'app'),
	('Isabela Duarte', 26, 'Feminino', 170, '(98) 92211-3344', '2025-06-20 ', 'Praça Dom Pedro II, São Luís - MA', 'Vestido floral, óculos escuros, estava com cachorr', 'mulher6.jpg', 39, 'app');
/*!40000 ALTER TABLE `desaparecido` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
