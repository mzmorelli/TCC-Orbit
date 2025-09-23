<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir e verificar conexão
include 'conexao.php';

// Verificar se a conexão foi estabelecida
if (!isset($conn) || $conn->connect_error) {
    echo json_encode([
        'success' => false, 
        'msg' => 'Erro de conexão com o banco: ' . ($conn->connect_error ?? 'Conexão não estabelecida')
    ]);
    exit;
}

// Log para debug
file_put_contents('debug_login.txt', date('Y-m-d H:i:s') . " - Login attempt\n", FILE_APPEND);

// Obter dados da requisição
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$email = isset($data['email']) ? strtolower(trim($data['email'])) : '';
$senha = isset($data['senha']) ? trim($data['senha']) : '';

file_put_contents('debug_login.txt', "Email: $email, Senha: $senha\n", FILE_APPEND);

if (empty($email) || empty($senha)) {
    echo json_encode(['success' => false, 'msg' => 'Email e senha são obrigatórios']);
    exit;
}

try {
    // Buscar apenas os campos essenciais
    $sql = "SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?";
    
    file_put_contents('debug_login.txt', "Query: $sql\n", FILE_APPEND);
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception('Erro na preparação da query: ' . $conn->error);
    }
    
    $stmt->bind_param("ss", $email, $senha);
    
    if (!$stmt->execute()) {
        throw new Exception('Erro na execução: ' . $stmt->error);
    }
    
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        file_put_contents('debug_login.txt', "Login success for: $email - User: " . json_encode($user) . "\n", FILE_APPEND);
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        file_put_contents('debug_login.txt', "Login failed for: $email\n", FILE_APPEND);
        echo json_encode(['success' => false, 'msg' => 'Email ou senha inválidos']);
    }
} catch (Exception $e) {
    file_put_contents('debug_login.txt', "Error: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(['success' => false, 'msg' => 'Erro no servidor: ' . $e->getMessage()]);
}

// Fechar conexão
if (isset($stmt)) $stmt->close();
if (isset($conn)) $conn->close();
?>