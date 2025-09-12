import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatScreen({ route, navigation }) {
  const { groupName } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Oi, tudo bem?', time: '12:30', sent: false },
    { id: '2', text: 'Tudo sim, e com você?', time: '12:32', sent: true },
    { id: '3', text: 'Aqui tudo ótimo também! Vamos sair hoje?', time: '12:33', sent: false },
    { id: '4', text: 'Bora! Que tal 20h?', time: '12:35', sent: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef();

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    setTimeout(() => {
      const replyMsg = {
        id: Date.now().toString(),
        text: 'Resposta automática (simulada)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header Personalizado */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{groupName}</Text>
          
          <View style={styles.headerRight} />
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
              <Text style={[styles.messageText, item.sent ? styles.sentText : styles.receivedText]}>
                {item.text}
              </Text>
              <Text style={[styles.timeText, item.sent ? styles.sentTime : styles.receivedTime]}>
                {item.time}
              </Text>
            </View>
          )}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4', // fundo leve
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerRight: {
    width: 24,
  },
  messagesContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 70, // espaço para o input
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#135991', // tom azul mais leve
    borderBottomRightRadius: 2,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#2c3e50',
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  sentTime: {
    color: 'rgba(255,255,255,0.6)',
  },
  receivedTime: {
    color: 'rgba(44,62,80,0.5)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d1e5f4', // fundo leve igual à tela
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#2c3e50',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#135991',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
