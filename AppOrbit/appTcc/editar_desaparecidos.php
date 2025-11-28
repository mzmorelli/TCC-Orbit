<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$nome = $data["nome"];
$idade = $data["idade"];
$altura = $data["altura"];
$vezVisto = $data["vezVisto"];
$localVisto = $data["localVisto"];
$telefoneContato = $data["telefoneContato"];
$imagem = $data["imagem"]; 

$sql = "UPDATE desaparecido SET
        nome='$nome',
        idade='$idade',
        altura='$altura',
        vezVisto='$vezVisto',
        localVisto='$localVisto',
        telefoneContato='$telefoneContato'
        WHERE id='$id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

$conn->close();
