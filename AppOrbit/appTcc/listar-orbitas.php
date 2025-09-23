<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require_once "conexao.php";

try {
    $orbitaId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($orbitaId) {
        $stmt = $conn->prepare("SELECT * FROM orbita WHERE id = ?");
        $stmt->bind_param("i", $orbitaId);
        $stmt->execute();
        $result = $stmt->get_result();
        $orbita = $result->fetch_assoc();

        if ($orbita) {
            $stmt_membros = $conn->prepare("SELECT * FROM membro WHERE orbita_id = ?");
            $stmt_membros->bind_param("i", $orbitaId);
            $stmt_membros->execute();
            $membros_result = $stmt_membros->get_result();

            $membros = [];
            while ($membro = $membros_result->fetch_assoc()) {
                $membros[] = $membro;
            }
            $orbita['membro'] = $membros;

            echo json_encode([
                "success" => true,
                "orbita" => $orbita  // <- sempre objeto
            ]);
            exit;
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Órbita não encontrada"
            ]);
            exit;
        }
    } else {
        // Lista todas as órbitas
        $result = $conn->query("SELECT * FROM orbita");
        $orbitas = [];

        while ($row = $result->fetch_assoc()) {
            $stmt_membros = $conn->prepare("SELECT * FROM membro WHERE orbita_id = ?");
            $stmt_membros->bind_param("i", $row['id']);
            $stmt_membros->execute();
            $membros_result = $stmt_membros->get_result();
            $membros = [];
            while ($membro = $membros_result->fetch_assoc()) {
                $membros[] = $membro;
            }
            $row['membro'] = $membros;
            $orbitas[] = $row;
        }

        echo json_encode([
            "success" => true,
            "orbita" => $orbitas
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
