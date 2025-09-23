<?php
$servername = "localhost";
$username = "root"; // usuário padrão do XAMPP
$password = ""; // senha padrão do XAMPP (vazia)
$dbname = "tccorbit"; // substitua pelo nome do seu banco

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Definir charset para utf8
$conn->set_charset("utf8");
?>