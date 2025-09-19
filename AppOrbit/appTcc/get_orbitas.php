<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "usuario", "senha", "banco");

$sql = "SELECT o.id as orbita_id, o.nome as orbita_nome, 
               m.id as membro_id, m.nome as membro_nome, 
               m.foto, m.latitude, m.longitude
        FROM orbita o
        LEFT JOIN membro m ON o.id = m.orbita_id";
$result = $conn->query($sql);

$orbitas = [];
while ($row = $result->fetch_assoc()) {
    $orbitaId = $row['orbita_id'];

    if (!isset($orbitas[$orbitaId])) {
        $orbitas[$orbitaId] = [
            "id" => $orbitaId,
            "nome" => $row['orbita_nome'],
            "membros" => []
        ];
    }

    if ($row['membro_id']) {
        $orbitas[$orbitaId]["membros"][] = [
            "id" => $row['membro_id'],
            "nome" => $row['membro_nome'],
            "foto" => trim($row['foto']),
            "latitude" => $row['latitude'],
            "longitude" => $row['longitude']
        ];
    }
}

echo json_encode(array_values($orbitas));
$conn->close();
?>
