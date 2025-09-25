<?php
header('Content-Type: application/json');
require_once 'conexao.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    if (
        !isset($dados['id']) || !isset($dados['nomeCompleto']) || 
        !isset($dados['idade']) || !isset($dados['sexo']) || 
        !isset($dados['ultimoLocal']) || !isset($dados['ultimaData'])
    ) {
        echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE desaparecido SET 
        nome = :nome, 
        idade = :idade, 
        sexo = :sexo,
        altura = :altura, 
        vezVisto = :vezVisto,  
        localVisto = :localVisto, 
        telefoneContato = :telefoneContato,
        descricao = :descricao
        WHERE id = :id
    ");

    $stmt->execute([
        ':nome' => $dados['nomeCompleto'],
        ':idade' => $dados['idade'],
        ':sexo' => $dados['sexo'],
        ':altura' => $dados['altura'] ?? null,
        ':vezVisto' => $dados['ultimaData'],
        ':localVisto' => $dados['ultimoLocal'],
        ':telefoneContato' => $dados['telefone'] ?? null,
        ':descricao' => $dados['descricao'] ?? null,
        ':id' => $dados['id']
    ]);

    echo json_encode(['success' => true, 'message' => 'Desaparecimento atualizado com sucesso.']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar: ' . $e->getMessage()]);
}
