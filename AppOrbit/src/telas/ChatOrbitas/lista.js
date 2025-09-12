import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatList({ navigation }) {
  const chats = [
    {
      id: '1',
      groupName: 'Família',
      lastMessage: 'Vamos almoçar juntos no domingo?',
      time: '12:30',
      unread: 2,
      icon: 'home'
    },
    {
      id: '2',
      groupName: 'Amigos',
      lastMessage: 'E aí, bora sair hoje?',
      time: '10:15',
      unread: 0,
      icon: 'beer'
    },
    {
      id: '3',
      groupName: 'Amor',
      lastMessage: 'Te amo! ❤️',
      time: 'Ontem',
      unread: 0,
      icon: 'heart-circle'
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatOrbitas', { groupName: item.groupName })}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={24} color="#135991" />
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.groupName}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4', // fundo leve
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent', // sem fundo escuro
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff80', // leve transparência
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)', // linha fina separando chats
    paddingBottom: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  chatTime: {
    fontSize: 12,
    color: '#4b5563',
  },
  lastMessage: {
    fontSize: 14,
    color: '#374151',
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
