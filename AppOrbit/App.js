import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { UserProvider, UserContext } from './src/userContext/index.js';

import Inicio from "./src/telas/Inicio/index.js";
import Login from "./src/telas/Login/index.js";
import Cadastro from "./src/telas/Cadastro/index.js";
import InfoPessoal from "./src/telas/Cadastro/infopessoal.js";
import Home from "./src/telas/Home/index.js";
import Orbitas from "./src/telas/Orbitas/index.js";
import CompartilharOrbita from "./src/telas/CadOrbitas/compartilharOrbita.js";
import CriarOrbita from "./src/telas/CadOrbitas/index.js";
import AddImg from "./src/telas/CadOrbitas/addImg.js";
import Desaparecimento from "./src/telas/Desaparecimento/index.js";
import InfoDesaparecimento from "./src/telas/Desaparecimento/infodesaparecimento.js";
import CadDesaparecimento from "./src/telas/CadDesaparecimento/index.js";
import Usuario from "./src/telas/Usuario/index.js";
import EditarPerfil from "./src/telas/Usuario/editarPerfil.js";
import ChatOrbitas from "./src/telas/ChatOrbitas/chat.js";
import ListaChat from "./src/telas/ChatOrbitas/lista.js";
import anuncios from "./src/telas/Desaparecimento/anuncios.js";
import anunciosUsuario from "./src/telas/Desaparecimento/anunciosUsuario.js";
import mapaDesaparecido from "./src/telas/Desaparecimento/mapaDesaparecido.js";
import mapa from "./src/telas/Mapa/index.js";
import Alerta from "./src/telas/Alerta/index.js";
import MapaChaveiro from "./src/telas/MapaChaveiro/index.js";
import MapaTodosDesaparecidos from "./src/telas/MapaDesaparecidos/index.js";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          color = "#135991";
          size = 30;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Desaparecimento") iconName = "newspaper";
          else if (route.name === "Orbitas") iconName = "planet";
          else if (route.name === "Usuario") iconName = "person";
          else if (route.name === "ListaChat") iconName = "logo-wechat";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="ListaChat" component={ListaChat} />
      <Tab.Screen name="Desaparecimento" component={Desaparecimento} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orbitas" component={Orbitas} />
      <Tab.Screen name="Usuario" component={Usuario} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const Stack = createStackNavigator();
  const { user } = useContext(UserContext);

  const [alerta, setAlerta] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ultimoId, setUltimoId] = useState(null);

  // Buscar alertas
  useEffect(() => {
    let inicializando = true; 

    const buscarAlertas = async () => {
      try {
        const response = await axios.get("http://10.239.23.166/appTcc/listar_alerta.php");
        if (response.data.success && response.data.alertas.length > 0) {
          const ultimo = response.data.alertas[0];
          if (ultimoId !== ultimo.id) {
            setAlerta(ultimo);
            if (!inicializando) { 
              setMostrarModal(true);
            }
            setUltimoId(ultimo.id);
          }
        }}
      //  catch (error) {
      //   console.error("Erro ao buscar alertas:", error);
      // } 
      finally {
        inicializando = false; 
      }
    };

    buscarAlertas();
    const interval = setInterval(buscarAlertas, 3000);
    return () => clearInterval(interval);
  }, [ultimoId]);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="InfoPessoal" component={InfoPessoal} />
          <Stack.Screen name="CompartilharOrbita" component={CompartilharOrbita} />
          <Stack.Screen name="CriarOrbita" component={CriarOrbita} />
          <Stack.Screen name="AddImg" component={AddImg} />
          <Stack.Screen name="CadDesaparecimento" component={CadDesaparecimento} />
          <Stack.Screen name="InfoDesaparecimento" component={InfoDesaparecimento} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="ChatOrbitas" component={ChatOrbitas} />
          <Stack.Screen name="Anuncios" component={anuncios} />
          <Stack.Screen name="AnunciosUsuario" component={anunciosUsuario} />
          <Stack.Screen name="MapaDesaparecido" component={mapaDesaparecido} />
          <Stack.Screen name="Mapa" component={mapa} />
          <Stack.Screen name="Alerta" component={Alerta} />
          <Stack.Screen name="MapaChaveiro" component={MapaChaveiro}/>
          <Stack.Screen name="MapaTodosDesaparecidos" component={MapaTodosDesaparecidos}/>
        </Stack.Navigator>
      </NavigationContainer>

    
      <Modal
        visible={mostrarModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMostrarModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Ionicons name="alert-circle" size={28} color="#FF5757" />
              <Text style={styles.titulo}>Alerta Importante!</Text>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.usuario}>
                {user?.nome?.split(' ')[0] || 'Usuário'}
              </Text>
              <Text style={styles.texto}>{alerta?.mensagem}</Text>
            </View>

            <TouchableOpacity
              style={styles.fecharButton}
              onPress={() => setMostrarModal(false)}
            >
              <Text style={styles.fecharText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(11, 61, 145, 0.6)",
    paddingHorizontal: 20,
  },
  modalBox: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 0,
    shadowColor: "#0B3D91",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2F2",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE6E6",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#D32F2F",
    marginLeft: 12,
  },
  modalContent: {
    padding: 24,
    alignItems: "center",
  },
  usuario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B3D91",
    marginBottom: 8,
    textAlign: "center",
  },
  texto: {
    fontSize: 15,
    color: "#6B93B8",
    textAlign: "center",
    lineHeight: 22,
  },
  fecharButton: {
    backgroundColor: "#0B3D91",
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#0B3D91",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  fecharText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
