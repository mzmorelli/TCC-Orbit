<?php
require_once "conexao.php";

header("Content-Type: application/json; charset=utf-8");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum dado recebido."
    ]);
    exit;
}

try {
    $usuario = $data["usuario"];
    $mensagem = "Enviou um alerta de emergência!";

    $stmt = $conn->prepare("INSERT INTO alerta (usuario, mensagem) VALUES (?, ?)");
    $stmt->bind_param("ss", $usuario, $mensagem);


    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Alerta salvo com sucesso!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao salvar alerta."
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no banco: " . $e->getMessage()
    ]);
}
?>
