<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('conexao.php');

try {
    // Faz o JOIN com a tabela usuario usando usuario_id
    $query = $pdo->query("
        SELECT d.*, u.nome AS usuario_nome
        FROM desaparecido d
        LEFT JOIN usuario u ON d.usuario_id = u.id
        ORDER BY d.id DESC
    ");
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
?>
