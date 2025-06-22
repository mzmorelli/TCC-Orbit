<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With'); 
header('Content-Type: application/json; charset=utf-8');  

date_default_timezone_set('America/Sao_Paulo');

$usuario = 'root';
$senha = '';
$host = 'localhost';
$banco = 'tccorbit';

try {
    $pdo = new PDO("mysql:dbname=$banco;host=$host", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao conectar com o banco: ' . $e->getMessage()
    ]);
    exit;
}
?>