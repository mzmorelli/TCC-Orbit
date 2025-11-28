<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "conexao.php";

$orbitaId = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "
    SELECT 
        c.id,
        c.orbita_id,
        c.usuario_id,
        c.mensagem,
        c.data_envio,
        u.nome AS usuario_nome
    FROM chat_orbita c
    INNER JOIN usuario u ON u.id = c.usuario_id
    WHERE c.orbita_id = ?
    ORDER BY c.id ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orbitaId);
$stmt->execute();
$result = $stmt->get_result();

$mensagens = [];

while ($row = $result->fetch_assoc()) {
    $mensagens[] = $row;
}

echo json_encode($mensagens);
?>
