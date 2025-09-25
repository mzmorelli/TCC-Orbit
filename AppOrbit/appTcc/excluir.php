<?php
include('conexao.php');

$json = file_get_contents('php://input');
$data = json_decode($json);

$id = $data->id;

$query = "DELETE FROM albuns WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
