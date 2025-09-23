<?php
header('Content-Type: application/json');
include 'conexao.php';

echo json_encode([
    'status' => 'success', 
    'message' => 'Conexão OK',
    'server_time' => date('Y-m-d H:i:s')
]);
?>