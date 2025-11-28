<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);
$ids = $data['ids'] ?? [];

if (empty($ids)) {
    echo json_encode(["success" => false, "message" => "IDs não fornecidos"]);
    exit;
}

// Converter array para string separada por vírgulas
$idsStr = implode(',', array_map('intval', $ids));

$sql = "SELECT id, nome FROM usuario WHERE id IN ($idsStr)";
$result = $conn->query($sql);

$usuarios = [];
while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $usuarios
]);

$conn->close();
?>