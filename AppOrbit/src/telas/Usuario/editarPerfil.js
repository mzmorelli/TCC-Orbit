import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function EditarPerfil ({navigation}) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [sexo, setSexo] = useState('Selecione');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  
  const [showSexoDropdown, setShowSexoDropdown] = useState(false);
  const sexoOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backIcon} 
          onPress={() => navigation.navigate("Home", { screen: "Usuario" })}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.glassBody}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#135991"
              />
            </View>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  style={styles.input}
                  value={idade}
                  onChangeText={setIdade}
                  keyboardType="numeric"
                  placeholder="Sua idade"
                  placeholderTextColor="#135991"
                />
              </View>
              
             <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Sexo</Text>
                <TouchableOpacity 
                  style={[
                    styles.pickerContainer,
                    showSexoDropdown && styles.pickerContainerOpen
                  ]}
                  onPress={() => setShowSexoDropdown(!showSexoDropdown)}
                >
                  <Text style={[
                    styles.pickerText,
                    sexo === 'Selecione o sexo' && styles.placeholderText
                  ]}>
                    {sexo}
                  </Text>
                  <Ionicons 
                    name={showSexoDropdown ? 'chevron-up' : 'chevron-down'} 
                    size={18} 
                    color="#135991" 
                  />
                </TouchableOpacity>
                
                {showSexoDropdown && (
                  <View style={styles.dropdown}>
                    {sexoOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          sexo === option && styles.dropdownOptionSelected
                        ]}
                        onPress={() => {
                          setSexo(option);
                          setShowSexoDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownOptionText}>{option}</Text>
                        {sexo === option && (
                          <Ionicons name="checkmark" size={16} color="#4CD964" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contato</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="seu@email.com"
                placeholderTextColor="#135991"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
                placeholderTextColor="#135991"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Rua, número, cidade - estado"
                placeholderTextColor="#135991"
              />
            </View>
          </View>
          
          {/* Seção de Saúde */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saúde</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={peso}
                  onChangeText={setPeso}
                  keyboardType="numeric"
                  placeholder="Ex: 75"
                  placeholderTextColor="#135991"
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Altura (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                  placeholder="Ex: 175"
                  placeholderTextColor="#135991"
                />
              </View>
            </View>
          </View>
          
          {/* Botão de Salvar (apenas visual) */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4', // fundo geral mais claro
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    left: 25,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(19,89,145,0.15)', // azul suave
  },
  title: {
    fontSize: 24,
    color: '#135991', // destaque azul
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  glassBody: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // mais claro que antes
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 25,
    paddingBottom: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(19,89,145,0.3)', // borda azul suave
    overflow: 'hidden',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#135991', // azul destaque
    fontWeight: '600',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#135991', // azul destaque
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // mais claro
    borderRadius: 12,
    padding: 15,
    color: '#135991', // texto azul
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(19,89,145,0.4)',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // mais claro
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(19,89,145,0.4)',
  },
  pickerText: {
    color: '#135991',
    fontSize: 15,
  },
  placeholderText: {
    color: 'rgba(19,89,145,0.4)',
  },
  dropdown: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(19,89,145,0.3)',
    zIndex: 100,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(19,89,145,0.1)',
  },
  dropdownOptionText: {
    color: '#135991',
    fontSize: 15,
  },
  dropdownOptionSelected: {
    backgroundColor: 'rgba(19,89,145,0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#135991',
  },
  // Botão de salvar
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#135991',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});
