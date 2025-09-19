<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require_once "conexao.php";

try {
    // Verificar se foi passado um ID específico
    $orbitaId = isset($_GET['id']) ? $_GET['id'] : null;
    
    if ($orbitaId) {
        // Buscar órbita específica
        $stmt = $pdo->prepare("SELECT * FROM orbita WHERE id = ?");
        $stmt->execute([$orbitaId]);
        $orbita = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($orbita) {
            // Buscar membros dessa órbita (CORRIGIDO: WHERE orbita_id = ?)
            $stmt_membros = $pdo->prepare("SELECT * FROM membro WHERE orbita_id = ?");
            $stmt_membros->execute([$orbitaId]);
            $membros = $stmt_membros->fetchAll(PDO::FETCH_ASSOC);
            $orbita['membro'] = $membros;
            
            echo json_encode(["success" => true, "orbita" => $orbita]);
        } else {
            echo json_encode(["success" => false, "message" => "Órbita não encontrada"]);
        }
    } else {
        // Buscar todas as órbitas (para a Home)
        $stmt = $pdo->query("SELECT * FROM orbita");
        $orbitas = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Buscar membros de cada órbita
            $stmt_membros = $pdo->prepare("SELECT * FROM membro WHERE orbita_id = ?");
            $stmt_membros->execute([$row['id']]);
            $membros = $stmt_membros->fetchAll(PDO::FETCH_ASSOC);
            $row['membro'] = $membros;
            $orbitas[] = $row;
        }
        
        echo json_encode(["success" => true, "orbita" => $orbitas]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>