<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include 'conexao.php';

$desaparecidos = [];

try {
    // Query mais simples e segura
    $query = $conn->query("
        SELECT 
            id, 
            nome, 
            idade,
            altura,
            sexo,
            descricao,
            localVisto, 
            vezVisto,
            telefoneContato,
            imagem, 
            origem, 
            latitude, 
            longitude
        FROM desaparecido
    ");

    if ($query) {
        while ($row = $query->fetch_assoc()) {
            $lat = $row['latitude'];
            $lon = $row['longitude'];

            // Se não tem coordenadas, tenta geocodificar
            if (empty($lat) || empty($lon) || $lat == 0 || $lon == 0) {
                $endereco = $row['localVisto'];
                if ($endereco && !empty(trim($endereco))) {
                    $url = "https://nominatim.openstreetmap.org/search?format=json&q=" . urlencode($endereco);
                    
                    $context = stream_context_create([
                        'ssl' => [
                            'verify_peer' => false,
                            'verify_peer_name' => false,
                        ],
                        'http' => [
                            'timeout' => 5,
                            'user_agent' => 'Mozilla/5.0'
                        ]
                    ]);
                    
                    $res = @file_get_contents($url, false, $context);
                    if ($res) {
                        $data = json_decode($res, true);
                        if ($data && count($data) > 0) {
                            $lat = floatval($data[0]['lat']);
                            $lon = floatval($data[0]['lon']);

                            if ($lat != 0 && $lon != 0) {
                                $stmt = $conn->prepare("UPDATE desaparecido SET latitude=?, longitude=? WHERE id=?");
                                $stmt->bind_param("ddi", $lat, $lon, $row['id']);
                                $stmt->execute();
                            }
                        }
                    }
                }
            }

            if (!empty($lat) && !empty($lon) && $lat != 0 && $lon != 0) {
                $desaparecidos[] = [
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'idade' => $row['idade'],
                    'altura' => $row['altura'],
                    'sexo' => $row['sexo'],
                    'descricao' => $row['descricao'],
                    'localVisto' => $row['localVisto'],
                    'vezVisto' => $row['vezVisto'],
                    'telefoneContato' => $row['telefoneContato'],
                    'imagem' => $row['imagem'],
                    'origem' => $row['origem'],
                    'usuario_nome' => 'Família/Amigos', 
                    'latitude' => floatval($lat),
                    'longitude' => floatval($lon)
                ];
            }
        }

        echo json_encode([
            'success' => true, 
            'dados' => $desaparecidos
        ]);

    } else {
        throw new Exception("Erro na consulta ao banco: " . $conn->error);
    }

} catch(Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>