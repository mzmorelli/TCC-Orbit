import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PerfilUsuario({ navigation }) {
  const userData = {
    nome: 'Usuário',
    email: 'email@exemplo.com',
    telefone: '(11) 98765-4321',
    foto: require('../../../assets/sem-foto.png')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.profileFloatContainer}>
        <View style={styles.profileImageShadow}>
          <Image
            source={userData.foto}
            style={styles.profileImage}
          />
        </View>
        
        <Text style={styles.userName}>{userData.nome}</Text>
      </View>

      <View style={styles.glassBody}>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.infoText}>{userData.telefone}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {[
            { icon: 'person-outline', label: 'Editar Perfil', action: 'EditarPerfil' },
            { icon: 'settings-outline', label: 'Configurações', action: 'Configuracoes' },
            { icon: 'help-circle-outline', label: 'Ajuda', action: 'Ajuda' },
            { icon: 'information-circle-outline', label: 'Sobre', action: 'Sobre' },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.action)}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4', // fundo geral mais claro
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#135991', // destaque azul
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  profileFloatContainer: {
    alignItems: 'center',
    marginTop: 30,
    zIndex: 2,
  },
  profileImageShadow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#cfe4f3', // sombra azul clara
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#135991', // borda azul escura
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#135991', // destaque azul
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  glassBody: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // mais claro que antes
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 25,
    paddingBottom: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(19, 89, 145, 0.4)', // borda azul suave
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // mais claro
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    backgroundColor: '#135991', // azul escuro
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#135991', // texto azul
    flex: 1,
  },
  menuContainer: {
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(19, 89, 145, 0.2)', // linha azul suave
  },
  menuIconContainer: {
    backgroundColor: '#cfe4f3', // fundo azul claro
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#135991', // texto azul
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
