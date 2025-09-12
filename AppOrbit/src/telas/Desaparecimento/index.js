import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TodosDesaparecidos from "./anuncios";
import AnunciosUsuario from "./anunciosUsuario"; 

const Tab = createMaterialTopTabNavigator();

export default function Desaparecimento() {
  return (
     <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: "#135991",
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
