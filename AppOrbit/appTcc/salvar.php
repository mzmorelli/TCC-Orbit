<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

include_once('conexao.php');

// Diretório para salvar as imagens
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$response = ['success' => false, 'message' => ''];

try {
    // Verifica se é upload de arquivo
    if (isset($_FILES['imagem'])) {
        $file = $_FILES['imagem'];
        
        // Gera um nome único para o arquivo
        $fileName = uniqid() . '_' . basename($file['name']);
        $targetPath = $uploadDir . $fileName;
        
        // Move o arquivo para o diretório de uploads
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            // Recebe os outros dados do formulário
            $postData = json_decode($_POST['data'], true);
            
            $query = $pdo->prepare("INSERT INTO desaparecido SET 
                nome = :nome, 
                idade = :idade, 
                sexo = :sexo,
                altura = :altura, 
                vezVisto = :vezVisto,  
                localVisto = :localVisto, 
                telefoneContato = :telefoneContato,
                descricao = :descricao,
                imagem = :imagem,
                origem =  :origem
            ");

            $query->bindValue(":nome", $postData['nomeCompleto'] ?? '');
            $query->bindValue(":idade", $postData['idade'] ?? NULL);
            $query->bindValue(":sexo", $postData['sexo'] ?? NULL);
            $query->bindValue(":altura", $postData['altura'] ?? NULL);
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
                unlink($targetPath); // Remove a imagem se o cadastro falhar
                $response['message'] = 'Erro ao inserir no banco de dados';
            }
        } else {
            $response['message'] = 'Erro ao fazer upload da imagem';
        }
    } else {
        $response['message'] = 'Nenhuma imagem enviada';
    }
} catch (Exception $e) {
    $response['message'] = 'Erro: ' . $e->getMessage();
}

echo json_encode($response);
?>