<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('conexao.php');

try {
    $query = $pdo->query("SELECT * FROM desaparecido ORDER BY id DESC");
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'dados' => $res
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
