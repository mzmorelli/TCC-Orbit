<?php
require_once "conexao.php";

header("Content-Type: application/json; charset=utf-8");

$data = json_decode(file_get_contents("php://input"), true);
$usuario_id = $data['usuario_id'] ?? 0;

if (!$usuario_id) {
    echo json_encode([
        "success" => false,
        "message" => "ID do usuário não informado."
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT d.*, u.nome AS usuario_nome 
        FROM desaparecido d
        INNER JOIN usuario u ON d.usuario_id = u.id
        WHERE d.usuario_id = ?
        ORDER BY d.id DESC
    ");
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $desaparecidos = [];
    while ($row = $result->fetch_assoc()) {
        $desaparecidos[] = $row;
    }

    echo json_encode([
        "success" => true,
        "desaparecidos" => $desaparecidos
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao buscar desaparecidos: " . $e->getMessage()
    ]);
}
?>
