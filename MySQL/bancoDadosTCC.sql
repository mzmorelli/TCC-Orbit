-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.33-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando dados para a tabela tccorbit.desaparecido: ~12 rows (aproximadamente)
DELETE FROM `desaparecido`;
/*!40000 ALTER TABLE `desaparecido` DISABLE KEYS */;
INSERT INTO `desaparecido` (`nome`, `idade`, `sexo`, `altura`, `telefoneContato`, `vezVisto`, `localVisto`, `descricao`, `imagem`, `id`, `origem`, `usuario_id`) VALUES
	('Ana Carolina Silva', 28, 'Feminino', 160, '(11) 91234-5678', '2025-05-20', 'Terminal Rodoviário do Tietê, São Paulo - SP', 'Usava calça jeans azul escura, blusa vermelha de manga curta e tênis branco. Cabelos castanhos longos e lisos, estava com uma mochila lilás. Foi vista conversando com uma senhora próxima à bilheteria antes de desaparecer.', 'mulher1.jpg', 40, 'app', 1),
	('Lucas Henrique Alves', 24, 'Masculino', 184, '(11) 99876-5432', '2025-06-10', 'Praça da Sé, São Paulo - SP', 'Vestia camiseta do Corinthians, bermuda preta e tênis azul com detalhes brancos. Carregava uma bola de futebol debaixo do braço e foi visto brincando próximo à escadaria da Catedral da Sé. Relatos indicam que estava acompanhado de outros meninos.', 'homem1.jpg', 41, 'app', 2),
	('João Pedro Rocha', 24, 'Masculino', 179, '(21) 99812-1234', '2025-04-22', 'Av. Presidente Vargas, Rio de Janeiro - RJ', 'Idoso com sinais de confusão mental, foi visto vestindo camisa xadrez azul e calça social bege, além de um boné marrom gasto. Caminhava lentamente próximo a uma banca de jornal e parecia estar desorientado, pedindo informações.', 'homem2.jpg', 42, 'app', 3),
	('Maria Eduarda Costa', 23, 'Feminino', 154, '(31) 98765-4321', '2025-03-12', 'Shopping Del Rey, Belo Horizonte - MG', 'Estava sozinha, usando saia preta, blusa branca com estampa florida e sandálias. Cabelos loiros presos em coque, tinha uma tatuagem de borboleta no pulso direito. Foi vista pela última vez na praça de alimentação do shopping.', 'mulher2.jpg', 43, 'app', 4),
	('Carlos Daniel Ribeiro', 18, 'Masculino', 175, '(71) 91234-8888', '2025-06-01', 'Estação da Lapa, Salvador - BA', 'Adolescente trajava uniforme escolar azul claro e carregava mochila preta cheia de chaveiros coloridos. Usava óculos de grau de armação preta e estava esperando por transporte público quando desapareceu.', 'homem3.jpg', 44, 'app', 5),
	('Júlia Fernandes Lopes', 22, 'Feminino', 174, '(41) 99887-2345', '2025-02-05', 'Centro Histórico, Curitiba - PR', 'Vestia vestido longo branco e carregava uma bolsa vermelha de couro. Tinha cabelos castanhos ondulados soltos e usava brincos grandes dourados. Foi vista caminhando em direção à Praça Tiradentes por volta das 18h.', 'mulher3.jpg', 45, 'app', 6),
	('Miguel Andrade', 50, 'Masculino', 160, '(85) 99111-4433', '2025-06-15', 'Praia do Futuro, Fortaleza - CE', 'Foi visto entrando no mar sem camisa, vestindo apenas uma bermuda azul listrada. Carregava uma prancha de bodyboard amarela. Pessoas relataram que as ondas estavam fortes no momento do desaparecimento.', 'homem4.jpg', 46, 'app', 7),
	('Lara Beatriz Martins', 20, 'Feminino', 158, '(61) 98888-7766', '2025-05-07', 'Parque da Cidade, Brasília - DF', 'Adolescente de cabelos cacheados escuros, usava blusa preta, calça jeans rasgada e tênis branco. Estava acompanhada de amigas, mas se afastou do grupo pouco antes de desaparecer. Relatos dizem que ela parecia estar usando fones de ouvido.', 'mulher4.jpeg', 47, 'app', 8),
	('Eduardo Nascimento', 25, 'Masculino', 190, '(27) 97777-1234', '2025-06-02', 'Portão de escola municipal, Vila Velha - ES', 'Criança de estatura alta para a idade, vestia uniforme escolar com boné azul e tênis branco de detalhes vermelhos. Foi visto saindo da escola e caminhando em direção a uma banca de revistas próximo à entrada.', 'homem5.jpg', 48, 'app', 9),
	('Fernanda Alves Moura', 23, 'Feminino', 163, '(62) 96666-2222', '2025-04-18', 'Terminal Isidória, Goiânia - GO', 'Mulher trajava terno preto formal, sapatos sociais e portava um crachá de empresa de tecnologia. Cabelos castanhos presos em coque, carregava uma pasta preta de documentos. Testemunhas relataram que ela aparentava estar com pressa.', 'mulher5.jpg', 49, 'app', 10),
	('Bruno César Lima', 19, 'Masculino', 178, '(95) 91122-3344', '2025-03-30', 'Rodoviária de Boa Vista - RR', 'Jovem com barba rala, vestia camiseta regata cinza, bermuda jeans e mochila grande de acampamento. Foi visto comprando passagem e depois andando em direção à área de embarque sozinho.', 'homem6.jpg', 50, 'app', 11),
	('Isabela Duarte', 26, 'Feminino', 170, '(98) 92211-3344', '2025-06-20', 'Praça Dom Pedro II, São Luís - MA', 'Vestia vestido floral colorido e óculos escuros grandes. Estava acompanhada de um cachorro de porte médio, marrom com coleira azul. Relatos indicam que ela caminhava em direção ao terminal de ônibus quando desapareceu.', 'mulher6.jpg', 51, 'app', 12);
