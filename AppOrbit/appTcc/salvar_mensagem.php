<?php
header("Access-Control-Allow-Origin: *");
include "conexao.php";

$orbita_id = $_POST["orbita_id"];
$usuario_id = $_POST["usuario_id"];
$mensagem = $_POST["mensagem"];

if (!$orbita_id || !$usuario_id || !$mensagem) {
    echo json_encode(["status" => "erro"]);
    exit;
}

$sql = "INSERT INTO chat_orbita (orbita_id, usuario_id, mensagem) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $orbita_id, $usuario_id, $mensagem);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "erro"]);
}
