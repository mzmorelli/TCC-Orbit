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

import { Ionicons } from '@expo/vector-icons';

export default function InfoDesaparecimento({navigation}) {
  const desaparecido = {
    nome: 'Carlos Alberto',
    idade: '32 anos',
    altura: '1,75m',
    sexo: 'Masculino',
    ultimaVezVisto: '15/05/2023',
    ultimoLocal: 'Shopping Central',
    telefone: '(11) 98765-4321',
    descricao: 'Vestia camiseta azul e calça jeans. Possui tatuagem de dragão no braço direito.',
    imagem: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/games/switch/s/spongebob-krusty-cook-off-switch/description-image'
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

      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}
        onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1B2CC1" />
        </TouchableOpacity>
      </View>
      
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
  header: {
    paddingTop: 10,
    paddingBottom: 10,
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