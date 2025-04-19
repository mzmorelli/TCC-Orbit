import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  FlatList 
} from 'react-native';

export default function DetalhesDesaparecido() {
  const desaparecido = {
    nome: 'Carlos Alberto',
    idade: '32 anos',
    altura: '1,75m',
    sexo: 'Masculino',
    ultimaVezVisto: '15/05/2023',
    ultimoLocal: 'Shopping Central',
    telefone: '(11) 98765-4321',
    descricao: 'Vestia camiseta azul e calça jeans. Possui tatuagem de dragão no braço direito.',
    imagem: 'data:image/png;base64,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'
  };

  const [comentarios, setComentarios] = useState([
    { id: '1', usuario: '@maria_silva', texto: 'mds q pena' },
    { id: '2', usuario: '@joao_pereira', texto: 'Vou ficar de olho' }
  ]);
  const [novoComentario, setNovoComentario] = useState('');

  const adicionarComentario = () => {
    if (novoComentario==''){
      alert('Preencha todos os campos!');
    }
    else{
        setComentarios([
          ...comentarios,
          //o id vai ser a data 
          { id: Date.now().toString(), usuario: '@usuario', texto: novoComentario }
        ]);
        setNovoComentario('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Image 
          source={{ uri: desaparecido.imagem }} 
          style={styles.fotoDesaparecido}
        />
        
        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{desaparecido.nome}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Idade:</Text>
            <Text style={styles.valor}>{desaparecido.idade}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.valor}>{desaparecido.altura}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Sexo:</Text>
            <Text style={styles.valor}>{desaparecido.sexo}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divisor} />

      <View style={styles.secao}>
        <Text style={styles.subtitulo}>Última vez visto:</Text>
        <Text style={styles.texto}>{desaparecido.ultimaVezVisto}</Text>
        
        <Text style={styles.subtitulo}>Última local visto:</Text>
        <Text style={styles.texto}>{desaparecido.ultimoLocal}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.subtitulo}>Descrição:</Text>
        <Text style={styles.texto}>{desaparecido.descricao}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.subtitulo}>Telefone de contato:</Text>
        <Text style={styles.texto}>{desaparecido.telefone}</Text>
      </View>

      <View style={styles.divisor} />

      {/* seção comentarios */}
      <Text style={styles.tituloSecao}>Comentários</Text>
      
      <View style={styles.comentarioInputContainer}>
        <TextInput
          style={styles.comentarioInput}
          placeholder="Adicionar comentário"
          value={novoComentario}
          onChangeText={setNovoComentario}
          multiline
        />
        <TouchableOpacity 
          style={styles.botaoComentario} 
          onPress={adicionarComentario}
        >
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* comentarios */}
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comentarioContainer}>
            <Text style={styles.usuarioComentario}>{item.usuario}</Text>
            <Text style={styles.textoComentario}>{item.texto}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //ainda to em duvida se deixa o background nessa cor ou no cinza q ta no figma
    backgroundColor: '#fff',
    padding: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  fotoDesaparecido: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
    color: '#1321A0',
  },
  valor: {
    fontSize: 16,
    color: '#000',
  },
  divisor: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  secao: {
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1321A0',
  },
  texto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  comentarioInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  comentarioInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    minHeight: 50,
  },
  botaoComentario: {
    backgroundColor: '#283BE3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comentarioContainer: {
    backgroundColor: '#A9DBFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  usuarioComentario: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  textoComentario: {
    color: '#333',
  },
});