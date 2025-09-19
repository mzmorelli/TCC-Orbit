import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import EditarPerfil from "././src/telas/Usuario/editarPerfil.js";
import ChatOrbitas from "./src/telas/ChatOrbitas/chat.js";
import ListaChat from "./src/telas/ChatOrbitas/lista.js";
import anuncios from "./src/telas/Desaparecimento/anuncios.js";
import anunciosUsuario from "./src/telas/Desaparecimento/anunciosUsuario.js";
import mapaDesaparecido from "./src/telas/Desaparecimento/mapaDesaparecido.js";
import mapa from "./src/telas/Mapa/index.js";

import { Ionicons } from "@expo/vector-icons";

import axios from "axios";


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = "#135991";
          size = 30;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Desaparecimento") {
            iconName = focused ? "newspaper" : "newspaper";
          } else if (route.name === "Orbitas") {
            iconName = focused ? "planet" : "planet";
          } else if (route.name === "Usuario") {
            iconName = focused ? "person" : "person";
          }
            else if (route.name=="ListaChat"){
              iconName = focused ? "logo-wechat" : "logo-wechat"; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        headerShown: false
      })}
      tabBarOptions={{
        activeTintColor: "#283BE3",
        inactiveTintColor: "gray",
      }}
    >


      <Tab.Screen name="ListaChat" component={ListaChat}/>
      <Tab.Screen name="Desaparecimento" component={Desaparecimento} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orbitas" component={Orbitas} />
      <Tab.Screen name="Usuario" component={Usuario} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false
        }}
      >
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
        <Stack.Screen name="MapaDesaparecido" component={mapaDesaparecido}/>
        <Stack.Screen name="Mapa" component={mapa}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});