/*!40000 ALTER TABLE `desaparecido` ENABLE KEYS */;

-- Copiando dados para a tabela tccorbit.membro: ~4 rows (aproximadamente)
DELETE FROM `membro`;
/*!40000 ALTER TABLE `membro` DISABLE KEYS */;
INSERT INTO `membro` (`id`, `orbita_id`, `nome`, `foto`, `latitude`, `longitude`) VALUES
	(1, 1, 'João', 'joao.jpg\r\n', -24.497000, -47.844000),
	(2, 1, 'Maria', 'maria.jpg', -24.500000, -47.846000),
	(3, 2, 'Carlos', 'carlos.jpg', -24.495000, -47.842000),
	(4, 3, 'Ana', 'ana.jpg', -24.499000, -47.840000);
/*!40000 ALTER TABLE `membro` ENABLE KEYS */;

-- Copiando dados para a tabela tccorbit.orbita: ~3 rows (aproximadamente)
DELETE FROM `orbita`;
/*!40000 ALTER TABLE `orbita` DISABLE KEYS */;
INSERT INTO `orbita` (`id`, `nome`) VALUES
	(1, 'Família'),
	(2, 'Amigos'),
	(3, 'Namorado');
/*!40000 ALTER TABLE `orbita` ENABLE KEYS */;

-- Copiando dados para a tabela tccorbit.usuario: ~12 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `nascimento`, `email`, `telefone`, `senha`) VALUES
	(1, 'Marcos Silva', '1990-05-12', 'carolina@email.com', '(11) 91234-5678', '123456'),
	(2, 'Patrícia Souza', '1988-11-23', 'lucas@email.com', '(11) 99876-5432', '123456'),
	(3, 'Fernando Lima', '1958-03-10', 'joao@email.com', '(21) 99812-1234', '123456'),
	(4, 'Juliana Costa', '2000-01-15', 'maria@email.com', '(31) 98765-4321', '123456'),
	(5, 'Carlos Oliveira', '2005-07-30', 'carlos@email.com', '(71) 91234-8888', '123456'),
	(6, 'Renata Pereira', '1994-12-02', 'julia@email.com', '(41) 99887-2345', '123456'),
	(7, 'Gustavo Martins', '1989-09-14', 'miguel@email.com', '(85) 99111-4433', '123456'),
	(8, 'Camila Rocha', '2006-03-18', 'lara@email.com', '(61) 98888-7766', '123456'),
	(9, 'André Nascimento', '2011-04-20', 'eduardo@email.com', '(27) 97777-1234', '123456'),
	(10, 'Isabela Mendes', '1985-08-05', 'fernanda@email.com', '(62) 96666-2222', '123456'),
	(11, 'Rafael Carvalho', '2004-02-12', 'bruno@email.com', '(95) 91122-3344', '123456'),
	(12, 'Ana Paula Ribeiro', '1997-06-25', 'isabela@email.com', '(98) 92211-3344', '123456');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
