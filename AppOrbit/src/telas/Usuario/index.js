import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PerfilUsuario({ navigation }) {
  const userData = {
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(11) 98765-4321',
    foto: require('../../../assets/fotoUser.png')
  };

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
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
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: 25,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  glassBody: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 25,
    paddingBottom: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    opacity: 0.9,
  },
  menuContainer: {
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    color: '#FFFFFF',
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