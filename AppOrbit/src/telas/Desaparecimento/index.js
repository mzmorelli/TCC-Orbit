import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TodosDesaparecidos from "./anuncios"; // lista geral
import AnunciosUsuario from "./anunciosUsuario"; // anúncios do usuário

const Tab = createMaterialTopTabNavigator();

export default function Desaparecimento() {
  return (
     <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: "#0D155B",
          height: 50, 
        },
        tabBarLabelStyle: {
          fontSize: 14, 
          fontWeight: '600',
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarIndicatorStyle: { backgroundColor: "#FFFFFF", height: 3 },
      }}
    >
      <Tab.Screen
        name="Todos"
        component={TodosDesaparecidos}
        options={{ title: "Todos" }}
      />
      <Tab.Screen
        name="Meus Anúncios"
        component={AnunciosUsuario}
        options={{ title: "Meus Anúncios" }}
      />
    </Tab.Navigator>
  );
}
