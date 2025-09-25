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

export default function InfoDesaparecimento({ route, navigation }) {
  const { desaparecido } = route.params;
  const formatarTelefone = (numero) => {
    if (!numero || typeof numero !== "string") return "";

    return numero
      .replace(/\D/g, "") // remove tudo que não for número
      .replace(/(\d{2})(\d)/, "($1) $2") // coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // coloca o hífen
      .replace(/(-\d{4})\d+?$/, "$1"); // limita a 4 dígitos no final
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
    <View style={styles.container}>
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
          <Image
            source={
              desaparecido.imagem
                ? {
                  uri: `http://192.168.1.71/appTcc/uploads/${desaparecido.imagem}`,
                }
                : require("../../../assets/sem-foto.png")
            }
            style={styles.profileImage}
          />

          <Text style={styles.userName}>{desaparecido.nome}</Text>
          <Text style={styles.advertiserName}>Reportado por: {desaparecido.usuario_nome}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Idade</Text>
              <Text style={styles.detailValue}>{desaparecido.idade} anos</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Altura</Text>
              <Text style={styles.detailValue}>{desaparecido.altura} cm</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sexo</Text>
              <Text style={styles.detailValue}>
                {desaparecido.sexo === "M"
                  ? "Masculino"
                  : desaparecido.sexo === "F"
                    ? "Feminino"
                    : desaparecido.sexo}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Falar com {desaparecido.usuario_nome}: </Text>
              <Text style={styles.infoText}>
                {formatarTelefone(String(desaparecido.telefoneContato))}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Última vez visto</Text>
              <Text style={styles.infoText}>{desaparecido.vezVisto}</Text>
            </View>
          </View>



          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Último local visto </Text>
              <Text style={styles.infoText}>{desaparecido.localVisto}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              navigation.navigate("MapaDesaparecido", { endereco: desaparecido.localVisto })
            }
          >
            <Ionicons name="location-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.mapButtonText}>Ver no mapa</Text>
          </TouchableOpacity>
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
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1e5f4", // fundo claro
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)", // mais claro
  },
  shareIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  headerTitle: {
    fontSize: 20,
    color: "#2c3e50",
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
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  advertiserName: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#4b5563",
    marginBottom: 10,
    textAlign: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  detailItem: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: "30%",
  },
  detailLabel: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // card claro
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(156,163,175,0.3)",
  },
  descriptionContainer: {
    flex: 1,
    flexShrink: 1,
  },
  descriptionText: {
    flexWrap: "wrap",
    flexShrink: 1,
    color: "#1e293b",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  infoIcon: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#1e293b",
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
    color: "#1e293b",
    fontWeight: "600",
  },
  commentCount: {
    fontSize: 14,
    color: "#374151",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    color: "#1e293b",
    fontSize: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  commentButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  commentsList: {
    paddingBottom: 30,
  },
  commentContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(156,163,175,0.3)",
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 8,
    marginBottom: 15,
  },
  mapButtonText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "600",
  },
});
