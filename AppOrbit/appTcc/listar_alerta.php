<?php
require_once "conexao.php";

try {
    $result = $conn->query("SELECT * FROM alerta ORDER BY id DESC");
    $alertas = [];
    while ($row = $result->fetch_assoc()) {
        $alertas[] = $row;
    }

    echo json_encode([
        "success" => true,
        "alertas" => $alertas
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao buscar alertas: " . $e->getMessage()
    ]);
}
?>
