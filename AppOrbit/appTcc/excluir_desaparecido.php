<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "ID não enviado"]);
    exit;
}

$id = $data["id"];

$consulta = $conn->query("SELECT imagem FROM desaparecido WHERE id = '$id'");
$dados = $consulta->fetch_assoc();

if ($dados && $dados["imagem"] && file_exists("uploads/" . $dados["imagem"])) {
    unlink("uploads/" . $dados["imagem"]);
}

$sql = "DELETE FROM desaparecido WHERE id = '$id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao excluir"]);
}

$conn->close();
