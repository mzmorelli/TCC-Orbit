<?php
// Mostra erros no PHP (útil para dev)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

include_once('conexao.php');

$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

$response = ['success' => false, 'message' => '', 'debug' => []];

try {
    if (!isset($_FILES['imagem'])) {
        throw new Exception('Nenhuma imagem enviada');
    }

    $file = $_FILES['imagem'];
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception('Erro ao fazer upload da imagem');
    }

    if (!isset($_POST['data'])) {
        unlink($targetPath);
        throw new Exception('Dados do formulário não recebidos');
    }

    $postData = json_decode($_POST['data'], true);
    if (!$postData) {
        unlink($targetPath);
        throw new Exception('Erro ao decodificar JSON');
    }

    $response['debug'][] = $postData; // mostra os dados recebidos

    $query = $pdo->prepare("INSERT INTO desaparecido 
        (nome, idade, sexo, altura, vezVisto, localVisto, telefoneContato, descricao, imagem, origem)
        VALUES
        (:nome, :idade, :sexo, :altura, :vezVisto, :localVisto, :telefoneContato, :descricao, :imagem, :origem)
    ");

    $query->bindValue(":nome", $postData['nomeCompleto'] ?? '');
    $query->bindValue(":idade", !empty($postData['idade']) ? (int)$postData['idade'] : NULL);
    $query->bindValue(":sexo", $postData['sexo'] ?? NULL);
    $query->bindValue(":altura", !empty($postData['altura']) ? (int)$postData['altura'] : NULL);
    $query->bindValue(":vezVisto", $postData['ultimaData'] ?? NULL);
    $query->bindValue(":localVisto", $postData['ultimoLocal'] ?? NULL);
    $query->bindValue(":telefoneContato", $postData['telefone'] ?? NULL);
    $query->bindValue(":descricao", $postData['descricao'] ?? NULL);
    $query->bindValue(":imagem", $fileName);
    $query->bindValue(":origem", 'app');

    if ($query->execute()) {
        $response['success'] = true;
        $response['message'] = 'Cadastro realizado com sucesso';
    } else {
        unlink($targetPath);
        $response['message'] = 'Erro no banco de dados';
        $response['debug'][] = $query->errorInfo(); // log do PDO
    }

} catch (Exception $e) {
    $response['message'] = 'Erro: ' . $e->getMessage();
}

echo json_encode($response);
