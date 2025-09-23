<?php
include("conexao.php");

$response = array();

$sql = "SELECT d.*, u.nome AS usuario_nome, u.telefone AS usuario_telefone
        FROM desaparecido d
        LEFT JOIN usuario u ON d.usuario_id = u.id
        ORDER BY d.id DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $dados = array();
    while ($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }
    $response['success'] = true;
    $response['dados'] = $dados;
} else {
    $response['success'] = false;
    $response['message'] = 'Nenhum desaparecido encontrado';
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
