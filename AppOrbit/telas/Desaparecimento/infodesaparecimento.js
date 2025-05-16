import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function InfoDesaparecimento({ navigation }) {
  const desaparecido = {
    nome: "Carlos Alberto",
    idade: "32 anos",
    altura: "1,75m",
    sexo: "Masculino",
    ultimaVezVisto: "15/05/2023",
    ultimoLocal: "Shopping Central",
    telefone: "(11) 98765-4321",
    descricao:
      "Vestia camiseta azul e calça jeans. Possui tatuagem de dragão no braço direito.",
    imagem:
      "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/games/switch/s/spongebob-krusty-cook-off-switch/description-image",
  };

  const [comentarios, setComentarios] = useState([
    { id: "1", usuario: "@maria_silva", texto: "mds q pena" },
    { id: "2", usuario: "@joao_pereira", texto: "Vou ficar de olho" },
  ]);
  const [novoComentario, setNovoComentario] = useState("");

  const adicionarComentario = () => {
    if (novoComentario == "") {
      alert("Preencha todos os campos!");
    } else {
      setComentarios([
        ...comentarios,
        //o id vai ser a data
        {
          id: Date.now().toString(),
          usuario: "@usuario",
          texto: novoComentario,
        },
      ]);
      setNovoComentario("");
    }
  };

  return (
    <LinearGradient
      colors={["#1B2CC1", "#0D155B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Informações</Text>

        <TouchableOpacity
          style={styles.shareIcon}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="share-social-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.imageShadow}>
            <Image source={desaparecido.imagem} style={styles.profileImage} />
          </View>

          <Text style={styles.userName}>{desaparecido.nome}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Idade</Text>
              <Text style={styles.detailValue}>{desaparecido.idade}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Altura</Text>
              <Text style={styles.detailValue}>{desaparecido.altura}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sexo</Text>
              <Text style={styles.detailValue}>{desaparecido.sexo}</Text>
            </View>
          </View>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Última vez visto</Text>
              <Text style={styles.infoText}>{desaparecido.ultimaVezVisto}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Último local</Text>
              <Text style={styles.infoText}>{desaparecido.ultimoLocal}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Contato</Text>
              <Text style={styles.infoText}>{desaparecido.telefone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.infoLabel}>Descrição</Text>
              <Text style={[styles.infoText, styles.descriptionText]}>
                {desaparecido.descricao}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Comentários</Text>
          <Text style={styles.commentCount}>
            {comentarios.length} comentários
          </Text>
        </View>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Adicione um comentário..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={novoComentario}
            onChangeText={setNovoComentario}
            multiline
          />
          <TouchableOpacity
            style={styles.commentButton}
            onPress={adicionarComentario}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.usuario}</Text>
              <Text style={styles.commentText}>{item.texto}</Text>
            </View>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.commentsList}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  shareIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  imageShadow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  detailItem: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: "30%",
  },
  detailLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  descriptionContainer: {
    flex: 1,
    flexShrink: 1,
  },
  descriptionText: {
    flexWrap: "wrap",
    flexShrink: 1,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  infoIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 22,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  commentCount: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  commentInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  commentButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  commentsList: {
    paddingBottom: 30,
  },
  commentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
  },
});
