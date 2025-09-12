<?php 
// Evita qualquer output antes do JSON
ob_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

$response = ['success' => false, 'message' => ''];

try {
    include_once('conexao.php');

    // Recebe os dados JSON enviados pelo app
    $postData = json_decode(file_get_contents("php://input"), true);

    $nome = $postData['nome'] ?? '';
    $telefone = $postData['telefone'] ?? '';
    $email = $postData['email'] ?? '';
    $senha = $postData['senha'] ?? '';
    $nascimento = $postData['nascimento'] ?? null;

    $query = $pdo->prepare("
    INSERT INTO usuario (nome, nascimento, email, telefone, senha) 
    VALUES (:nome, :nascimento, :email, :telefone, :senha)
");


    $query->bindValue(":nome", $nome);
    $query->bindValue(":nascimento", $nascimento);
    $query->bindValue(":email", $email);
    $query->bindValue(":telefone", $telefone);
    $query->bindValue(":senha", $senha);

    if ($query->execute()) {
        $response['success'] = true;
        $response['message'] = 'Usuário cadastrado com sucesso';
    } else {
        $response['message'] = 'Erro ao inserir usuário no banco';
    }

} catch (Exception $e) {
    $response['message'] = 'Erro: ' . $e->getMessage();
}

// Limpa qualquer output antes do JSON
ob_end_clean();
echo json_encode($response);
