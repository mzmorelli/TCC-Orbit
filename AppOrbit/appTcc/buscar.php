<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$query = $pdo->prepare("SELECT * FROM info"); // tabela correta: info

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = array();

for ($i = 0; $i < count($res); $i++) {    
    $dados[] = array(
        'id' => $res[$i]['id'],
        'musico' => $res[$i]['musico'],
        'nomeAlbum' => $res[$i]['nomeAlbum'],
        'genero' => $res[$i]['genero'],
        'dataLancamento' => $res[$i]['dataLancamento'],
        'produtora' => $res[$i]['produtora'],
    );
}

if(count($res) > 0){
    $result = json_encode(array('success' => true, 'result' => $dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>
