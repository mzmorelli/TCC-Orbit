<?php
header('Content-Type: application/json');
include 'conexao.php'; 

$desaparecidos = [];

try {
    $query = $conn->query("SELECT id, nome, localVisto, imagem, origem, latitude, longitude FROM desaparecido");

    if ($query) {
        while ($row = $query->fetch_assoc()) {
            $lat = $row['latitude'];
            $lon = $row['longitude'];

            if (!$lat || !$lon) {
                $endereco = $row['localVisto'];
                if ($endereco) {
                    $url = "https://nominatim.openstreetmap.org/search?format=json&q=" . urlencode($endereco);
                    $res = @file_get_contents($url);
                    $data = $res ? json_decode($res, true) : null;

                    if ($data && count($data) > 0) {
                        $lat = $data[0]['lat'];
                        $lon = $data[0]['lon'];

                        $stmt = $conn->prepare("UPDATE desaparecido SET latitude=?, longitude=? WHERE id=?");
                        $stmt->bind_param("ddi", $lat, $lon, $row['id']);
                        $stmt->execute();
                    }
                }
            }

            $desaparecidos[] = [
                'id' => $row['id'],
                'nome' => $row['nome'],
                'localVisto' => $row['localVisto'],
                'imagem' => $row['imagem'],
                'origem' => $row['origem'],
                'latitude' => $lat,
                'longitude' => $lon
            ];
        }

        echo json_encode(['success' => true, 'dados' => $desaparecidos]);
    } else {
        throw new Exception("Erro na consulta ao banco: " . $conn->error);
    }

} catch(Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
