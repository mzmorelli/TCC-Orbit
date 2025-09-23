import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../userContext/index.js';

export default function PerfilUsuario() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#83bde3", "#3f92cb", "#135991"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.profileFloatContainer}>
        <View style={styles.profileImageShadow}>
          <Image
            source={user?.foto ? { uri: user.foto } : require('../../../assets/sem-foto.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>{user?.nome || "Usuário"}</Text>
      </View>

      <View style={styles.glassBody}>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={20} color="#135991" />
            </View>
            <Text style={styles.infoText}>{user?.email || "email@exemplo.com"}</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={20} color="#135991" />
            </View>
            <Text style={styles.infoText}>{user?.telefone || "(11) 98765-4321"}</Text>
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
                <Ionicons name={item.icon} size={22} color="#135991" />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="rgba(19,89,145,0.5)" />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 40, // antes 60
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 15, // antes 20
  },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  profileFloatContainer: { alignItems: 'center', marginTop: 15, zIndex: 2 }, // antes 30
  profileImageShadow: {
    width: 130, // antes 140
    height: 130,
    borderRadius: 65,
    backgroundColor: '#cfe4f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, // antes 10
    shadowOpacity: 0.1,
    shadowRadius: 12, // antes 20
    elevation: 6, // antes 10
  },
  profileImage: {
    width: 120, // antes 130
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#135991',
  },
  userName: {
    fontSize: 20, // antes 22
    fontWeight: '600',
    color: '#fff',
    marginTop: 10, // antes 15
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  glassBody: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderTopLeftRadius: 35, // antes 40
    borderTopRightRadius: 35,
    paddingTop: 25, // antes 40
    paddingHorizontal: 20, // antes 25
    paddingBottom: 20, // antes 30
    marginTop: 15, // antes 30
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  infoSection: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 15, // antes 20
    padding: 15, // antes 20
    marginBottom: 20, // antes 25
  },
  infoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, // antes 15
  infoIcon: {
    backgroundColor: '#83bde3',
    width: 32, // antes 36
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // antes 12
  },
  infoText: { fontSize: 15, color: '#135991', flex: 1 }, // antes 16
  menuContainer: { marginBottom: 20 }, // antes 25
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // antes 18
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(19,89,145,0.2)',
  },
  menuIconContainer: {
    backgroundColor: '#cfe4f3',
    width: 36, // antes 40
    height: 36,
    borderRadius: 18, // antes 20
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // antes 15
  },
  menuText: { flex: 1, fontSize: 15, color: '#135991', fontWeight: '500' }, // antes 16
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, // antes 15
    borderRadius: 10, // antes 12
    backgroundColor: 'rgba(255,59,48,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,59,48,0.3)',
  },
  logoutButtonText: { color: '#FF3B30', fontSize: 15, fontWeight: '600', marginRight: 8 }, // antes 16
});

